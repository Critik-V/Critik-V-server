import axios from 'axios';

const commentsUrl = import.meta.env.VITE_COMMENTS_URL;

enum LikeCommentAction {
  TRUE = 'true',
  FALSE = 'false',
}

export const createPost = async (Data: {
  content: string;
  postId: string;
  authorId: string;
}) => {
  try {
    const { data } = await axios.post(commentsUrl, {
      data: Data,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (
  Id: string,
  Data: { content: string; authorId: string }
) => {
  try {
    const { data } = await axios.patch(commentsUrl + '/' + Id, {
      data: Data,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (Id: string, authorId: string) => {
  try {
    const { data } = await axios.delete(commentsUrl + '/' + Id, {
      data: { authorId },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostComments = async (postId: string) => {
  try {
    const { data } = await axios.get(commentsUrl, { data: { postId } });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const upLikeComment = async (
  Id: string,
  userId: string,
  action: LikeCommentAction
) => {
  try {
    const { data } = await axios({
      method: 'patch',
      url: commentsUrl + '/like/' + Id,
      data: {
        userId,
      },
      params: { action },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const downLikeComment = async (
  Id: string,
  userId: string,
  action: LikeCommentAction
) => {
  try {
    const { data } = await axios({
      method: 'patch',
      url: commentsUrl + '/dislike/' + Id,
      data: {
        userId,
      },
      params: { action },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
