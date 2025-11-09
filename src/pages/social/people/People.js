import Avatar from '@components/avatar/Avatar';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import '@pages/social/people/People.scss';
import { Utils } from '@services/utils/utils.service';
import { useRef, useState } from 'react';
import { FaCircle } from 'react-icons/fa';

const People = () => {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const bodyRef = useRef(null);
  const bottomLineRef = useRef(null);
  useInfiniteScroll(bodyRef, bottomLineRef, fetchData);

  function fetchData() {}
  return (
    <div className="card-container" ref={bodyRef}>
      <div className="people">People</div>
      {users.length > 0 && (
        <div className="card-element">
          {users.map((data, index) => {
            <div className="card-element-item" key={index} data-testid="card-element-item">
              {Utils.checkIfUserIsOnline(data?.username, onlineUsers) && (
                <div className="card-element-item-indicator">
                  <FaCircle className="online-indicator" />
                </div>
              )}
              <div className="card-element-header">
                <div className="card-element-header-bg">
                  <Avatar
                    name={data?.username}
                    bgColor={data?.avatarColor}
                    textColor="#ffffff"
                    size={120}
                    avatarSrc={data?.profilePicture}
                  />
                  <div className="card-element-header-text">
                    <span className="card-element-header-name">{data?.username}</span>
                  </div>
                </div>
              </div>
            </div>;
          })}
        </div>
      )}
      {loading && !users.length && <div className="card-element" style={{ height: '350px' }}></div>}
      {!loading && !users.length && (
        <div className="empty-page" data-testid="empty-page">
          No user available
        </div>
      )}

      <div ref={bottomLineRef} style={{ marginBottom: '80px', height: '50px' }}></div>
    </div>
  );
};

export default People;
