// 统一导出api接口
import { recommendMusic, newMusic } from "./Home";
import { hotSearch, searchResultList, getMusicById } from "./Search";
import { getSongById, getLyricById } from "./Play";
import {
  login,
  register,
  getMuserInfoByName,
  getMuserByName,
  uptPass,
  uptMsg,
  uptImg,
  addLike,
  getLikes,
  delLike,
  addFriend,
  getFriends,
  getFriendsByFid,
  delFriend,
  uploadImg,
} from "./MUser";
export const recommendMusicAPI = recommendMusic;
export const newMusicApi = newMusic;
export const hotSearchAPI = hotSearch;
export const searchResultListAPI = searchResultList;
export const getMusicByIdApi = getMusicById;
export const getSongByIdAPI = getSongById;
export const getLyricByIdAPI = getLyricById;
// 本地后端接口
export const loginApi = login;
export const registerApi = register;
export const getMuserInfoByNameApi = getMuserInfoByName;
export const getMuserByNameApi = getMuserByName;
export const uptPassApi = uptPass;
export const uptImgApi = uptImg;
export const uptMsgApi = uptMsg;
export const addLikeApi = addLike;
export const getLikesApi = getLikes;
export const delLikeApi = delLike;
export const addFriendApi = addFriend;
export const getFriendsApi = getFriends;
export const getFriendsByFidApi = getFriendsByFid;
export const delFriendApi = delFriend;
export const uploadImgApi = uploadImg;
