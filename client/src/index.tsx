import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
//import ReactGA from 'react-ga4';
import { ToastProvider } from './utils/ToastContext';
import { QueryClient, QueryClientProvider } from 'react-query'
// import { inject } from '@vercel/analytics';
// import { injectSpeedInsights } from '@vercel/speed-insights/*';

//ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID || "" );
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID || ""}>
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
          <App />
          </QueryClientProvider>
        </ToastProvider>
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);

// inject();
// injectSpeedInsights

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
