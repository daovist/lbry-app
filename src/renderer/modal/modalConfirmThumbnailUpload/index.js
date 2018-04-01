import { connect } from 'react-redux';
import { doCloseModal } from 'redux/actions/app';
import { uploadThumbnail } from 'redux/actions/thumbnail';
import ModalConfirmThumbnailUpload from './view';

import { selectThumbnailNsfw } from 'redux/selectors/thumbnail';

const select = state => ({
  nsfw: selectThumbnailNsfw(state),
});

const perform = dispatch => ({
  closeModal: () => dispatch(doCloseModal()),
  upload: (path, nsfw) => dispatch(uploadThumbnail(path, nsfw)),
});

export default connect(select, perform)(ModalConfirmThumbnailUpload);
