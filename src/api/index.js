// 统一导出api接口
import { recommendMusic, newMusic } from "./Home";
import { hotSearch, searchResultList } from "./Search";
import { getSongById, getLyricById } from "./Play";
import {
  login,
  register,
  getMuserInfoByName,
  getMuserByName,
  uptPass,
  uptMsg,
  uptImg
} from "./MUser";
export const recommendMusicAPI = recommendMusic;
export const newMusicApi = newMusic;
export const hotSearchAPI = hotSearch;
export const searchResultListAPI = searchResultList;
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
