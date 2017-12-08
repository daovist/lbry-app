import React from "react";
import lbryuri from "lbryuri.js";
import FormField from "component/formField";
import FileTile from "component/fileTile";
import { BusyMessage } from "component/common.js";

class FileList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: "date",
    };

    this._sortFunctions = {
      date: function(claims) {
        return claims.slice().reverse();
      },
      title: function(claims) {
        return claims.slice().sort(function(claim1, claim2) {
          const title1 = claim1.value
            ? claim1.value.stream.metadata.title.toLowerCase()
            : claim1.name;
          const title2 = claim2.value
            ? claim2.value.stream.metadata.title.toLowerCase()
            : claim2.name;
          if (title1 < title2) {
            return -1;
          } else if (title1 > title2) {
            return 1;
          } else {
            return 0;
          }
        });
      },
      filename: function(claims) {
        return claims
          .slice()
          .sort(function({ file_name: fileName1 }, { file_name: fileName2 }) {
            const fileName1Lower = fileName1.toLowerCase();
            const fileName2Lower = fileName2.toLowerCase();
            if (fileName1Lower < fileName2Lower) {
              return -1;
            } else if (fileName2Lower > fileName1Lower) {
              return 1;
            } else {
              return 0;
            }
          });
      },
    };
  }

  componentWillMount(props) {
    this.fetchClaims(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchClaims(props);
  }

  fetchClaims(props) {
    const { claims, fileInfos, doClaimShow } = props;

    fileInfos.forEach(fileInfo => {
      if (claims[fileInfo.outpoint] === undefined) {
        doClaimShow(fileInfo.outpoint);
      } else {
        console.log("have claim for");
        console.log(fileInfo);
      }
    });
  }

  getChannelSignature(claim) {
    if (claim.value) {
      return claim.value.publisherSignature.certificateId;
    } else {
      return claim.metadata.publisherSignature.certificateId;
    }
  }

  handleSortChanged(event) {
    this.setState({
      sortBy: event.target.value,
    });
  }

  render() {
    const { fetching, claims } = this.props;
    const { sortBy } = this.state;
    const content = [];
    console.log("in file list");
    console.log(claims);
    this._sortFunctions[sortBy](Object.values(claims)).forEach(claim => {
      let uriParams = {};

      if (claim.channel_name) {
        uriParams.channelName = claim.channel_name;
        uriParams.contentName = claim.name;
        uriParams.claimId = this.getChannelSignature(claim);
      } else {
        uriParams.claimId = claim.claim_id;
        uriParams.name = claim.name;
      }
      const uri = lbryuri.build(uriParams);

      content.push(
        <FileTile
          key={claim.outpoint || claim.claim_id}
          uri={uri}
          showPrice={false}
          showLocal={false}
          showActions={true}
          showEmpty={this.props.fileTileShowEmpty}
        />
      );
    });
    return (
      <section className="file-list__header">
        {fetching && <BusyMessage />}
        <span className="sort-section">
          {__("Sort by")}{" "}
          <FormField type="select" onChange={this.handleSortChanged.bind(this)}>
            <option value="date">{__("Date")}</option>
            <option value="title">{__("Title")}</option>
          </FormField>
        </span>
        {content}
      </section>
    );
  }
}

export default FileList;
