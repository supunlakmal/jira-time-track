import React from 'react';
import AllRoutes from './routes/Routes';
import { LayoutProvider } from './context/LayoutContext';
import { AuthProvider } from './context/AuthContext';

import "nouislider/distribute/nouislider.css";

import "./assets/scss/app.scss";
import "./assets/scss/icons.scss";

const App = () => {
  return (
    <React.Fragment>
      <LayoutProvider>
        <AuthProvider>
          <AllRoutes />
        </AuthProvider>
      </LayoutProvider>
    </React.Fragment>
  );
}

export default App;
