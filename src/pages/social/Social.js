import { Outlet } from 'react-router-dom';

import '@pages/social/Social.scss';

const Social = () => {
  return (
    <>
      <div>Header Component</div>
      <div className="dashboard">
        <div className="dashboard-sidebar">
          <div>Sidebar</div>
        </div>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Social;
