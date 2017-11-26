import { createSelector } from "reselect";
import lbryuri from "lbryuri";
import { makeSelectCurrentParam } from "./navigation";

const _selectState = state => state.claims || {};

export const selectClaimsById = createSelector(
  _selectState,
  state => state.byId
);

export const selectClaimsByUri = createSelector(
  _selectState,
  selectClaimsById,
  (state, byId) => {
    const byUri = state.claimsByUri || {};
    const claims = {};

    Object.keys(byUri).forEach(uri => {
      const claimId = byUri[uri];

      // NOTE returning a null claim allows us to differentiate between an
      // undefined (never fetched claim) and one which just doesn't exist. Not
      // the cleanest solution but couldn't think of anything better right now
      if (claimId === null) {
        claims[uri] = null;
      } else {
        const claim = byId[claimId];

        claims[uri] = claim;
      }
    });

    return claims;
  }
);

export const selectAllClaimsByChannel = createSelector(
  _selectState,
  state => state.claimsByChannel || {}
);

export const makeSelectClaimForUri = uri => {
  return createSelector(
    selectClaimsByUri,
    claims => claims && claims[lbryuri.normalize(uri)]
  );
};

export const makeSelectClaimIsMine = rawUri => {
  const uri = lbryuri.normalize(rawUri);
  return createSelector(
    selectClaimsByUri,
    selectMyActiveClaimIds,
    (claims, myClaimIds) =>
      claims &&
      claims[uri] &&
      claims[uri].claim_id &&
      myClaimIds.indexOf(claims[uri].claim_id) !== -1
  );
};

export const selectAllFetchingChannelClaims = createSelector(
  _selectState,
  state => state.fetchingChannelClaims || {}
);

export const makeSelectFetchingChannelClaims = uri => {
  return createSelector(
    selectAllFetchingChannelClaims,
    fetching => fetching && fetching[uri]
  );
};

export const makeSelectClaimsInChannelForCurrentPage = uri => {
  const pageSelector = makeSelectCurrentParam("page");

  return createSelector(
    selectClaimsById,
    selectAllClaimsByChannel,
    pageSelector,
    (byId, allClaims, page) => {
      const byChannel = allClaims[uri] || {};
      const claimIds = byChannel[page || 1];

      if (!claimIds) return claimIds;

      return claimIds.map(claimId => byId[claimId]);
    }
  );
};

export const makeSelectMetadataForUri = uri => {
  return createSelector(makeSelectClaimForUri(uri), claim => {
    const metadata =
      claim && claim.value && claim.value.stream && claim.value.stream.metadata;

    const value = metadata ? metadata : claim === undefined ? undefined : null;
    return value;
  });
};

export const makeSelectTitleForUri = uri => {
  return createSelector(
    makeSelectMetadataForUri(uri),
    metadata => metadata && metadata.title
  );
};

export const makeSelectContentTypeForUri = uri => {
  return createSelector(makeSelectClaimForUri(uri), claim => {
    const source =
      claim && claim.value && claim.value.stream && claim.value.stream.source;
    return source ? source.contentType : undefined;
  });
};

export const selectIsFetchingClaimListMine = createSelector(
  _selectState,
  state => !!state.isFetchingClaimListMine
);

export const selectMyClaimIds = createSelector(
  _selectState,
  state => state.myClaimIds
);

export const selectAbandoningIds = createSelector(_selectState, state =>
  Object.keys(state.abandoningById || {})
);

export const selectMyActiveClaimIds = createSelector(
  selectMyClaimIds,
  selectAbandoningIds,
  (claimIds, abandoningIds) => [
    ...new Set(
      claimIds &&
        claimIds.filter(
          claimId => Object.keys(abandoningIds).indexOf(claimId) === -1
        )
    ),
  ]
);

export const selectPendingClaims = createSelector(_selectState, state =>
  Object.values(state.pendingById || {})
);

export const selectMyClaims = createSelector(
  selectMyActiveClaimIds,
  selectClaimsById,
  selectAbandoningIds,
  selectPendingClaims,
  (myClaimIds, byId, abandoningIds, pendingClaims) => {
    const claims = [];
    console.log("in select my claims");
    console.log(myClaimIds);
    console.log(byId);
    console.log(abandoningIds);
    myClaimIds.forEach(id => {
      const claim = byId[id];
      if (!claim) {
        console.log("no claim for id " + id);
      }
      if (claim && abandoningIds.indexOf(id) == -1) claims.push(claim);
    });

    console.log("returning from select my claims");
    console.log(claims);

    return [...claims, ...pendingClaims];
  }
);

export const selectAllMyClaimsByOutpoint = createSelector(
  selectMyClaims,
  claims =>
    new Set(
      claims && claims.length
        ? claims.map(claim => `${claim.txid}:${claim.nout}`)
        : null
    )
);

export const selectMyPublishClaims = createSelector(selectMyClaims, myClaims =>
  myClaims.filter(
    claim =>
      claim.value.claimType === "streamType" && claim.category === "claim"
  )
);

export const selectMyPublishClaimsSdHashes = createSelector(
  selectMyPublishClaims,
  myClaims => myClaims.map(claim => claim.value.stream.source.source)
);

export const selectFetchingMyChannels = createSelector(
  _selectState,
  state => !!state.fetchingMyChannels
);

export const selectMyChannelClaims = createSelector(
  _selectState,
  selectClaimsById,
  (state, byId) => {
    const ids = state.myChannelClaimIds;
    const claims = [];

    ids.forEach(id => {
      if (byId[id]) {
        //I'm not sure why this check is necessary, but it ought to be a quick fix for https://github.com/lbryio/lbry-app/issues/544
        //Follow-up: abandoning a channel claim outside of the app may be able to reproduce this
        claims.push(byId[id]);
      }
    });

    return claims;
  }
);
