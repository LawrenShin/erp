import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import './assets/scss/style.scss';
import './assets/css/fixed-semantic.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';

if(typeof process.env.REACT_APP_SENTRY_DSN === 'string'){
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN })
}

ReactDOM.render(<App />, document.querySelector('.main-wrapper'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
