//@flow

import * as types from "constants/action_types";
import type { Action } from "types/Action";
import type { FileInfo } from "types/FileInfo";
import { handleActions } from "util/redux-actions";

type FileInfoSdHashMap = { [string]: FileInfo };

export type StateFileInfo = {
  +bySdHash: FileInfoSdHashMap,
  +downloadingBySdHash: { [string]: boolean },
  +fetching: { [string]: boolean },
  +isFetchingFileList: boolean,
  +pendingBySdHash: FileInfoSdHashMap,
  +urisLoading: { [string]: boolean },
};

const defaultState: StateFileInfo = {
  bySdHash: {},
  downloadingBySdHash: {},
  fetching: {},
  isFetchingFileList: false,
  pendingBySdHash: {},
  urisLoading: {},
};

export default handleActions(
  {
    [types.FILE_LIST_START]: (state: StateFileInfo, action: Action) => ({
      isFetchingFileList: true,
    }),

    [types.FILE_LIST_SUCCESS]: (state: StateFileInfo, action: Action) => {
      const { fileInfos } = action.data;
      const newBySdHash = Object.assign({}, state.bySdHash);

      fileInfos.forEach(fileInfo => {
        const { sd_hash } = fileInfo;

        if (sd_hash) newBySdHash[fileInfo.sd_hash] = fileInfo;
      });

      return {
        isFetchingFileList: false,
        bySdHash: newBySdHash,
      };
    },

    [types.FILE_LIST_FAILURE]: (state: StateFileInfo, action: Action) => {
      isFetchingFileList: false;
    },

    [types.FILE_LIST_ONE_START]: (state: StateFileInfo, action: Action) => {
      const { sd_hash } = action.data;
      const newFetching = Object.assign({}, state.fetching);

      newFetching[sd_hash] = true;

      return {
        fetching: newFetching,
      };
    },

    [types.FILE_LIST_ONE_COMPLETE]: (state: StateFileInfo, action: Action) => {
      const { fileInfo, sd_hash } = action.data;

      const newBySdHash = Object.assign({}, state.bySdHash);
      const newFetching = Object.assign({}, state.fetching);

      newBySdHash[sd_hash] = fileInfo;
      delete newFetching[sd_hash];

      return {
        bySdHash: newBySdHash,
        fetching: newFetching,
      };
    },

    [types.DOWNLOADING_STARTED]: (state: StateFileInfo, action: Action) => {
      const { uri, sd_hash, fileInfo } = action.data;

      const newBySdHash = Object.assign({}, state.bySdHash);
      const newDownloading = Object.assign({}, state.downloadingBySdHash);
      const newLoading = Object.assign({}, state.urisLoading);

      newDownloading[sd_hash] = true;
      newBySdHash[sd_hash] = fileInfo;
      delete newLoading[uri];

      return {
        downloadingBySdHash: newDownloading,
        urisLoading: newLoading,
        bySdHash: newBySdHash,
      };
    },

    [types.DOWNLOADING_PROGRESSED]: (state: StateFileInfo, action: Action) => {
      const { uri, sd_hash, fileInfo } = action.data;

      const newBySdHash = Object.assign({}, state.bySdHash);
      const newDownloading = Object.assign({}, state.downloadingBySdHash);

      newBySdHash[sd_hash] = fileInfo;
      newDownloading[sd_hash] = true;

      return {
        bySdHash: newBySdHash,
        downloadingBySdHash: newDownloading,
      };
    },

    [types.DOWNLOADING_COMPLETED]: (state: StateFileInfo, action: Action) => {
      const { uri, sd_hash, fileInfo } = action.data;

      const newBySdHash = Object.assign({}, state.bySdHash);
      const newDownloading = Object.assign({}, state.downloadingBySdHash);

      newBySdHash[sd_hash] = fileInfo;
      delete newDownloading[sd_hash];

      return {
        bySdHash: newBySdHash,
        downloadingBySdHash: newDownloading,
      };
    },

    [types.FILE_DELETE]: (state: StateFileInfo, action: Action) => {
      const { sd_hash } = action.data;

      const newBySdHash = Object.assign({}, state.bySdHash);
      const downloadingBySdHash = Object.assign({}, state.downloadingBySdHash);

      delete newBySdHash[sd_hash];
      delete downloadingBySdHash[sd_hash];

      return {
        bySdHash: newBySdHash,
        downloadingBySdHash,
      };
    },

    [types.LOADING_VIDEO_STARTED]: (state: StateFileInfo, action: Action) => {
      const { uri } = action.data;

      return {
        urisLoading: Object.assign({}, state.urisLoading, { [uri]: true }),
      };
    },

    [types.LOADING_VIDEO_FAILED]: (state: StateFileInfo, action: Action) => {
      const { uri } = action.data;

      const newLoading = Object.assign({}, state.urisLoading);

      delete newLoading[uri];

      return {
        urisLoading: newLoading,
      };
    },
  },
  defaultState
);
