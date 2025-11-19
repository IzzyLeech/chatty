import useEffectOnce from '@hooks/useEffectOnce';
import '@pages/social/chat/Chat.scss';
import { getConversationList } from '@redux/api/chat';
import { useDispatch, useSelector } from 'react-redux';
import '@pages/social/chat/Chat.scss';

const Chat = () => {
  const { selectedChatUser, chatList } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(getConversationList());
  });

  return (
    <div className="private-chat-wrapper">
      <div className="private-chat-wrapper-content">
        <div className="private-chat-wrapper-content-side">
          <div>Chat List</div>
        </div>
        <div className="private-chat-wrapper-content-conversation">
          {(selectedChatUser || chatList.length > 0) && <div>Chat Window</div>}
          {!selectedChatUser && !chatList.length && (
            <div className="no-chat" data-testid="no-chat">
              Select or Search for user to chat with
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
