import React, { Component } from 'react';

//import './css/base.scss';
import AppRouter from './routes/AppRouter.js';
import configureStore from './store/configureStore.js';
import { Provider, ReactReduxContext  } from 'react-redux';
import { history } from './routes/history';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store} context={ReactReduxContext}>
          <AppRouter history={history} context={ReactReduxContext}/>
      </Provider>
    );
  }
}

export default App;