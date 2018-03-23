import React from 'react';
import { connect } from 'react-redux';
import { selectShowStack } from 'redux/selectors/navigation';
import NavigationHistoryPage from './view';

const select = state => ({
  history: selectShowStack(state)
});

export default connect(select, null)(NavigationHistoryPage);
