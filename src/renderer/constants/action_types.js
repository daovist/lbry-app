export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const REMOVE_SNACKBAR_SNACK = 'REMOVE_SNACKBAR_SNACK';
export const WINDOW_FOCUSED = 'WINDOW_FOCUSED';
export const DAEMON_READY = 'DAEMON_READY';
export const DAEMON_VERSION_MATCH = 'DAEMON_VERSION_MATCH';
export const DAEMON_VERSION_MISMATCH = 'DAEMON_VERSION_MISMATCH';
export const VOLUME_CHANGED = 'VOLUME_CHANGED';

// Navigation
export const CHANGE_AFTER_AUTH_PATH = 'CHANGE_AFTER_AUTH_PATH';
export const WINDOW_SCROLLED = 'WINDOW_SCROLLED';
export const HISTORY_NAVIGATE = 'HISTORY_NAVIGATE';

// Upgrades
export const UPGRADE_CANCELLED = 'UPGRADE_CANCELLED';
export const DOWNLOAD_UPGRADE = 'DOWNLOAD_UPGRADE';
export const UPGRADE_DOWNLOAD_STARTED = 'UPGRADE_DOWNLOAD_STARTED';
export const UPGRADE_DOWNLOAD_COMPLETED = 'UPGRADE_DOWNLOAD_COMPLETED';
export const UPGRADE_DOWNLOAD_PROGRESSED = 'UPGRADE_DOWNLOAD_PROGRESSED';
export const CHECK_UPGRADE_AVAILABLE = 'CHECK_UPGRADE_AVAILABLE';
export const CHECK_UPGRADE_START = 'CHECK_UPGRADE_START';
export const CHECK_UPGRADE_SUCCESS = 'CHECK_UPGRADE_SUCCESS';
export const CHECK_UPGRADE_FAIL = 'CHECK_UPGRADE_FAIL';
export const CHECK_UPGRADE_SUBSCRIBE = 'CHECK_UPGRADE_SUBSCRIBE';
export const UPDATE_VERSION = 'UPDATE_VERSION';
export const UPDATE_REMOTE_VERSION = 'UPDATE_REMOTE_VERSION';
export const SKIP_UPGRADE = 'SKIP_UPGRADE';
export const START_UPGRADE = 'START_UPGRADE';
export const AUTO_UPDATE_DECLINED = 'AUTO_UPDATE_DECLINED';
export const AUTO_UPDATE_DOWNLOADED = 'AUTO_UPDATE_DOWNLOADED';

// Wallet
export const GET_NEW_ADDRESS_STARTED = 'GET_NEW_ADDRESS_STARTED';
export const GET_NEW_ADDRESS_COMPLETED = 'GET_NEW_ADDRESS_COMPLETED';
export const FETCH_TRANSACTIONS_STARTED = 'FETCH_TRANSACTIONS_STARTED';
export const FETCH_TRANSACTIONS_COMPLETED = 'FETCH_TRANSACTIONS_COMPLETED';
export const UPDATE_BALANCE = 'UPDATE_BALANCE';
export const CHECK_ADDRESS_IS_MINE_STARTED = 'CHECK_ADDRESS_IS_MINE_STARTED';
export const CHECK_ADDRESS_IS_MINE_COMPLETED = 'CHECK_ADDRESS_IS_MINE_COMPLETED';
export const SEND_TRANSACTION_STARTED = 'SEND_TRANSACTION_STARTED';
export const SEND_TRANSACTION_COMPLETED = 'SEND_TRANSACTION_COMPLETED';
export const SEND_TRANSACTION_FAILED = 'SEND_TRANSACTION_FAILED';
export const FETCH_BLOCK_SUCCESS = 'FETCH_BLOCK_SUCCESS';
export const SUPPORT_TRANSACTION_STARTED = 'SUPPORT_TRANSACTION_STARTED';
export const SUPPORT_TRANSACTION_COMPLETED = 'SUPPORT_TRANSACTION_COMPLETED';
export const SUPPORT_TRANSACTION_FAILED = 'SUPPORT_TRANSACTION_FAILED';

