import * as modals from 'constants/modal_types';
import * as STATUS from 'constants/thumbnail_status';
import React from 'react';
import { FormRow } from 'component/common/form-components/form-row';

class SelectThumbnail extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.status === STATUS.ERROR) {
      this.props.alertError('Upload failed. Please try again.');
      this.props.resetUpload();
    }
  }

  render() {
    const { api, status, url, openModal, resetUpload, setStatus, setUrl } = this.props;

    return (
      <div>
        {!api || status === STATUS.MANUAL ? (
          <div>
            <div className="card__content">
              <FormRow
                type="text"
                label={__('Thumbnail URL')}
                name="thumbnail"
                value={url}
                placeholder="http://spee.ch/mylogo"
                onChange={event => setUrl(event.target.value)}
              />
            </div>
            {api && (
              <div className="card__content">
                <a className="link" onClick={() => resetUpload()}>
                  Upload Thumbnail
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="card__content">
            <FormRow
              name="thumbnail"
              ref="thumbnail"
              label={__('Upload Thumbnail')}
              type="file"
              onChange={event => {
                openModal(modals.CONFIRM_THUMBNAIL_UPLOAD, {
                  path: event.target.value,
                });
              }}
            />
          </div>
        )}

        {api &&
          status === STATUS.UPLOADING && (
            <div className="card__content">
              <a className="link" onClick={() => setStatus(STATUS.MANUAL)}>
                Enter Thumbnail URL
              </a>
            </div>
          )}

        {api &&
          status === status.UPLOADING && (
            <div className="card__content">Uploading thumbnail...</div>
          )}
      </div>
    );
  }
}

export default SelectThumbnail;
