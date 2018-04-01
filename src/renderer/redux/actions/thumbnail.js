// @flow
import * as actions from 'constants/action_types';
import type { Dispatch } from 'redux/reducers/thumbnail';
import fs from 'fs';
import path from 'path';

export const resetThumbnailUpload = () => (dispatch: Dispatch) =>
  fetch('https://spee.ch/api/channel/availability/@testing')
    .then(() =>
      dispatch({
        type: actions.THUMBNAIL_UPLOAD_RESET,
        data: {
          api: true,
        },
      })
    )
    .catch(() =>
      dispatch({
        type: actions.THUMBNAIL_UPLOAD_RESET,
        data: {
          api: false,
        },
      })
    );

export const setThumbnailStatus = (status: string) => (dispatch: Dispatch) =>
  dispatch({
    type: actions.THUMBNAIL_MANUAL_STATUS,
    data: { status },
  });

export const setThumbnailUrl = (url: string) => (dispatch: Dispatch) =>
  dispatch({
    type: actions.THUMBNAIL_MANUAL_URL,
    data: { url },
  });

export const setThumbnailNsfw = (nsfw: boolean) => (dispatch: Dispatch) =>
  dispatch({
    type: actions.THUMBNAIL_NSFW,
    data: { nsfw },
  });

export const uploadThumbnail = (filePath: string, nsfw: boolean) => (dispatch: Dispatch) => {
  function makeid() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 24; i += 1) text += possible.charAt(Math.floor(Math.random() * 62));
    return text;
  }

  const thumbnail = fs.readFileSync(filePath);
  const fileExt = path.extname(filePath);

  dispatch({ type: actions.THUMBNAIL_UPLOAD_BEGIN });

  const data = new FormData();
  const name = makeid();
  const blob = new Blob([thumbnail], { type: `image/${fileExt.slice(1)}` });
  data.append('name', name);
  data.append('file', blob);
  data.append('nsfw', nsfw.toString());
  return fetch('https://spee.ch/api/claim/publish', {
    method: 'POST',
    body: data,
  })
    .then(response => response.json())
    .then(
      json =>
        json.success
          ? dispatch({
              type: actions.THUMBNAIL_UPLOAD_SUCCESS,
              data: { url: `${json.data.url}${fileExt}` },
            })
          : dispatch({ type: actions.THUMBNAIL_UPLOAD_ERROR })
    )
    .catch(() => dispatch({ type: actions.THUMBNAIL_UPLOAD_ERROR }));
};