// Claims
export const FETCH_FEATURED_CONTENT_STARTED = 'FETCH_FEATURED_CONTENT_STARTED';
export const FETCH_FEATURED_CONTENT_COMPLETED = 'FETCH_FEATURED_CONTENT_COMPLETED';
export const RESOLVE_URIS_STARTED = 'RESOLVE_URIS_STARTED';
export const RESOLVE_URIS_COMPLETED = 'RESOLVE_URIS_COMPLETED';
export const FETCH_CHANNEL_CLAIMS_STARTED = 'FETCH_CHANNEL_CLAIMS_STARTED';
export const FETCH_CHANNEL_CLAIMS_COMPLETED = 'FETCH_CHANNEL_CLAIMS_COMPLETED';
export const FETCH_CHANNEL_CLAIM_COUNT_STARTED = 'FETCH_CHANNEL_CLAIM_COUNT_STARTED';
export const FETCH_CHANNEL_CLAIM_COUNT_COMPLETED = 'FETCH_CHANNEL_CLAIM_COUNT_COMPLETED';
export const FETCH_CLAIM_LIST_MINE_STARTED = 'FETCH_CLAIM_LIST_MINE_STARTED';
export const FETCH_CLAIM_LIST_MINE_COMPLETED = 'FETCH_CLAIM_LIST_MINE_COMPLETED';
export const ABANDON_CLAIM_STARTED = 'ABANDON_CLAIM_STARTED';
export const ABANDON_CLAIM_SUCCEEDED = 'ABANDON_CLAIM_SUCCEEDED';
export const FETCH_CHANNEL_LIST_STARTED = 'FETCH_CHANNEL_LIST_STARTED';
export const FETCH_CHANNEL_LIST_COMPLETED = 'FETCH_CHANNEL_LIST_COMPLETED';
export const CREATE_CHANNEL_STARTED = 'CREATE_CHANNEL_STARTED';
export const CREATE_CHANNEL_COMPLETED = 'CREATE_CHANNEL_COMPLETED';
export const PUBLISH_STARTED = 'PUBLISH_STARTED';
export const PUBLISH_COMPLETED = 'PUBLISH_COMPLETED';
export const PUBLISH_FAILED = 'PUBLISH_FAILED';
export const SET_PLAYING_URI = 'PLAY_URI';

// Files
export const FILE_LIST_STARTED = 'FILE_LIST_STARTED';
export const FILE_LIST_SUCCEEDED = 'FILE_LIST_SUCCEEDED';
export const FETCH_FILE_INFO_STARTED = 'FETCH_FILE_INFO_STARTED';
export const FETCH_FILE_INFO_COMPLETED = 'FETCH_FILE_INFO_COMPLETED';
export const FETCH_COST_INFO_STARTED = 'FETCH_COST_INFO_STARTED';
export const FETCH_COST_INFO_COMPLETED = 'FETCH_COST_INFO_COMPLETED';
export const LOADING_VIDEO_STARTED = 'LOADING_VIDEO_STARTED';
export const LOADING_VIDEO_COMPLETED = 'LOADING_VIDEO_COMPLETED';
export const LOADING_VIDEO_FAILED = 'LOADING_VIDEO_FAILED';
export const DOWNLOADING_STARTED = 'DOWNLOADING_STARTED';
export const DOWNLOADING_PROGRESSED = 'DOWNLOADING_PROGRESSED';
export const DOWNLOADING_COMPLETED = 'DOWNLOADING_COMPLETED';
export const PLAY_VIDEO_STARTED = 'PLAY_VIDEO_STARTED';
export const FETCH_AVAILABILITY_STARTED = 'FETCH_AVAILABILITY_STARTED';
export const FETCH_AVAILABILITY_COMPLETED = 'FETCH_AVAILABILITY_COMPLETED';
export const FILE_DELETE = 'FILE_DELETE';

// Search
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAIL = 'SEARCH_FAIL';
export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
export const UPDATE_SEARCH_SUGGESTIONS = 'UPDATE_SEARCH_SUGGESTIONS';

// Settings
export const DAEMON_SETTINGS_RECEIVED = 'DAEMON_SETTINGS_RECEIVED';
export const CLIENT_SETTING_CHANGED = 'CLIENT_SETTING_CHANGED';
export const UPDATE_IS_NIGHT = 'UPDATE_IS_NIGHT';

