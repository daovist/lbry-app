import React from "react";
import lbryuri from "lbryuri";
import classnames from "classnames";
import { BusyMessage } from "component/common.js";
import SubHeader from "component/subHeader";
import CategoryList from "component/common/category-list";

class DiscoverPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchFeaturedUris();
  }

  render() {
    const { featuredUris, fetchingFeaturedUris } = this.props;
    const hasContent =
        typeof featuredUris === "object" && Object.keys(featuredUris).length,
      failedToLoad = !fetchingFeaturedUris && !hasContent;

    return (
      <main
        className={classnames("main main--no-margin", {
          reloading: hasContent && fetchingFeaturedUris,
        })}
      >
        <SubHeader fullWidth smallMargin />
        {!hasContent &&
          fetchingFeaturedUris && (
            <BusyMessage message={__("Fetching content")} />
          )}
        {hasContent &&
          Object.keys(featuredUris).map(category => {
            return featuredUris[category].length ? (
              <CategoryList
                key={category}
                category={category}
                names={featuredUris[category]}
              />
            ) : (
              ""
            );
          })}
        {failedToLoad && (
          <div className="empty">{__("Failed to load landing content.")}</div>
        )}
      </main>
    );
  }
}

export default DiscoverPage;
