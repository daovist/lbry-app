import React from 'react';
import { Modal } from 'modal/modal';
import FormField from 'component/formField/index';

class ModalConfirmThumbnailUpload extends React.PureComponent {
  upload() {
    console.log('modal upload');
    this.props.upload(this.props.path, this.props.nsfw);
    this.props.closeModal();
  }

  render() {
    const { closeModal, path, nsfw, setNsfw } = this.props;

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

        {/*<section>
          <FormField
            type="checkbox"
            checked={nsfw}
            onChange={event => console.log(event.target)}
            label={__('NSFW')}
        />
        </section>*/}
      </Modal>
    );
  }
}

export default ModalConfirmThumbnailUpload;
