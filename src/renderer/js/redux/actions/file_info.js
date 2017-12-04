import * as types from "constants/action_types";
import lbry from "lbry";
import { doFetchClaimListMine, doAbandonClaim } from "redux/actions/content";
import {
  selectClaimsByUri,
  selectIsFetchingClaimListMine,
  selectMyPublishClaims,
} from "redux/selectors/claims";
import {
  selectIsFetchingFileList,
  selectFileInfosBySdHash,
  selectFetchingSdHash,
  selectTotalDownloadProgress,
} from "redux/selectors/file_info";
import { doCloseModal } from "redux/actions/app";
import { doHistoryBack } from "redux/actions/navigation";
import setProgressBar from "util/setProgressBar";
import batchActions from "util/batchActions";

const { shell } = require("electron");

export function doFetchFileInfo(uri) {
  return function(dispatch, getState) {
    const state = getState();
    const claim = selectClaimsByUri(state)[uri];
    const sd_hash = claim.value.stream.source.source;
    const alreadyFetching = !!selectFetchingSdHash(state)[sd_hash];

    if (!alreadyFetching) {
      dispatch({
        type: types.FILE_LIST_ONE_START,
        data: {
          sd_hash,
        },
      });

      lbry
        .file_list({ sd_hash: sd_hash, full_status: true })
        .then(fileInfos => {
          dispatch({
            type: types.FILE_LIST_ONE_COMPLETE,
            data: {
              sd_hash,
              fileInfo: fileInfos && fileInfos.length ? fileInfos[0] : null,
            },
          });
        });
    }
  };
}

export function doFileList() {
  return function(dispatch, getState) {
    const state = getState();
    const isFetching = selectIsFetchingFileList(state);

    if (!isFetching) {
      dispatch({
        type: types.FILE_LIST_START,
      });

      lbry
        .file_list()
        .then(fileInfos => {
          dispatch({
            type: types.FILE_LIST_SUCCESS,
            data: {
              fileInfos,
            },
          });
        })
        .catch(() => {
          dispatch({
            type: types.FILE_LIST_FAILURE,
          });
        });
    }
  };
}

export function doOpenFileInShell(path) {
  return function(dispatch, getState) {
    const success = shell.openItem(path);
    if (!success) {
      dispatch(doOpenFileInFolder(path));
    }
  };
}

export function doOpenFileInFolder(path) {
  return function(dispatch, getState) {
    shell.showItemInFolder(path);
  };
}

export function doDeleteFile(sd_hash, deleteFromComputer, abandonClaim) {
  return function(dispatch, getState) {
    const state = getState();

    console.log("zzz");
    console.log(state);
    console.log(selectMyPublishClaims(state));
    console.log("file delete: " + sd_hash);

    // lbry.file_delete({
    //   sd_hash: sd_hash,
    //   delete_from_download_dir: deleteFromComputer,
    // });

    // If the file is for a claim we published then also abandon the claim
    if (abandonClaim) {
      console.log("abandon is true");
      const claims = selectMyPublishClaims(state);
      console.log(claims);
      const claim = claims.find(
        claim => claim.value.stream.source.source === sd_hash
      );
      console.log("calling abandon with...");
      console.log(claim);
      if (claim) {
        dispatch(doAbandonClaim(claim.txid, claim.nout));
      }
    }

    dispatch({
      type: types.FILE_DELETE,
      data: {
        sdHash: sd_hash,
      },
    });

    console.log("delete dispatched");

    const totalProgress = selectTotalDownloadProgress(getState());
    setProgressBar(totalProgress);
  };
}

export function doDeleteFileAndGoBack(
  sd_hash,
  deleteFromComputer,
  abandonClaim
) {
  return function(dispatch, getState) {
    const actions = [];
    actions.push(doCloseModal());
    actions.push(doHistoryBack());
    actions.push(doDeleteFile(sd_hash, deleteFromComputer, abandonClaim));
    dispatch(batchActions(...actions));
  };
}

export function doFetchFileInfosAndPublishedClaims() {
  return function(dispatch, getState) {
    const state = getState(),
      isFetchingClaimListMine = selectIsFetchingClaimListMine(state),
      isFetchingFileInfo = selectIsFetchingFileList(state);

    let actions = [];
    if (!isFetchingClaimListMine) actions.push(doFetchClaimListMine());
    if (!isFetchingFileInfo) actions.push(doFileList());

    dispatch(batchActions(...actions));
  };
}
