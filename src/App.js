import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@root/App.scss';
import { AppRouter } from './routes';
import { useEffect } from 'react';
import { socketServive } from '@services/socket/socket.service';

export const App = () => {
  useEffect(() => {
    socketServive.setupSocketConnection();
  }, []);

  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};
export default App;
