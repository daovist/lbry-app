import React from "react";
import Icon from "component/icon";
import classnames from "classnames";

const Link = props => {
  const {
    href,
    onClick: onClickProp,
    title,
    label,
    icon,
    iconRight,
    disabled,
    children,
    navigate,
    navigateParams,
    doNavigate,
    className,
    link,
    block,
    alt,
    circle,
    flat,
  } = props;

  const combinedClassName = classnames(
    {
      btn: !link,
      "btn--alt": alt,
      "btn--link": link,
      "btn--disabled": disabled,
      "btn--block": block,
      "btn--circle": circle,
      "btn--flat": flat,
    },
    className
  );

  const onClick =
    !onClickProp && navigate
      ? () => {
          doNavigate(navigate, navigateParams || {});
        }
      : onClickProp;

  const content = (
    <span>
      {icon && <Icon icon={icon} fixed={true} />}
      {label && <span className="btn__label">{label}</span>}
      {children && children}
      {iconRight && <Icon icon={iconRight} fixed={true} />}
    </span>
  );

  return href ? (
    <a className={combinedClassName} href={href} title={title}>
      {content}
    </a>
  ) : (
    <button className={combinedClassName} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
};

export default Link;