// User
export const AUTHENTICATION_STARTED = 'AUTHENTICATION_STARTED';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';
export const USER_EMAIL_DECLINE = 'USER_EMAIL_DECLINE';
export const USER_EMAIL_NEW_STARTED = 'USER_EMAIL_NEW_STARTED';
export const USER_EMAIL_NEW_SUCCESS = 'USER_EMAIL_NEW_SUCCESS';
export const USER_EMAIL_NEW_EXISTS = 'USER_EMAIL_NEW_EXISTS';
export const USER_EMAIL_NEW_FAILURE = 'USER_EMAIL_NEW_FAILURE';
export const USER_EMAIL_VERIFY_STARTED = 'USER_EMAIL_VERIFY_STARTED';
export const USER_EMAIL_VERIFY_SUCCESS = 'USER_EMAIL_VERIFY_SUCCESS';
export const USER_EMAIL_VERIFY_FAILURE = 'USER_EMAIL_VERIFY_FAILURE';
export const USER_PHONE_RESET = 'USER_PHONE_RESET';
export const USER_PHONE_NEW_STARTED = 'USER_PHONE_NEW_STARTED';
export const USER_PHONE_NEW_SUCCESS = 'USER_PHONE_NEW_SUCCESS';
export const USER_PHONE_NEW_FAILURE = 'USER_PHONE_NEW_FAILURE';
export const USER_PHONE_VERIFY_STARTED = 'USER_PHONE_VERIFY_STARTED';
export const USER_PHONE_VERIFY_SUCCESS = 'USER_PHONE_VERIFY_SUCCESS';
export const USER_PHONE_VERIFY_FAILURE = 'USER_PHONE_VERIFY_FAILURE';
export const USER_IDENTITY_VERIFY_STARTED = 'USER_IDENTITY_VERIFY_STARTED';
export const USER_IDENTITY_VERIFY_SUCCESS = 'USER_IDENTITY_VERIFY_SUCCESS';
export const USER_IDENTITY_VERIFY_FAILURE = 'USER_IDENTITY_VERIFY_FAILURE';
export const USER_FETCH_STARTED = 'USER_FETCH_STARTED';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';
export const USER_INVITE_STATUS_FETCH_STARTED = 'USER_INVITE_STATUS_FETCH_STARTED';
export const USER_INVITE_STATUS_FETCH_SUCCESS = 'USER_INVITE_STATUS_FETCH_SUCCESS';
export const USER_INVITE_STATUS_FETCH_FAILURE = 'USER_INVITE_STATUS_FETCH_FAILURE';
export const USER_INVITE_NEW_STARTED = 'USER_INVITE_NEW_STARTED';
export const USER_INVITE_NEW_SUCCESS = 'USER_INVITE_NEW_SUCCESS';
export const USER_INVITE_NEW_FAILURE = 'USER_INVITE_NEW_FAILURE';
export const FETCH_ACCESS_TOKEN_SUCCESS = 'FETCH_ACCESS_TOKEN_SUCCESS';

// Rewards
export const FETCH_REWARDS_STARTED = 'FETCH_REWARDS_STARTED';
export const FETCH_REWARDS_COMPLETED = 'FETCH_REWARDS_COMPLETED';
export const CLAIM_REWARD_STARTED = 'CLAIM_REWARD_STARTED';
export const CLAIM_REWARD_SUCCESS = 'CLAIM_REWARD_SUCCESS';
export const CLAIM_REWARD_FAILURE = 'CLAIM_REWARD_FAILURE';
export const CLAIM_REWARD_CLEAR_ERROR = 'CLAIM_REWARD_CLEAR_ERROR';
export const FETCH_REWARD_CONTENT_COMPLETED = 'FETCH_REWARD_CONTENT_COMPLETED';

// Language
export const DOWNLOAD_LANGUAGE_SUCCEEDED = 'DOWNLOAD_LANGUAGE_SUCCEEDED';
export const DOWNLOAD_LANGUAGE_FAILED = 'DOWNLOAD_LANGUAGE_FAILED';

