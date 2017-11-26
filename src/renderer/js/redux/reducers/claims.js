//@flow

import * as types from "constants/action_types";
import type { Action } from "types/Action";
import type { Claim } from "types/Claim";
import { handleActions } from "util/redux-actions";

type ClaimId = string;
type ClaimIdMap = { [ClaimId]: Claim };

export type StateClaims = {
  +abandoningById: { [ClaimId]: boolean },
  +byId: ClaimIdMap,
  +claimsByChannel: {
    [string]: { all: Array<ClaimId>, [number]: Array<ClaimId> },
  },
  +claimsByUri: { [string]: ?ClaimId },
  +fetchingChannelClaims: { [string]: boolean },
  +fetchingMyChannels: boolean,
  +isFetchingClaimListMine: boolean,
  +myChannelClaimIds: Array<ClaimId>,
  +myClaimIds: Array<ClaimId>,
  +pendingById: {},
};

const defaultState: StateClaims = {
  abandoningById: {},
  byId: {},
  claimsByChannel: {},
  claimsByUri: {},
  fetchingChannelClaims: {},
  fetchingMyChannels: false,
  isFetchingClaimListMine: false,
  myClaimIds: [],
  myChannelClaimIds: [],
  pendingById: {},
};

export default handleActions(
  {
    [types.RESOLVE_URIS_COMPLETED]: (state: StateClaims, action: Action) => {
      const { resolveInfo } = action.data;
      const byUri = Object.assign({}, state.claimsByUri);
      const byId = Object.assign({}, state.byId);

      for (let [uri, { certificate, claim }] of Object.entries(resolveInfo)) {
        if (claim) {
          byId[claim.claim_id] = claim;
          byUri[uri] = claim.claim_id;
        } else if (claim === undefined && certificate !== undefined) {
          byId[certificate.claim_id] = certificate;
          // Don't point URI at the channel certificate unless it actually is
          // a channel URI. This is brittle.
          if (!uri.split(certificate.name)[1].match(/\//)) {
            byUri[uri] = certificate.claim_id;
          } else {
            byUri[uri] = null;
          }
        } else {
          byUri[uri] = null;
        }
      }

      return {
        byId,
        claimsByUri: byUri,
      };
    },

    [types.FETCH_CLAIM_LIST_MINE_STARTED]: (
      state: StateClaims,
      action: Action
    ) => ({
      isFetchingClaimListMine: true,
    }),

    [types.FETCH_CLAIM_LIST_MINE_COMPLETED]: (
      state: StateClaims,
      action: Action
    ) => {
      const { claims } = action.data;
      const byId = Object.assign({}, state.byId);
      let myClaimIds = state.myClaimIds.slice();
      const pendingById = Object.assign({}, state.pendingById);

      claims
        .filter(claim => claim.category && claim.category.match(/claim/))
        .forEach(claim => {
          byId[claim.claim_id] = claim;
          myClaimIds.push(claim.claim_id);
          const pending = Object.values(pendingById).find(pendingClaim => {
            return (
              pendingClaim.name == claim.name &&
              pendingClaim.channel_name == claim.channel_name
            );
          });

          if (pending) {
            delete pendingById[pending.claim_id];
          }
        });

      // Remove old timed out pending publishes
      const old = Object.values(pendingById)
        .filter(
          pendingClaim => Date.now() - pendingClaim.time >= 20 * 60 * 1000
        )
        .forEach(pendingClaim => {
          delete pendingById[pendingClaim.claim_id];
        });

      return {
        isFetchingClaimListMine: false,
        myClaimIds: [...new Set(myClaimIds)],
        byId,
        pendingById,
      };
    },

    [types.FETCH_CHANNEL_LIST_MINE_STARTED]: (
      state: StateClaims,
      action: Action
    ) => ({
      fetchingMyChannels: true,
    }),

    [types.FETCH_CHANNEL_LIST_MINE_COMPLETED]: (
      state: StateClaims,
      action: Action
    ) => {
      const { claims } = action.data;
      const myChannelClaimIds = new Set(state.myChannelClaimIds);
      const byId = Object.assign({}, state.byId);

      claims.forEach(claim => {
        myChannelClaimIds.add(claim.claim_id);
        byId[claims.claim_id] = claim;
      });

      return {
        byId,
        fetchingMyChannels: false,
        myChannelClaimIds: [...myChannelClaimIds],
      };
    },

    [types.FETCH_CHANNEL_CLAIMS_STARTED]: (
      state: StateClaims,
      action: Action
    ) => {
      const { uri, page } = action.data;
      const fetchingChannelClaims = Object.assign(
        {},
        state.fetchingChannelClaims
      );

      fetchingChannelClaims[uri] = page;

      return {
        fetchingChannelClaims,
      };
    },

    [types.FETCH_CHANNEL_CLAIMS_COMPLETED]: (
      state: StateClaims,
      action: Action
    ) => {
      const { uri, claims, page } = action.data;

      const claimsByChannel = Object.assign({}, state.claimsByChannel);
      const byChannel = Object.assign({}, claimsByChannel[uri]);
      const allClaimIds = new Set(byChannel["all"]);
      const currentPageClaimIds = [];
      const byId = Object.assign({}, state.byId);
      const fetchingChannelClaims = Object.assign(
        {},
        state.fetchingChannelClaims
      );

      if (claims !== undefined) {
        claims.forEach(claim => {
          allClaimIds.add(claim.claim_id);
          currentPageClaimIds.push(claim.claim_id);
          byId[claim.claim_id] = claim;
        });
      }

      byChannel["all"] = allClaimIds;
      byChannel[page] = currentPageClaimIds;
      claimsByChannel[uri] = byChannel;
      delete fetchingChannelClaims[uri];

      return {
        claimsByChannel,
        byId,
        fetchingChannelClaims,
      };
    },

    [types.ABANDON_CLAIM_STARTED]: (state: StateClaims, action: Action) => {
      const { claimId } = action.data;
      const abandoningById = Object.assign({}, state.abandoningById);

      abandoningById[claimId] = true;

      return {
        abandoningById,
      };
    },

    [types.ABANDON_CLAIM_SUCCEEDED]: (state: StateClaims, action: Action) => {
      const { claimId } = action.data;
      const abandoningById = Object.assign({}, state.abandoningById);
      const byId = Object.assign({}, state.byId);
      const claimsByUri = Object.assign({}, state.claimsByUri);

      Object.keys(claimsByUri).forEach(uri => {
        if (claimsByUri[uri] === claimId) {
          delete claimsByUri[uri];
        }
      });

      delete abandoningById[claimId];
      delete byId[claimId];

      return {
        abandoningById,
        byId,
        claimsByUri,
      };
    },

    [types.CREATE_CHANNEL_COMPLETED]: (state: StateClaims, action: Action) => {
      const { channelClaim } = action.data;
      const byId = Object.assign({}, state.byId);
      const myChannelClaimIds = new Set(state.myChannelClaimIds);

      byId[channelClaim.claim_id] = channelClaim;
      myChannelClaimIds.add(channelClaim.claim_id);

      return {
        byId,
        myChannelClaimIds: [...myChannelClaimIds],
      };
    },
  },
  defaultState
);
