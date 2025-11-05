import React from 'react';
import PropTypes from 'prop-types';
import CommentArea from '../comment-area/CommentArea';
import ReactionsAndCommentDisplay from '../reactions/reactions-and-comments-display/ReactionsAndCommentDisplay';

const PostCommentSection = ({ post }) => {
  return (
    <div data-testid="comment-section">
      <ReactionsAndCommentDisplay post={post} />
      <CommentArea post={post} />
    </div>
  );
};

PostCommentSection.propTypes = {
  post: PropTypes.object
};

export default PostCommentSection;
