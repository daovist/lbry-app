import React from "react";
import { connect } from "react-redux";
import FileList from "./view";
import { makeSelectClaimsByOutpoints } from "../../redux/selectors/claims";
import { doClaimShow } from "../../redux/actions/content";

const select = (state, props) => ({
  claims: makeSelectClaimsByOutpoints(
    Object.values(props.fileInfos).map(info => info.outpoint)
  )(state),
});

const perform = dispatch => ({
  doClaimShow: outpoint => dispatch(doClaimShow(outpoint)),
});

export default connect(select, perform)(FileList);
