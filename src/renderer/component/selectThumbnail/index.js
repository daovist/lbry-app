import { connect } from 'react-redux';
import { doOpenModal, doAlertError } from 'redux/actions/app';
import { resetThumbnailUpload, setThumbnailStatus, setThumbnailUrl } from 'redux/actions/thumbnail';
import {
  selectThumbnailApi,
  selectThumbnailStatus,
  selectThumbnailUrl,
} from 'redux/selectors/thumbnail';
import SelectThumbnail from './view';

const select = state => ({
  api: selectThumbnailApi(state),
  status: selectThumbnailStatus(state),
  url: selectThumbnailUrl(state),
});

const perform = dispatch => ({
  openModal: (modal, props) => dispatch(doOpenModal(modal, props)),
  alertError: errorList => dispatch(doAlertError(errorList)),
  resetUpload: () => dispatch(resetThumbnailUpload()),
  setStatus: () => dispatch(setThumbnailStatus()),
  setUrl: url => dispatch(setThumbnailUrl(url)),
});

export default connect(select, perform)(SelectThumbnail);
