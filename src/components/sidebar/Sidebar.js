import '@components/sidebar/Sidebar.scss';
import { sideBarItems, fontAwesomeIcons } from '@services/utils/static.data';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, createSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '@redux/api/posts';
import { Utils } from '@services/utils/utils.service';
import { ChatUtils } from '@services/utils/chat-utils.service';
import { chatService } from '@services/api/chat/chat.service';
import { socketService } from '@services/socket/socket.service';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState([]);
  const location = useLocation();
  const { chatList } = useSelector((state) => state.chat);
  const { profile } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigatedRef = useRef(false);
  const onChatPage = location.pathname.includes('/app/social/chat');

  const checkUrl = (name) => {
    return location.pathname.includes(name.toLowerCase());
  };

  const navigateToPage = (name, url) => {
    if (name === 'Profile') {
      url = `${url}/${profile?.username}?${createSearchParams({ id: profile?._id, uId: profile?.uId })}`;
    }

    if (name === 'Streams') {
      dispatch(getPosts());
    }

    if (name !== 'Chat' && onChatPage) {
      leaveChatPage();
    }

    socketService?.socket.off('message received');
    navigate(url);
  };

  const createChatUrlParams = useCallback(
    (url) => {
      if (chatList.length) {
        const chatUser = chatList[0];
        const params = ChatUtils.chatUrlParams(chatUser, profile);
        ChatUtils.joinRoomEvent(chatUser, profile);
        return `${url}?${createSearchParams(params)}`;
      } else {
        return url;
      }
    },
    [chatList, profile]
  );

  const markMessagesAsRead = useCallback(
    async (user) => {
      try {
        const receiverId = user?.receiverUsername !== profile?.username ? user?.receiverId : user?.senderId;
        if (user?.receiverUsername === profile?.username && !user.isRead) {
          await chatService.markMessagesAsRead(profile?._id, receiverId);
        }
        const userTwoName =
          user?.receiverUsername !== profile?.username ? user?.receiverUsername : user?.senderUsername;
        await chatService.addChatUsers({ userOne: profile?.username, userTwo: userTwoName });
        ChatUtils.privateChatMessages = [];
      } catch (error) {
        Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
      }
    },
    [dispatch, profile]
  );

  const leaveChatPage = async () => {
    try {
      const chatUser = chatList[0];
      const userTwoName =
        chatUser?.receiverUsername !== profile?.username ? chatUser?.receiverUsername : chatUser?.senderUsername;
      ChatUtils.privateChatMessages = [];
      await chatService.removeChatUsers({ userOne: profile?.username, userTwo: userTwoName });
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  useEffect(() => {
    setSidebar(sideBarItems);
  }, []);

  useEffect(() => {
    if (!onChatPage) return;

    if (!location.search && chatList.length) {
      const sortedList = [...chatList].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      const firstChat = sortedList[0];

      const url = createChatUrlParams('/app/social/chat/messages', firstChat);
      navigate(url, { replace: true });

      if (firstChat && !firstChat.isRead) {
        markMessagesAsRead(firstChat);
      }
    }
  }, [onChatPage, location.search, chatList, createChatUrlParams, markMessagesAsRead, navigate]);

  return (
    <div className="app-side-menu">
      <div className="side-menu">
        <ul className="list-unstyled">
          {sidebar.map((data) => (
            <li key={data.index} onClick={() => navigateToPage(data.name, data.url)}>
              <div data-testid="sidebar-list" className={`sidebar-link ${checkUrl(data.name) ? 'active' : ''}`}>
                <div className="menu-icon">{fontAwesomeIcons[data.iconName]}</div>
                <div className="menu-link">
                  <span>{`${data.name}`}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
