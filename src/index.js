import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Loading from "./layouts/Loading";
import {SnackbarProvider} from "notistack";

ReactDOM.render(
  <React.StrictMode>
      <React.Suspense fallback={<Loading />}>
          <SnackbarProvider
              autoHideDuration={6000}
              maxSnack={3}
              anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          >
              <App />
          </SnackbarProvider>

      </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
