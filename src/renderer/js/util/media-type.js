export default function(contentType, fileName) {
  if (contentType) {
    return /^[^/]+/.exec(contentType)[0];
  } else if (fileName) {
    var dotIndex = fileName.lastIndexOf(".");
    if (dotIndex == -1) {
      return "unknown";
    }

    var ext = fileName.substr(dotIndex + 1);
    if (/^mp4|m4v|webm|flv|f4v|ogv$/i.test(ext)) {
      return "video";
    } else if (/^mp3|m4a|aac|wav|flac|ogg|opus$/i.test(ext)) {
      return "audio";
    } else if (
      /^html|htm|xml|pdf|odf|doc|docx|md|markdown|txt|epub|org$/i.test(ext)
    ) {
      return "document";
    } else {
      return "unknown";
    }
  } else {
    return "unknown";
  }
}
