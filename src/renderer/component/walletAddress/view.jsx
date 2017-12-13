import React from "react";
import Link from "component/link";
import Address from "component/address";
import QRCode from "qrcode.react";

class WalletAddress extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showQR: false,
    };
  }

  toggleQR() {
    this.setState({
      showQR: !this.state.showQR,
    });
    console.log("THIS HAPPENED", this.state.showQR);
  }

  componentWillMount() {
    this.props.checkAddressIsMine(this.props.receiveAddress);
  }

  render() {
    const { receiveAddress, getNewAddress, gettingNewAddress } = this.props;

    return (
      <section className="card">
        <div className="card__title-primary">
          <h3>{__("Receive Credits")}</h3>
        </div>
        <div className="card__content">
          <p>
            {__(
              "Use this wallet address to receive credits sent by another user (or yourself)."
            )}
          </p>
          <Address address={receiveAddress} />
        </div>
        <div className="card__actions">
          <Link
            label={__("Get New Address")}
            button="primary"
            icon="icon-refresh"
            onClick={getNewAddress}
            disabled={gettingNewAddress}
          />
        </div>
        <div className="card__content">
          <div className="help">
            <p>
              {__(
                "You can generate a new address at any time, and any previous addresses will continue to work. Using multiple addresses can be helpful for keeping track of incoming payments from multiple sources."
              )}
            </p>
          </div>
        </div>
        <div className="card__content">
          <Link
            label={this.state.showQR ? __("Hide QR code") : __("Show QR code")}
            button="primary"
            onClick={() => this.toggleQR()}
          />
          <div className={this.state.showQR ? "" : "hidden"}>
            <br />
            <QRCode value={receiveAddress} size="320" />
          </div>
        </div>
      </section>
    );
  }
}

export default WalletAddress;
