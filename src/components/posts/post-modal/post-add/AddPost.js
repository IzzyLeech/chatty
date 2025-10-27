import PostWrapper from '@components/posts/modal-wrappers/post-wrapper/PostWrapper';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '@components/posts/post-modal/post-add/AddPost.scss';
import ModalBoxContent from '@components/posts/post-modal/modal-box-content/ModalBoxContent';
import { FaTimes } from 'react-icons/fa';
import { bgColors } from '@services/utils/static.data';
import ModalBoxSelection from '../modal-box-content/ModalBoxSelection';
import Button from '@components/button/Button';

const AddPost = () => {
  const { gifModalIsOpen } = useSelector((state) => state.modal);
  const [loading] = useState(false);
  const [postImage] = useState('');
  const [allowedNumberOfCharacters] = useState('100/100');
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
              <button className="modal-box-header-cancel">X</button>
            </div>
            <hr />
            <ModalBoxContent />

            {!postImage && (
              <>
                <div className="modal-box-form" data-testid="modal-box-form">
                  <div className="main">
                    <div className="flex-row">
                      <div
                        data-testid="editable"
                        name="post"
                        contentEditable={true}
                        data-placeholder="What's on your mind?"
                        className="editable flex-item"
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {postImage && (
              <>
                <div className="modal-box-image form">
                  <div
                    data-testid="post-editable"
                    name="post"
                    contentEditable={true}
                    data-placeholder="What's on your mind?"
                    className="post-input flex-item"
                  ></div>
                  <div className="image-display">
                    <div className="image-delete-btn" data-testid="image-delete-btn"></div>
                    <FaTimes />
                    <img data-testid="post-image" className="post-image" src="" alt="" />
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
                  ></li>
                ))}
              </ul>
            </div>
            <div className="char-count-row">
              <span className="char_count">{allowedNumberOfCharacters}</span>
            </div>

            <ModalBoxSelection />

            <div className="modal-box-button" data-testid="post-button">
              <Button label="Create Post" className="post-button" disabled={true} />
            </div>
          </div>
        )}
        {gifModalIsOpen && <div>Gif</div>}
      </PostWrapper>
    </>
  );
};

export default AddPost;
