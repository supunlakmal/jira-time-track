import React from 'react'

import { createRoot } from "react-dom/client";

import App from './App.js'

const container = document.getElementById('konrix');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.Fragment>
      <App />
    </React.Fragment>
  )
}
