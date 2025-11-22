import '@components/chat/window/message-input/MessageInput.scss';
import PropTypes from 'prop-types';
import Button from '@components/button/Button';
import { FaPaperPlane } from 'react-icons/fa';
import gif from '@assets/images/gif.png';
import photo from '@assets/images/photo.png';
import feeling from '@assets/images/feeling.png';
import loadable from '@loadable/component';
import Input from '@components/input/Input';
import { useState } from 'react';
import GiphyContainer from '@components/chat/giphy-container/GiphyContainer';

const EmojiPickerComponet = loadable(() => import('./EmojiPicker'), {
  fallback: <p id="loading">Loading...</p>
});

const MessageInput = ({ setChatMessage }) => {
  const [showEmojoContainer, setShowEmojiContainer] = useState(false);
  const [showGifContainer, setShowGifContainer] = useState(false);

  const handleGiphyClick = () => {};

  return (
    <>
      {showEmojoContainer && (
        <EmojiPickerComponet
          onEmojiClick={(event, eventObject) => {
            console.log(eventObject);
          }}
          pickerStyle={{ width: '352px', height: '447px' }}
        />
      )}
      {showGifContainer && <GiphyContainer handleGiphyClick={handleGiphyClick} />}
      <div className="chat-inputarea" data-testid="chat-inputarea">
        <form>
          <ul className="chat-list" style={{ borderColor: '#50b5ff' }}>
            <li
              className="chat-list-item"
              onClick={() => {
                setShowEmojiContainer(false);
                setShowGifContainer(false);
              }}
            >
              <Input id="image" name="image" type="file" className="file-input" placeholder="Select file" />
              <img src={photo} alt="" />
            </li>
            <li
              className="chat-list-item"
              onClick={() => {
                setShowGifContainer(!showGifContainer);
                setShowEmojiContainer(false);
              }}
            >
              <img src={gif} alt="" />
            </li>
            <li
              className="chat-list-item"
              onClick={() => {
                setShowEmojiContainer(!showEmojoContainer);
                setShowGifContainer(false);
              }}
            >
              <img src={feeling} alt="" />
            </li>
          </ul>
          <Input
            id="message"
            name="message"
            type="text"
            className="chat-input"
            // value=""
            labelText=""
            placeholder="Enter your message..."
          />
        </form>
        <Button label={<FaPaperPlane />} className="paper" />
      </div>
    </>
  );
};

MessageInput.propTypes = {
  setChatMessage: PropTypes.func
};

export default MessageInput;
