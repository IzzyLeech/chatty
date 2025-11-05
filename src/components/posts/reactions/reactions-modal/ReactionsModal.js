import ReactionWrapper from '@components/posts/modal-wrappers/reaction-wrapper/ReactionWrapper';
import React, { useState } from 'react';
import ReactionList from '@components/posts/reactions/reactions-modal/reaction-list/ReactionList';
import { reactionsMap } from '@services/utils/static.data';
import { Utils } from '@services/utils/utils.service';
import { useDispatch, useSelector } from 'react-redux';
import { postService } from '@services/api/post/post.service';
import { filter, orderBy, some } from 'lodash';
import useEffectOnce from '@hooks/useEffectOnce';
import { closeModal } from '@redux/reducers/modal/modal.reducer';
import { clearPost } from '@redux/reducers/post/post.reducer';
import '@components/posts/reactions/reactions-modal/ReactionsModal.scss';

const ReactionsModal = () => {
  const { _id, reactions } = useSelector((state) => state.post);
  const [activeViewAllTab, setActiveViewAllTab] = useState(true);
  const [formattedReactions, setFormattedReactions] = useState([]);
  const [reactionType, setReactionType] = useState('');
  const [reactionColor, setReactionColor] = useState('');
  const [postReactions, setPostReactions] = useState([]);
  const [reactionsOfPost, setReactionsOfPost] = useState([]);
  const dispatch = useDispatch();

  const getPostReactions = async () => {
    try {
      const response = await postService.getPostReactions(_id);
      const orderedPosts = orderBy(response.data?.reactions, ['createdAt'], ['desc']);
      setPostReactions(orderedPosts);
      setReactionsOfPost(orderedPosts);
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  const closeReactionModal = () => {
    dispatch(closeModal());
    dispatch(clearPost());
  };

  const viewAll = () => {
    setActiveViewAllTab(true);
    setReactionType('');
    setPostReactions(reactionsOfPost);
  };

  const reactionList = (type) => {
    setActiveViewAllTab(false);
    setReactionType(type);
    const exist = some(reactionsOfPost, (reaction) => reaction.type === type);
    const filteredReactions = exist ? filter(reactionsOfPost, (reaction) => reaction.type === type) : [];
    setPostReactions(filteredReactions);
    setReactionColor(reactionColor[type]);
  };

  useEffectOnce(() => {
    getPostReactions();
    setFormattedReactions(Utils.formattedReactions(reactions));
  });

  return (
    <>
      <ReactionWrapper closeModal={closeReactionModal}>
        <div className="modal-reactions-header-tabs">
          <ul className="modal-reactions-header-tabs-list">
            <li className={`${activeViewAllTab ? 'activeViewAllTab' : 'all'}`} onClick={viewAll}>
              All
            </li>
            {formattedReactions.map((reaction, index) => (
              <li
                key={index}
                className={`${reaction.type === reactionType ? 'activeTab' : ''}`}
                style={{ color: `${reactionType.type === reactionType ? reactionColor : ''}` }}
                onClick={() => reactionList(reaction?.type)}
              >
                <img src={`${reactionsMap[reaction?.type]}`} alt="" />
                <span>{Utils.shortenLargeNumbers(reaction?.value)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-reactions-list">
          <ReactionList postReactions={postReactions} />
        </div>
      </ReactionWrapper>
    </>
  );
};

export default ReactionsModal;
