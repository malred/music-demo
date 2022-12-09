import axios from "@/utils/request";
// 登录
export const login = (params) =>
  axios({
    method: "post",
    // url: "http://localhost:9090/user/login",
    url: "https://music-back-node.vercel.app/api/user/login",
    params,
  });
// 注册
export const register = (params) =>
  axios({
    method: "post",
    // url: "http://localhost:9090/user/register",
    url: "https://music-back-node.vercel.app/api/user/register",
    params,
  });
// 获取用户信息
export const getMuserInfoByName = (uname) =>
  axios({
    // url: `http://localhost:9090/user/info?uname=${uname}`,
    url: "https://music-back-node.vercel.app/api/user/info?uname=${uname}",
    method: "GET",
  });
// 根据账号查询账号密码
export const getMuserByName = (uname) =>
  axios({
    url: `http://localhost:9090/user/muser?uname=${uname}`,
    method: "GET",
  });
// 修改密码
export const uptPass = (params) =>
  axios({
    method: "post",
    url: "http://localhost:9090/user/uptPass",
    params,
  });
// 上传头像
export const uptImg = (params) =>
  axios({
    method: "post",
    url: "http://localhost:9090/user/uptImg",
    data: params, // data: xxx 才能传文件
    // // 不加报错: Current request is not a multipart request传递文件
    headers: { "Content-Type": "application/json" },
  });
export const uptMsg = (params) =>
  axios({
    method: "post",
    url: "http://localhost:9090/user/uptMsg",
    params,
    // 设置请求头为这个,才能传递文件
    headers: {
      "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "http://localhost:9090",
      //   "Access-Control-Allow-Credentials": true,
      //   "Access-Control-Expose-Headers": "FooBar",
    },
  });
