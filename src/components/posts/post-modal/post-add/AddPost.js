import PostWrapper from '@components/posts/modal-wrappers/post-wrapper/PostWrapper';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '@components/posts/post-modal/post-add/AddPost.scss';
import ModalBoxContent from '@components/posts/post-modal/modal-box-content/ModalBoxContent';

const AddPost = () => {
  const { gifModalIsOpen } = useSelector((state) => state.modal);
  const [loading] = useState(false);
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
          </div>
        )}
        {gifModalIsOpen && <div>Gif</div>}
        <div></div>
      </PostWrapper>
    </>
  );
};

export default AddPost;
