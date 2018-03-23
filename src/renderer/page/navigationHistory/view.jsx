import React from 'react';
import { BusyMessage } from 'component/common';
import SubHeader from 'component/subHeader';
// import TransactionList from 'component/transactionList';

class NavigationHistoryPage extends React.PureComponent {

  render() {
    // const { } = this.props;

    return (
      <main className="main--single-column">
        <SubHeader />
        <section className="card">
          <p>history...</p>
        </section>
      </main>
    );
  }
}

export default NavigationHistoryPage;
