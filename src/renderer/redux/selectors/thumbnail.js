import { createSelector } from 'reselect';

const selectState = state => state.thumbnail || {};

export const selectThumbnailApi = createSelector(selectState, state => state.api);

export const selectThumbnailStatus = createSelector(selectState, state => state.status);

export const selectThumbnailUrl = createSelector(selectState, state => state.url);

export const selectThumbnailNsfw = createSelector(selectState, state => state.nsfw);
