import { connect } from 'react-redux';
import { resetThumbnailUpload } from 'redux/actions/thumbnail';
import PublishForm from './view';

const perform = dispatch => ({
  resetThumbnail: () => dispatch(resetThumbnailUpload()),
});

export default connect(null, perform)(PublishForm);
