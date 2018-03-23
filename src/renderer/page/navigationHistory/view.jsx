import React from 'react';
import { BusyMessage } from 'component/common';
import SubHeader from 'component/subHeader';
import FileTile from 'component/fileTile';
import { normalizeURI } from 'lbryURI';

class NavigationHistoryPage extends React.PureComponent {

  render() {
    const { history } = this.props;

    return (
      <main className="main--single-column">
        <SubHeader />
        <section className="section-spaced">
          {history.length ? history.map(uri => (
            <div key={uri}>
              <FileTile uri={normalizeURI(uri)} />
            </div>
          )) : (
            <p>No history saved.</p>
          )}
        </section>
      </main>
    );
  }
}

export default NavigationHistoryPage;
