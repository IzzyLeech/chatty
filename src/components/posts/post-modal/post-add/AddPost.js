import PostWrapper from '@components/posts/modal-wrappers/post-wrapper/PostWrapper';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@components/posts/post-modal/post-add/AddPost.scss';
import ModalBoxContent from '@components/posts/post-modal/modal-box-content/ModalBoxContent';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import { bgColors } from '@services/utils/static.data';
import ModalBoxSelection from '../modal-box-content/ModalBoxSelection';
import Button from '@components/button/Button';
import { PostUtitls } from '@services/utils/post-utils-service';
import { toggleGifModal } from '@redux/reducers/modal/modal.reducer';
import Giphy from '@components/giphy/Giphy';
import PropTypes from 'prop-types';

const AddPost = ({ selectedImage }) => {
  const { gifModalIsOpen } = useSelector((state) => state.modal);
  const { gifUrl, image } = useSelector((state) => state.post);
  const [loading] = useState(false);
  const [postImage, setPostImage] = useState('');
  const [allowedNumberOfCharacters] = useState('100/100');
  const [textAreaBackground, setTextareaBackground] = useState('#ffffff');
  const [postData, setPostData] = useState({
    post: '',
    bgColor: textAreaBackground,
    privacy: '',
    feelings: '',
    gifUrl: '',
    profilePicture: '',
    image: ''
  });
  const [disable, setDisable] = useState(false);
  const [selectedPostImage, setSelectedPostImage] = useState();
  const counterRef = useRef(null);
  const inputRef = useRef(null);
  const imageInputRef = useRef(null);
  const dispatch = useDispatch();
  const maxNumberOfCharacters = 100;

  const selectBackground = (bgColor) => {
    console.log(selectedPostImage);
    console.log(selectedImage);
    PostUtitls.selectBackgound(bgColor, postData, setTextareaBackground, setPostData, setDisable);
  };

  const postInputEditable = (event, textContent) => {
    const currentTextLength = event.target.textContent.length;
    const counter = maxNumberOfCharacters - currentTextLength;
    counterRef.current.textContent = `${counter}/100`;
    PostUtitls.postInputEditable(textContent, postData, setPostData, setDisable);
  };

  const closePostModal = () => {
    PostUtitls.closePostModal(dispatch);
  };

  const onKeyDown = (event) => {
    const currentTextLength = event.target.textContent.length;
    if (currentTextLength === maxNumberOfCharacters && event.keyCode !== 8) {
      event.preventDefault();
    }
  };

  const clearImage = () => {
    PostUtitls.clearImage(
      postData,
      '',
      inputRef,
      dispatch,
      setSelectedPostImage,
      setPostImage,
      setDisable,
      setPostData
    );
  };

  useEffect(() => {
    if (gifUrl) {
      setPostImage(gifUrl);
      PostUtitls.postInputData(imageInputRef, postData, '', setPostData);
    } else if (image) {
      setPostImage(image);
      PostUtitls.postInputData(imageInputRef, postData, '', setPostData);
    }
  }, [gifUrl, image, postData]);
  return (
    <>
      <PostWrapper>
        <div></div>
        {!gifModalIsOpen && (
          <div className="modal-box">
            {loading && (
              <div className="modal-box-loading" data-testid="modal-box-load">
                <span>Posting...</span>
              </div>
            )}
            <div className="modal-box-header">
              <h2>Create Post</h2>
              <button className="modal-box-header-cancel" onClick={() => closePostModal()}>
                X
              </button>
            </div>
            <hr />
            <ModalBoxContent />

            {!postImage && (
              <>
                <div
                  className="modal-box-form"
                  data-testid="modal-box-form"
                  style={{ background: `${textAreaBackground}` }}
                >
                  <div className="main" style={{ margin: textAreaBackground !== '#ffffff' ? '0 auto' : '' }}>
                    <div className="flex-row">
                      <div
                        data-testid="editable"
                        name="post"
                        ref={(el) => {
                          inputRef.current = el;
                          inputRef?.current?.focus();
                        }}
                        contentEditable={true}
                        onInput={(e) => postInputEditable(e, e.currentTarget.textContent)}
                        onKeyDown={onKeyDown}
                        data-placeholder="What's on your mind?"
                        className={`editable flex-item ${textAreaBackground !== '#ffffff' ? 'textInputColor' : ''}`}
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {postImage && (
              <>
                <div className="modal-box-image-form">
                  <div
                    data-testid="post-editable"
                    name="post"
                    ref={(el) => {
                      imageInputRef.current = el;
                      imageInputRef?.current?.focus();
                    }}
                    contentEditable={true}
                    data-placeholder="What's on your mind?"
                    className="post-input flex-item"
                    onInput={(e) => postInputEditable(e, e.currentTarget.textContent)}
                    onKeyDown={onKeyDown}
                  ></div>
                  <div className="image-display">
                    <div className="image-delete-btn" data-testid="image-delete-btn" onClick={() => clearImage()}>
                      <FaTimes />
                    </div>
                    <img data-testid="post-image" className="post-image" src={`${postImage}`} alt="" />
                  </div>
                </div>
              </>
            )}

            <div className="modal-box-bg-colors">
              <ul>
                {bgColors.map((color, index) => (
                  <li
                    data-testid="bg-colors"
                    key={index}
                    className={`${color === '#ffffff' ? 'whiteColorBorder' : ''}`}
                    style={{ backgroundColor: `${color}` }}
                    onClick={() => selectBackground(color)}
                  ></li>
                ))}
              </ul>
            </div>
            <div className="char-count-row">
              <span className="char_count" data-testid="allowed-number" ref={counterRef}>
                {allowedNumberOfCharacters}
              </span>
            </div>

            <ModalBoxSelection setSelectedPostImage={setSelectedPostImage} />

            <div className="modal-box-button" data-testid="post-button">
              <Button label="Create Post" className="post-button" disabled={disable} />
            </div>
          </div>
        )}
        {gifModalIsOpen && (
          <div className="modal-giphy" data-testid="modal-giphy">
            <div className="modal-giphy-header">
              <Button
                label={<FaArrowLeft />}
                className="back-button"
                disabled={false}
                handleClick={() => dispatch(toggleGifModal(!gifModalIsOpen))}
              />
              <h2>Choose a GIF</h2>
            </div>
            <hr />
            <Giphy />
          </div>
        )}
      </PostWrapper>
    </>
  );
};

AddPost.propTypes = {
  selectedImage: PropTypes.string
};

export default AddPost;
