import '@components/posts/modal-wrappers/post-wrapper/PostWrapper.scss';
import PropTypes from 'prop-types';

const PostWrapper = ({ children }) => {
  return (
    <div className="modal-wrapper" data-testid="post-modal">
      <div className="modal-bg"></div>
      {children}
    </div>
  );
};

PostWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PostWrapper;
