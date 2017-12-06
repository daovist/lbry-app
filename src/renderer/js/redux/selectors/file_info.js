import { createSelector } from "reselect";
import type { StateFileInfo } from "redux/selectors/claims";
import {
  selectClaimsByUri,
  selectIsFetchingClaimListMine,
  selectMyClaims,
  selectMyPublishClaimsSdHashes,
} from "redux/selectors/claims";

export const _selectState = state => state.fileInfo || {};

export const selectFileInfosBySdHash = createSelector(
  _selectState,
  (state: StateFileInfo) => state.bySdHash || {}
);

export const selectIsFetchingFileList = createSelector(
  _selectState,
  (state: StateFileInfo) => !!state.isFetchingFileList
);

export const selectIsFetchingFileInfosOrClaims = createSelector(
  selectIsFetchingFileList,
  selectIsFetchingClaimListMine,
  (isFetchingFileList, isFetchingClaimListMine) =>
    isFetchingFileList || isFetchingClaimListMine
);

export const makeSelectFileInfoForUri = uri => {
  return createSelector(
    selectClaimsByUri,
    selectFileInfosBySdHash,
    (claims, bySdHash) => {
      const claim = claims[uri];
      let sd_hash = undefined;

      if (claim && !claim.name.startsWith("@")) {
        sd_hash = claim ? claim.value.stream.source.source : undefined;
      }

      return sd_hash ? bySdHash[sd_hash] : undefined;
    }
  );
};

export const selectDownloadingBySdHash = createSelector(
  _selectState,
  state => state.downloadingBySdHash || {}
);

export const makeSelectDownloadingForUri = uri => {
  return createSelector(
    selectDownloadingBySdHash,
    makeSelectFileInfoForUri(uri),
    (bySdHash, fileInfo) => {
      if (!fileInfo) return false;
      return bySdHash[fileInfo.sd_hash];
    }
  );
};

export const selectUrisLoading = createSelector(
  _selectState,
  state => state.urisLoading || {}
);

export const makeSelectLoadingForUri = uri => {
  return createSelector(selectUrisLoading, byUri => byUri && byUri[uri]);
};

export const selectFetchingSdHash = createSelector(
  _selectState,
  state => state.fetching || {}
);

export const selectFileInfosPendingPublish = createSelector(
  _selectState,
  state => Object.values(state.pendingBySdHash || {})
);

export const selectFileInfosDownloaded = createSelector(
  selectFileInfosBySdHash,
  selectMyClaims,
  (bySdHash, myClaims) => {
    return Object.values(bySdHash).filter(fileInfo => {
      const myClaimIds = myClaims.map(claim => claim.claim_id);

      return (
        fileInfo &&
        myClaimIds.indexOf(fileInfo.claim_id) === -1 &&
        (fileInfo.completed || fileInfo.written_bytes)
      );
    });
  }
);

export const selectFileInfosPublished = createSelector(
  selectFileInfosBySdHash,
  selectMyPublishClaimsSdHashes,
  selectFileInfosPendingPublish,
  (bySdHash, sdHashes, pendingPublish) => {
    console.log("select file infos");
    const fileInfos = sdHashes.reduce((infos, sd_hash) => {
      if (bySdHash[sd_hash]) {
        infos.push(bySdHash[sd_hash]);
      }
      return infos;
    }, []);
    console.log(fileInfos);
    return [...fileInfos, ...pendingPublish];
  }
);

export const selectFileInfosDownloading = createSelector(
  selectDownloadingBySdHash,
  selectFileInfosBySdHash,
  (downloadingBySdHash, fileInfosBySdHash) => {
    const sdHashes = Object.keys(downloadingBySdHash);
    const fileInfos = [];

    sdHashes.forEach(sdHash => {
      const fileInfo = fileInfosBySdHash[sdHash];

      if (fileInfo) fileInfos.push(fileInfo);
    });

    return fileInfos;
  }
);

export const selectTotalDownloadProgress = createSelector(
  selectFileInfosDownloading,
  fileInfos => {
    const progress = [];

    fileInfos.forEach(fileInfo => {
      progress.push(fileInfo.written_bytes / fileInfo.total_bytes * 100);
    });

    const totalProgress = progress.reduce((a, b) => a + b, 0);

    if (fileInfos.length > 0) return totalProgress / fileInfos.length / 100.0;
    else return -1;
  }
);
