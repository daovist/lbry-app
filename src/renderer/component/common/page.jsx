import React from "react";
import classnames from "classnames";

export default ({ children, title }) => {
  return (
    <main id="main-content" className={classnames("main", {})}>
      {title && (
        <h1 className="page__title">
          <strong>{title}</strong>
        </h1>
      )}
      {children}
    </main>
  );
};
