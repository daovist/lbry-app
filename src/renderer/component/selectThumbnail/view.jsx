import * as modals from 'constants/modal_types';
import * as STATUS from 'constants/thumbnail_status';
import React from 'react';
import FileSelector from 'component/common/file-selector';
import { FormRow } from 'component/common/form-components/form-row';

type Props = {
  alertError: string => void,
  resetUpload: () => void,
  selectApi: boolean,
  selectStatus: string,
  selectUrl: string,
  openModal: (string, any) => void,
  setStatus: string => void,
  setUrl: string => void,
};

class SelectThumbnail extends React.PureComponent<Props> {
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectStatus === STATUS.ERROR) {
      this.props.alertError('Upload failed. Please try again.');
      this.props.resetUpload();
    }
  }

  render() {
    const {
      selectApi,
      selectStatus,
      selectUrl,
      openModal,
      resetUpload,
      setStatus,
      setUrl,
    } = this.props;

    return (
      <div>
        {!selectApi || selectStatus === STATUS.MANUAL ? (
          <div>
            <div className="card__content">
              <FormRow
                type="text"
                label={__('Thumbnail URL')}
                name="thumbnail"
                value={selectUrl}
                placeholder="http://spee.ch/mylogo"
                onChange={event => setUrl(event.target.value)}
              />
            </div>
            {selectApi && (
              <div className="card__content">
                <a className="link" onClick={() => resetUpload()}>
                  Upload Thumbnail
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="card__content">
            <FileSelector
              fileLabel={__('Choose Thumbnail')}
              onFileChosen={event =>
                openModal(modals.CONFIRM_THUMBNAIL_UPLOAD, { path: event.target.value })
              }
            />
          </div>
        )}

        {selectApi &&
          selectStatus === STATUS.READY && (
            <div className="card__content">
              <a className="link" onClick={() => setStatus(STATUS.MANUAL)}>
                Enter Thumbnail URL
              </a>
            </div>
          )}

        {selectApi &&
          selectStatus === STATUS.UPLOADING && (
            <div className="card__content">Uploading thumbnail...</div>
          )}
      </div>
    );
  }
}

export default SelectThumbnail;