// ShapeShift
export const GET_SUPPORTED_COINS_START = 'GET_SUPPORTED_COINS_START';
export const GET_SUPPORTED_COINS_SUCCESS = 'GET_SUPPORTED_COINS_SUCCESS';
export const GET_SUPPORTED_COINS_FAIL = 'GET_SUPPORTED_COINS_FAIL';
export const GET_COIN_STATS_START = 'GET_COIN_STATS_START';
export const GET_COIN_STATS_SUCCESS = 'GET_COIN_STATS_SUCCESS';
export const GET_COIN_STATS_FAIL = 'GET_COIN_STATS_FAIL';
export const PREPARE_SHAPE_SHIFT_START = 'PREPARE_SHAPE_SHIFT_START';
export const PREPARE_SHAPE_SHIFT_SUCCESS = 'PREPARE_SHAPE_SHIFT_SUCCESS';
export const PREPARE_SHAPE_SHIFT_FAIL = 'PREPARE_SHAPE_SHIFT_FAIL';
export const GET_ACTIVE_SHIFT_START = 'GET_ACTIVE_SHIFT_START';
export const GET_ACTIVE_SHIFT_SUCCESS = 'GET_ACTIVE_SHIFT_SUCCESS';
export const GET_ACTIVE_SHIFT_FAIL = 'GET_ACTIVE_SHIFT_FAIL';
export const CLEAR_SHAPE_SHIFT = 'CLEAR_SHAPE_SHIFT';

// Subscriptions
export const CHANNEL_SUBSCRIBE = 'CHANNEL_SUBSCRIBE';
export const CHANNEL_UNSUBSCRIBE = 'CHANNEL_UNSUBSCRIBE';
export const HAS_FETCHED_SUBSCRIPTIONS = 'HAS_FETCHED_SUBSCRIPTIONS';
export const SET_SUBSCRIPTION_LATEST = 'SET_SUBSCRIPTION_LATEST';
export const SET_SUBSCRIPTION_NOTIFICATION = 'SET_SUBSCRIPTION_NOTIFICATION';
export const SET_SUBSCRIPTION_NOTIFICATIONS = 'SET_SUBSCRIPTION_NOTIFICATIONS';
export const CHECK_SUBSCRIPTION_STARTED = 'CHECK_SUBSCRIPTION_STARTED';
export const CHECK_SUBSCRIPTION_COMPLETED = 'CHECK_SUBSCRIPTION_COMPLETED';
export const CHECK_SUBSCRIPTIONS_SUBSCRIBE = 'CHECK_SUBSCRIPTIONS_SUBSCRIBE';

// Video controls
export const SET_VIDEO_PAUSE = 'SET_VIDEO_PAUSE';

// Media controls
export const MEDIA_PLAY = 'MEDIA_PLAY';
export const MEDIA_PAUSE = 'MEDIA_PAUSE';
export const MEDIA_POSITION = 'MEDIA_POSITION';

// Publishing
export const CLEAR_PUBLISH = 'CLEAR_PUBLISH';
export const UPDATE_PUBLISH_FORM = 'UPDATE_PUBLISH_FORM';
export const PUBLISH_START = 'PUBLISH_START';
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS';
export const PUBLISH_FAIL = 'PUBLISH_FAIL';
export const CLEAR_PUBLISH_ERROR = 'CLEAR_PUBLISH_ERROR';
export const REMOVE_PENDING_PUBLISH = 'REMOVE_PENDING_PUBLISH';
export const DO_PREPARE_EDIT = 'DO_PREPARE_EDIT';

// Select Thumbnail
export const THUMBNAIL_UPLOAD_BEGIN = 'THUMBNAIL_UPLOAD_BEGIN';
export const THUMBNAIL_UPLOAD_SUCCESS = 'THUMBNAIL_UPLOAD_SUCCESS';
export const THUMBNAIL_UPLOAD_ERROR = 'THUMBNAIL_UPLOAD_ERROR';
export const THUMBNAIL_UPLOAD_RESET = 'THUMBNAIL_UPLOAD_RESET';
export const THUMBNAIL_MANUAL_STATUS = 'THUMBNAIL_MANUAL_STATUS';
export const THUMBNAIL_MANUAL_URL = 'THUMBNAIL_MANUAL_URL';
