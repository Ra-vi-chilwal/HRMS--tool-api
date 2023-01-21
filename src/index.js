import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './Redux/store';

import Root from './Root';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>,

  <BrowserRouter >
  <Root/>
  </BrowserRouter>
  </Provider>
);
reportWebVitals();
