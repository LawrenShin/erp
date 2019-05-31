import React, { Component } from 'react';

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

//import './css/base.scss';
import AppRouter from './routes/AppRouter.js';
import configureStore from './store/configureStore.js';
import { Provider, ReactReduxContext  } from 'react-redux';
import { history } from './routes/history';

const store = configureStore();

class App extends Component {
  componentDidUpdate(){

    console.log('update of APP')
  }
  render() {
    return (
      <Provider store={store} context={ReactReduxContext}>
        <DragDropContextProvider backend={HTML5Backend}>
          <AppRouter history={history} context={ReactReduxContext}/>
        </DragDropContextProvider>
      </Provider>
    );
  }
}

export default App;