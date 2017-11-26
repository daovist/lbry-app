import React from "react";
import rewards from "rewards";
import { connect } from "react-redux";
import { doClaimRewardType } from "redux/actions/rewards";
import { doNavigate } from "redux/actions/navigation";
import FileListPublished from "./view";
import {
  selectFileInfosPublished,
  selectIsFetchingFileList,
  selectIsFetchingFileInfosOrClaims,
} from "redux/selectors/file_info";

const select = state => ({
  fileInfos: selectFileInfosPublished(state),
  isFetching: selectIsFetchingFileInfosOrClaims(state),
});

const perform = dispatch => ({
  navigate: path => dispatch(doNavigate(path)),
  fetchFileInfos: () => dispatch(doFetchFileInfosAndPublishedClaims()),
  claimFirstPublishReward: () =>
    dispatch(doClaimRewardType(rewards.TYPE_FIRST_PUBLISH)),
});

export default connect(select, perform)(FileListPublished);
