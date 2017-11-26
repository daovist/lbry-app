import React from "react";
import { connect } from "react-redux";
import { doFetchFileInfosAndPublishedClaims } from "redux/actions/file_info";
import {
  selectFileInfosDownloaded,
  selectIsFetchingFileInfosOrClaims,
} from "redux/selectors/file_info";
import { selectIsFetchingClaimListMine } from "redux/selectors/claims";
import { doNavigate } from "redux/actions/navigation";
import FileListDownloaded from "./view";

const select = state => ({
  fileInfos: selectFileInfosDownloaded(state),
  isFetching: selectIsFetchingFileInfosOrClaims(state),
});

const perform = dispatch => ({
  navigate: path => dispatch(doNavigate(path)),
  fetchFileInfos: () => dispatch(doFetchFileInfosAndPublishedClaims()),
});

export default connect(select, perform)(FileListDownloaded);
