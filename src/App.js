import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@root/App.scss';
import { AppRouter } from './routes';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};
export default App;
