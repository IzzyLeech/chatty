import { closeModal } from '@redux/reducers/modal/modal.reducer';
import { clearPost, updatePostItem } from '@redux/reducers/post/post.reducer';

export class PostUtitls {
  static selectBackgound(bgColor, postData, setTextAreaBackground, setPostData, setDisable) {
    postData.bgColor = bgColor;
    setTextAreaBackground(bgColor);
    setPostData(postData);
    setDisable(false);
  }

  static postInputEditable(textContent, postData, setPostData, setDisable) {
    postData.post = textContent;
    setPostData(postData);
    setDisable(true);
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
}
