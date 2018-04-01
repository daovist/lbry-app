import React from 'react';
import { Modal } from 'modal/modal';
import FormField from 'component/formField/index';

class ModalConfirmThumbnailUpload extends React.PureComponent {
  setNsfw(event) {
    this.props.setNsfw(event.target.checked);
  }

  upload() {
    this.props.beginUpload(this.props.path, this.props.nsfw);
    this.props.closeModal();
  }

  render() {
    const { closeModal, path, nsfw } = this.props;

    return (
      <Modal
        isOpen
        contentLabel={__('Confirm Thumbnail Upload')}
        type="confirm"
        confirmButtonLabel={__('Upload')}
        onConfirmed={() => this.upload()}
        onAborted={closeModal}
      >
        <p>{`Confirm upload: ${path}`}</p>
        <section>
          <FormField
            type="checkbox"
            checked={nsfw}
            onClick={this.setNsfw(event)}
            label={__('NSFW')}
          />
        </section>
      </Modal>
    );
  }
}

export default ModalConfirmThumbnailUpload;
