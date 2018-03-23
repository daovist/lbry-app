import React from 'react';
import { BusyMessage } from 'component/common';
import SubHeader from 'component/subHeader';
// import TransactionList from 'component/transactionList';

class NavigationHistoryPage extends React.PureComponent {

  render() {
    const { history } = this.props;

    return (
      <main className="main--single-column">
        <SubHeader />
        <section className="card">
          {history.map(page => (<p>{page}</p>))}
        </section>
      </main>
    );
  }
}

export default NavigationHistoryPage;
