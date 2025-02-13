import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './utils/i18n';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);