import axios from 'axios';

const postsUrl: string = import.meta.env.VITE_POSTS_URL;
enum JobType {
  INTERNSHIP = 'INTERNSHIP',
  APPRENTICESHIP = 'APPRENTICESHIP',
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  FREELANCE = 'FREELANCE',
}
enum ExprerienceLevel {
  ENTRY_LEVEL = 'ENTRY_LEVEL',
  JUNIOR = 'JUNIOR',
  MID = 'MID',
  SENIOR = 'SENIOR',
}

enum FavActionType {
  ADD = 'add',
  REMOVE = 'remove',
}

export const getPosts = async () => {
  try {
    const { data } = await axios.get(postsUrl);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (Data: {
  resume: File;
  title: string;
  description: string;
  jobType: JobType;
  experienceLevel: ExprerienceLevel;
  establishmentName?: string;
  domain?: string;
  authorId: string;
}) => {
  try {
    const { data } = await axios.post(postsUrl, {
      data: Data,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (
  Id: string,
  Data: {
    title?: string;
    description?: string;
    jobType?: JobType;
    experienceLevel?: ExprerienceLevel;
    establishmentName?: string;
    domain?: string;
  }
) => {
  try {
    const { data } = await axios.patch(postsUrl + '/' + Id, {
      data: Data,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (Id: string) => {
  try {
    const { data } = await axios.delete(postsUrl + '/' + Id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getArchivedPost = async (
  Id: string,
  Data: { authorId: string }
) => {
  try {
    const { data } = await axios({
      url: postsUrl + '/archive/' + Id,
      data: Data,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const archivePost = async (Id: string, Data: { authorId: string }) => {
  try {
    const { data } = await axios.patch(postsUrl + '/archive/' + Id, {
      Data,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyPosts = async (authorId: string) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: postsUrl + '/mine',
      data: {
        authorId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getArchivedPosts = async (authorId: string) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: postsUrl + '/archived',
      data: {
        authorId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const favoritePost = async (
  Data: { id: string; userId: string },
  action: FavActionType
) => {
  try {
    const { data } = await axios.patch(postsUrl + '/fav?action=' + action, {
      data: Data,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (Id: string) => {
  try {
    const { data } = await axios.get(postsUrl + '/' + Id);
    return data;
  } catch (error) {
    console.log(error);
  }
};
