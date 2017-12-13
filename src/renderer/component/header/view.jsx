import React from "react";
import Link from "component/link";
import WunderBar from "component/wunderbar";

export const Header = props => {
  const {
    balance,
    back,
    forward,
    isBackDisabled,
    isForwardDisabled,
    isUpgradeAvailable,
    navigate,
    downloadUpgrade,
  } = props;
  return (
    <header id="header">
      <div className="header__actions-left">
        <Link
          alt
          circle
          onClick={back}
          disabled={isBackDisabled}
          icon="icon-arrow-left"
          title={__("Back")}
        />

        <Link
          alt
          circle
          onClick={forward}
          disabled={isForwardDisabled}
          icon="icon-arrow-right"
          title={__("Forward")}
        />

        <Link
          alt
          circle
          onClick={() => navigate("/discover")}
          icon="icon-home"
          title={__("Discover Content")}
        />
      </div>

      <WunderBar />

      <div className="header__actions-right">
        <Link
          link
          onClick={() => navigate("/wallet")}
          icon="icon-user"
          label={<span>You have {balance} LBC</span>}
          title={__("Wallet")}
        />
        <Link
          alt
          onClick={() => navigate("/help")}
          icon="question"
          title={__("Help")}
        />
      </div>
    </header>
  );
};

// <div className="header__item">
//
// </div>
// <div className="header__item">
//   <Link
//     onClick={() => navigate("/publish")}
//     button="primary button--flat"
//     icon="icon-upload"
//     label={__("Publish")}
//   />
// </div>
// <div className="header__item">
//   <Link
//     onClick={() => navigate("/downloaded")}
//     button="alt button--flat"
//     icon="icon-folder"
//     title={__("Downloads and Publishes")}
//   />
// </div>
// <div className="header__item">

// </div>
// {isUpgradeAvailable && (
//   <Link
//     onClick={() => downloadUpgrade()}
//     button="primary button--flat"
//     icon="icon-arrow-up"
//     label={__("Upgrade App")}
//   />
// )}

export default Header;
