import '@components/chat/window/message-input/MessageInput.scss';
import PropTypes from 'prop-types';
import Button from '@components/button/Button';
import { FaPaperPlane } from 'react-icons/fa';
import gif from '@assets/images/gif.png';
import photo from '@assets/images/photo.png';
import feeling from '@assets/images/feeling.png';
import loadable from '@loadable/component';
import Input from '@components/input/Input';
import { useRef, useState } from 'react';
import GiphyContainer from '@components/chat/giphy-container/GiphyContainer';
import ImagePreview from '@components/chat/image-preview/ImagePreview';
import { ImageUtils } from '@services/utils/image-utils.service';

const EmojiPickerComponet = loadable(() => import('./EmojiPicker'), {
  fallback: <p id="loading">Loading...</p>
});

const MessageInput = ({ setChatMessage }) => {
  const [showEmojoContainer, setShowEmojiContainer] = useState(false);
  const [showGifContainer, setShowGifContainer] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [file, setFile] = useState();
  const fileInputRef = useRef();

  const handleGiphyClick = () => {};
  const addToPreview = async (file) => {
    ImageUtils.checkFile(file);
    setFile(URL.createObjectURL(file));
    const result = await ImageUtils.readAsBase64(file);
    console.log(result);
    setShowImagePreview(!showImagePreview);
    setShowEmojiContainer(false);
    setShowGifContainer(false);
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

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
        {showImagePreview && (
          <ImagePreview
            image={file}
            onRemoveImage={() => {
              setFile('');
              setShowImagePreview(showImagePreview);
            }}
          />
        )}
        <form>
          <ul className="chat-list" style={{ borderColor: '#50b5ff' }}>
            <li
              className="chat-list-item"
              onClick={() => {
                fileInputClicked();
                setShowEmojiContainer(false);
                setShowGifContainer(false);
              }}
            >
              <Input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                className="file-input"
                placeholder="Select file"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                  }
                }}
                handleChange={(event) => addToPreview(event.target.files[0])}
              />
              <img src={photo} alt="" />
            </li>
            <li
              className="chat-list-item"
              onClick={() => {
                setShowGifContainer(!showGifContainer);
                setShowEmojiContainer(false);
                setShowImagePreview(false);
              }}
            >
              <img src={gif} alt="" />
            </li>
            <li
              className="chat-list-item"
              onClick={() => {
                setShowEmojiContainer(!showEmojoContainer);
                setShowGifContainer(false);
                setShowImagePreview(false);
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
