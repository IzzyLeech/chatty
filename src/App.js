import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@root/App.scss';
import { AppRouter } from './routes';
import { useEffect } from 'react';
import { socketServive } from '@services/socket/socket.service';
import Toast from '@components/toast/Toast';
// import checkIcon from '@assets/images/check.svg';
// import errorIcon from '@assets/images/error.svg';
// import infoIcon from '@assets/images/info.svg';
// import warningIcon from '@assets/images/warning.svg';

export const App = () => {
  const notifications = [];

  useEffect(() => {
    socketServive.setupSocketConnection();
  }, []);

  return (
    <>
      {notifications && notifications.length > 0 && (
        <Toast position="top-right" toastList={notifications} autoDelete={true} />
      )}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};
export default App;
