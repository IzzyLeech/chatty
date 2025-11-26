import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@pages/social/streams/Streams.scss';
import Suggestions from '@components/suggestions/Suggestions';
import { getUserSuggestions } from '@redux/api/suggestions';
import useEffectOnce from '@hooks/useEffectOnce';
import PostForm from '@components/posts/post-form/PostForm';
import Posts from '@components/posts/Posts';
import { Utils } from '@services/utils/utils.service';
import { postService } from '@services/api/post/post.service';
import { getPosts } from '@redux/api/posts';
import { orderBy, uniqBy } from 'lodash';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { PostUtils } from '@services/utils/post-utils-service';
import useLocalStorage from '@hooks/useLocalStorage';
import { followerService } from '@services/api/followers/follower.service';
import { useLocation } from 'react-router-dom';

const Streams = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const bodyRef = useRef(null);
  const [following, setFollowing] = useState([]);
  const bottomLineRef = useRef();
  const dispatch = useDispatch();
  const storedUsername = useLocalStorage('username', 'get');
const location = useLocation();
  const {
    posts: reduxPosts,
    totalPostsCount: reduxTotalPostsCount,
    isLoading: reduxIsLoading
  } = useSelector((state) => state.allPosts);

  let appPosts = useRef([]);
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteSelectedPostId] = useLocalStorage('selectedPostId', 'delete');
  useInfiniteScroll(bodyRef, bottomLineRef, fetchPostData);

  function fetchPostData() {
    let pageNum = currentPage;
    if (currentPage <= Math.round(totalPostsCount / PAGE_SIZE)) {
      pageNum += 1;
      setCurrentPage(pageNum);
      getAllPosts();
    }
  }

  const getAllPosts = async () => {
    try {
      const response = await postService.getAllPosts(currentPage);
      if (response.data.posts.length > 0) {
        appPosts = [...posts, ...response.data.posts];
        const allPosts = uniqBy(appPosts, '_id');
        const orderedPosts = orderBy(allPosts, ['createdAt'], ['desc']);
        setPosts(orderedPosts);
      }
      setLoading(false);
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  const getReactionsByUsername = async () => {
    try {
      const response = await postService.getReactionsByUsername(storedUsername);
      setFollowing(response.data.reactions);
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  const getUserFollowing = async () => {
    try {
      const response = await followerService.getUserFollowing();
      setFollowing(response.data.following);
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  useEffectOnce(() => {
    getUserFollowing();
    getReactionsByUsername();
    deleteSelectedPostId();
    dispatch(getPosts());
    dispatch(getUserSuggestions());
  });

  useEffect(() => {
    setLoading(reduxIsLoading);
    const orderedPosts = orderBy(reduxPosts, ['createdAt'], ['desc']);
    setPosts(orderedPosts);
    setTotalPostsCount(reduxTotalPostsCount);
  }, [reduxPosts, reduxTotalPostsCount, reduxIsLoading]);

  useEffect(() => {
    PostUtils.socketIOPost(posts, setPosts);
  }, [posts]);
  return (
    <div className="streams" data-testid="streams">
      <div className="streams-content">
        <div className="streams-post" ref={bodyRef} style={{ backgroundColor: 'white' }}>
          <div>
            <PostForm />
            <Posts allPosts={posts} postsLoading={loading} userFollowing={following} />
          </div>
          <div ref={bottomLineRef} style={{ marginBottom: '50px', height: '50px' }}></div>
        </div>
        <div className="streams-suggestions">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};
export default Streams;
