import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from './redux/store'
import { ContextProvider } from "./contexts/ContextProvider"
// import Hover from './utils/Hover/Hover';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>      {/* react-redux */}
    <ContextProvider>             {/* context-api */}
      <BrowserRouter>         {/* react-router-dom */}
        <App />
        {/* <Hover /> */}
      </BrowserRouter>
    </ContextProvider>
  </Provider>
);
