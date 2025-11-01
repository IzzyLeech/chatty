import { closeModal } from '@redux/reducers/modal/modal.reducer';
import { clearPost, updatePostItem } from '@redux/reducers/post/post.reducer';
import { postService } from 'src/services/api/post/post.service.js';
import { Utils } from '@services/utils/utils.service';

export class PostUtitls {
  static selectBackgound(bgColor, postData, setTextAreaBackground, setPostData, setDisable) {
    postData.bgColor = bgColor;
    setTextAreaBackground(bgColor);
    setPostData(postData);
    setDisable(false);
  }

  static postInputEditable(textContent, postData, setPostData) {
    postData.post = textContent;
    setPostData(postData);
  }

  static closePostModal(dispatch) {
    dispatch(closeModal());
    dispatch(clearPost());
  }

  static clearImage(postData, post, inputRef, dispatch, setSelectedPostImage, setPostImage, setDisable, setPostData) {
    postData.gifUrl = '';
    postData.image = '';
    setSelectedPostImage(null);
    setPostImage('');
    setDisable(false);
    setTimeout(() => {
      if (inputRef?.current) {
        inputRef.current.textContent = !post ? postData.post : post;
        if (post) {
          postData.post = post;
        }
        setPostData(postData);
      }
    });
    dispatch(updatePostItem({ gifUrl: '', image: '', imgId: '', imgVersion: '' }));
  }

  static postInputData(imageInputRef, postData, post, setPostData) {
    setTimeout(() => {
      if (imageInputRef?.current) {
        imageInputRef.current.textContent = !post ? postData.post : post;
        if (post) {
          postData.post = post;
        }
        setPostData(postData);
      }
    });
  }

  static dispatchNotification(message, type, setApiResponse, setLoading, setDisable, dispatch) {
    setApiResponse(type);
    setLoading(false);
    setDisable(false);
    Utils.dispatchNotification(message, type, dispatch);
  }

  static async sendPostWithImageRequest(
    fileResult,
    postData,
    imageInputRef,
    setApiResponse,
    setLoading,
    setDisable,
    dispatch
  ) {
    try {
      postData.image = fileResult;
      if (imageInputRef?.current) {
        imageInputRef.current.textContent = postData.post;
      }
      const response = await postService.createPostWithImage(postData);
      if (response) {
        setApiResponse('success');
        setLoading(false);
      }
    } catch (error) {
      PostUtitls.dispatchNotification(
        error.response.data.message,
        'error',
        setApiResponse,
        setLoading,
        setDisable,
        dispatch
      );
    }
  }

  static checkPrivacy(post, profile, following) {
    const isPrivate = post?.privacy === 'Private' && post?.userId === profile?._id;
    const isPublic = post?.privacy === 'Public';
    const isFollower =
      post?.privacy === 'Followers' && Utils.checkIfUserIsFollowed(following, post?.userId, profile?._id);
    return isPrivate || isPublic || isFollower;
  }
}
