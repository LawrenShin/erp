import React, { Component } from 'react';

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

//import './css/base.scss';
import AppRouter from './routes/AppRouter.js';
import { Provider, ReactReduxContext  } from 'react-redux';
import { history } from './routes/history';
import { store } from './store/createdStore'

// if (process.env.NODE_ENV !== 'production') {
  // const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React, { exclude: [/^Notificator/] });
// }

class App extends Component {
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