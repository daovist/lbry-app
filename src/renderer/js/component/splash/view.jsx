import React from "react";
import PropTypes from "prop-types";
import lbry from "lbry.js";
import LoadScreen from "../load_screen.js";
import ModalIncompatibleDaemon from "modal/modalIncompatibleDaemon";
import ModalUpgrade from "modal/modalUpgrade";
import ModalDownloading from "modal/modalDownloading";
import * as modals from "constants/modal_types";

export class SplashScreen extends React.PureComponent {
  static propTypes = {
    message: PropTypes.string,
    onLoadDone: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      details: __("Starting daemon"),
      message: __("Connecting"),
      isRunning: false,
      isLagging: false,
    };
  }

  updateStatus() {
    lbry.status().then(status => {
      this._updateStatusCallback(status);
    });
  }

  _updateStatusCallback(status) {
    const startupStatus = status.startup_status;
    if (startupStatus.code == "started") {
      // Wait until we are able to resolve a name before declaring
      // that we are done.
      // TODO: This is a hack, and the logic should live in the daemon
      // to give us a better sense of when we are actually started
      this.setState({
        message: __("Testing Network"),
        details: __("Waiting for name resolution"),
        isLagging: false,
        isRunning: true,
      });

      lbry.resolve({ uri: "lbry://one" }).then(() => {
        // Only leave the load screen if the daemon version matched;
        // otherwise we'll notify the user at the end of the load screen.

        if (this.props.daemonVersionMatched) {
          this.props.onReadyToLaunch();
        }
      });
      return;
    }
    if (
      status.blockchain_status &&
      status.blockchain_status.blocks_behind > 0
    ) {
      const format =
        status.blockchain_status.blocks_behind == 1
          ? "%s block behind"
          : "%s blocks behind";
      this.setState({
        message: __("Blockchain Sync"),
        details: __(format, status.blockchain_status.blocks_behind),
        isLagging: startupStatus.is_lagging,
      });
    } else {
      this.setState({
        message: __("Network Loading"),
        details:
          startupStatus.message + (startupStatus.is_lagging ? "" : "..."),
        isLagging: startupStatus.is_lagging,
      });
    }
    setTimeout(() => {
      this.updateStatus();
    }, 500);
  }

  /* below code should be moved out of this component, but was moved here as part of a refactor to eliminate non-API code from lbry.js */
  connect() {
    return new Promise((resolve, reject) => {
      let tryNum = 0;

      function checkDaemonStartedFailed() {
        if (tryNum <= 200) {
          // Move # of tries into constant or config option
          setTimeout(() => {
            tryNum++;
            checkDaemonStarted();
          }, tryNum < 50 ? 400 : 1000);
        } else {
          reject(new Error("Unable to connect to LBRY"));
        }
      }

      // Check every half second to see if the daemon is accepting connections
      function checkDaemonStarted() {
        lbry
          .status()
          .then(resolve)
          .catch(checkDaemonStartedFailed);
      }

      checkDaemonStarted();
    });
  }

  componentDidMount() {
    this.connect()
      .then(this.props.checkDaemonVersion)
      .then(() => {
        this.updateStatus();
      })
      .catch(() => {
        this.setState({
          isLagging: true,
          message: __("Connection Failure"),
          details: __(
            "Try closing all LBRY processes and starting again. If this still happens, your anti-virus software or firewall may be preventing LBRY from connecting. Contact hello@lbry.io if you think this is a software bug."
          ),
        });
      });
  }

  render() {
    const { modal } = this.props;

    return (
      <div>
        <LoadScreen
          message={this.state.message}
          details={this.state.details}
          isWarning={this.state.isLagging}
        />
        {/* Temp hack: don't show any modals on splash screen daemon is running;
            daemon doesn't let you quit during startup, so the "Quit" buttons
            in the modals won't work. */}
        {modal == "incompatibleDaemon" &&
          this.state.isRunning && <ModalIncompatibleDaemon />}
        {modal == modals.UPGRADE && this.state.isRunning && <ModalUpgrade />}
        {modal == modals.DOWNLOADING &&
          this.state.isRunning && <ModalDownloading />}
      </div>
    );
  }
}

export default SplashScreen;
