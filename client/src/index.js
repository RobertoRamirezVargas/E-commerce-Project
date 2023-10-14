import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { MyContextProvider } from './components/MyContext';
ReactDOM.render(
  // <React.StrictMode>
  <MyContextProvider>
    <App />
  </MyContextProvider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);
