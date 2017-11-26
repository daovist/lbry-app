//@flow

/*This should actually be an enumeration of all the fields on file data type*/

export type FileInfo = {
  channel_name: ?string,
  claim_id: string,
  completed: boolean,
  download_directory: string,
  download_path: string,
  file_name: string,
  has_signature: boolean,
  key: string,
  message: ?string,
  metadata: {},
  mime_type: string,
  name: string,
  outpoint: string,
  points_paid: number,
  sd_hash: string,
  signature_is_valid: boolean,
  stopped: boolean,
  stream_hash: string,
  stream_name: string,
  suggested_file_name: string,
  total_bytes: ?number,
  written_bytes: number,
};
