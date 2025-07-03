import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import './index.css';
import './assets/scss/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './stores/store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <HashRouter>
            <App />
          </HashRouter>
      </Provider>
  </React.StrictMode>
);


reportWebVitals();
