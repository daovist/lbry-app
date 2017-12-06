//@flow

export type FileInfo = {
  completed: boolean,
  download_directory: string,
  download_path: string,
  file_name: string,
  key: string,
  message: ?string,
  metadata: {},
  mime_type: string,
  points_paid: number,
  sd_hash: string,
  stopped: boolean,
  stream_hash: string,
  stream_name: string,
  suggested_file_name: string,
  total_bytes: ?number,
  written_bytes: number,
};
