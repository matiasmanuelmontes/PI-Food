import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './store' 

export const axiosURL =
   process.env.REACT_APP_API ||
   process.env.REACT_APP_API_Railway ||
  "https://pi-food-1g86.onrender.com" ||
  "https://pi-food-production-ac68.up.railway.app"||
   "http://localhost:3001" ;

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode> 
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
