// Module 2:
// * import BrowserRouter from 'react-router-dom'
// * wrap App components with BrowserRouter

// Module 3:
// * import Provider from 'react-redux'
// * wrap your App + Browser with Redux Provider in src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";
import store from "./store";
import "./index.css";

const container = document.getElementById("root");
const rootElement = createRoot(container);

rootElement.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>
);
