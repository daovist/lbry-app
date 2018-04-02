// @flow
import * as actions from 'constants/action_types';
import { handleActions } from 'util/redux-utils';
import * as status from 'constants/thumbnail_status';

export type ThumbnailState = {
  api: boolean,
  status: string,
  url: string,
  nsfw: boolean,
};

type thumbnailUploadBegin = {
  type: actions.THUMBNAIL_UPLOAD_BEGIN,
};

type thumbnailUploadSuccess = {
  type: actions.THUMBNAIL_UPLOAD_SUCCESS,
  data: {
    url: string,
  },
};

type thumbnailUploadError = {
  type: actions.THUMBNAIL_UPLOAD_ERROR,
};

type thumbnailUploadReset = {
  type: actions.THUMBNAIL_UPLOAD_RESET,
  data: {
    api: boolean,
  },
};

type thumbnailManualStatus = {
  type: actions.THUMBNAIL_MANUAL_STATUS,
  data: {
    status: string,
  },
};

type thumbnailManualUrl = {
  type: actions.THUMBNAIL_MANUAL_URL,
  data: {
    url: string,
  },
};

type thumbnailNsfw = {
  type: actions.THUMBNAIL_NSFW,
  data: {
    nsfw: boolean,
  },
};

export type Action =
  | thumbnailUploadBegin
  | thumbnailUploadSuccess
  | thumbnailUploadError
  | thumbnailUploadReset
  | thumbnailManualStatus
  | thumbnailManualUrl
  | thumbnailNsfw;
export type Dispatch = (action: Action) => any;

const defaultState = {
  api: false,
  status: status.MANUAL,
  url: '',
  nsfw: false,
};

export default handleActions(
  {
    [actions.THUMBNAIL_UPLOAD_BEGIN]: state => ({
      ...state,
      status: status.UPLOADING,
      url: '',
    }),

    [actions.THUMBNAIL_UPLOAD_SUCCESS]: (state, action) => ({
      ...state,
      status: status.COMPLETE,
      url: action.data.url,
    }),

    [actions.THUMBNAIL_UPLOAD_ERROR]: state => ({
      ...state,
      status: status.ERROR,
    }),

    [actions.THUMBNAIL_UPLOAD_RESET]: (state, action) => ({
      ...state,
      api: action.data.api,
      status: action.data.api ? status.READY : status.MANUAL,
    }),

    [actions.THUMBNAIL_MANUAL_STATUS]: (state, action) => ({
      ...state,
      status: action.data.status,
    }),

    [actions.THUMBNAIL_MANUAL_URL]: (state, action) => ({
      ...state,
      url: action.data.url,
    }),

    [actions.THUMBNAIL_NSFW]: (state, action) => ({
      ...state,
      nsfw: action.data.nsfw,
    }),
  },

  defaultState
);
