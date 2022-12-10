import axios from "@/utils/request";
/** 登录 */
export const login = (params) =>
    axios({
        method: "post",
        url: "http://localhost:9090/user/login",
        // url: "http://localhost:3000/api/user/login",
        // url: "https://music-back-node.vercel.app/api/user/login",
        data: params,
    });
/** 注册 */
export const register = (params) =>
    axios({
        method: "post",
        url: "http://localhost:9090/user/register",
        // url: "http://localhost:3000/api/user/register",
        // url: "https://music-back-node.vercel.app/api/user/register",
        params,
    });
/** 获取用户信息 */
export const getMuserInfoByName = (uname) =>
    axios({
        url: `http://localhost:9090/user/info?uname=${uname}`,
        // url: `http://localhost:3000/api/user/info?uname=${uname}`,
        // url: `https://music-back-node.vercel.app/api/user/info?uname=${uname}`,
        method: "GET",
    });
/** 根据账号查询账号密码 */
export const getMuserByName = (uname) =>
    axios({
        url: `http://localhost:9090/user/muser?uname=${uname}`,
        // url: `http://localhost:3000/api/user/muser?uname=${uname}`,
        // url: `https://music-back-node.vercel.app/api/user/muser?uname=${uname}`,
        method: "GET",
    });
/** 修改密码 */
export const uptPass = (params) =>
    axios({
        method: "post",
        url: "http://localhost:9090/user/uptPass",
        // url: "http://localhost:3000/api/user/uptPass",
        // url: "https://music-back-node.vercel.app/api/user/uptPass",
        params,
    });
/** 上传头像 */
export const uptImg = (params) =>
    axios({
        method: "post",
        url: "http://localhost:9090/user/uptImg",
        // url: "http://localhost:3000/api/user/uptImg",
        // url: "https://music-back-node.vercel.app/api/user/uptImg",
        data: params, // data: xxx 才能传文件
        // 不加报错: Current request is not a multipart request传递文件
        headers: { "Content-Type": "multipart/form-data" },
    });
// 更新个人信息
export const uptMsg = (params) =>
    axios({
        method: "post",
        url: "http://localhost:9090/user/uptMsg",
        // url: "http://localhost:3000/api/user/uptMsg", // vercel离线调试
        // url: "https://music-back-node.vercel.app/api/user/uptMsg", // vercel远程serverless 
        data: params,
        headers: {
            // 传递表单
            "Content-Type": "application/json",
            //   "Access-Control-Allow-Origin": "http://localhost:9090",
            //   "Access-Control-Allow-Credentials": true,
            //   "Access-Control-Expose-Headers": "FooBar",
        },
    });
/** 添加喜欢音乐 */
export const addLike = (params) =>
    axios({
        method: "post",
        url: "http://localhost:9090/music/addLike",
        // url: "http://localhost:3000/api/music/addLike",
        // url: "https://music-back-node.vercel.app/api/music/addLike",
        data: params,
        headers: {
            "Content-Type": "application/json",
        },
    });
/** 获取喜欢的音乐列表 */
export const getLikes = (uid) =>
    axios({
        url: `http://localhost:9090/music/getLikes?uid=${uid}`,
        // url: `http://localhost:3000/api/music/getLikes?uid=${uid}`,
        // url: `https://music-back-node.vercel.app/api/music/getLikes?uid=${uid}`,
        method: "GET",
    });
/** 从我喜欢的音乐中移除歌曲(根据uid和mid) */
export const delLike = (params) =>
    axios({
        url: `http://localhost:9090/music/delLike`,
        // url: `http://localhost:3000/api/music/delLike`,
        // url: `https://music-back-node.vercel.app/api/music/delLike`,
        method: "delete",
        params,
    });
/** 添加好友 */
export const addFriend = (params) =>
    axios({
        url: `http://localhost:9090/friend/addFriend`,
        // url: `http://localhost:3000/api/friend/addFriend`,
        // url: `https://music-back-node.vercel.app/api/friend/addFriend`,
        method: "post",
        data: params,
        headers: {
            "Content-Type": "application/json",
        },
    });
/** 获取所有好友信息 */
export const getFriends = (uid) =>
    axios({
        url: `http://localhost:9090/friend/getFriends?uid=${uid}`,
        // url: `http://localhost:3000/api/friend/getFriends?uid=${uid}`,
        // url: `https://music-back-node.vercel.app/api/friend/getFriends?uid=${uid}`,
        method: "GET",
    });
/** 通过fid获取好友信息 */
export const getFriendsByFid = (fid) =>
    axios({
        url: `http://localhost:9090/friend/getFriendByFid?fid=${fid}`,
        // url: `http://localhost:3000/api/friend/getFriendByFid?fid=${fid}`,
        // url: `https://music-back-node.vercel.app/api/friend/getFriendByFid?fid=${fid}`,
        method: "GET",
    });
/** 根据fid删除好友 */
export const delFriend = (params) =>
    axios({
        url: `http://localhost:9090/friend/delFriend`,
        // url: `http://localhost:3000/api/friend/delFriend`,
        // url: `https://music-back-node.vercel.app/api/friend/delFriend`,
        method: "delete",
        params,
    });
/** 上传封面 */
export const uptCover = (params) =>
    axios({
        method: "post",
        url: "http://localhost:9090/blog/updCover",
        data: params, // data: xxx 才能传文件
        // 不加报错: Current request is not a multipart request传递文件
        headers: { "Content-Type": "multipart/form-data" },
    });
/** 添加文章 * /
export const addBlog = (params) =>
    axios({
        method: "post",
        url: "http://localhost:9090/blog/addBlog",
        data: params,
    });
/** 获取文章 */
export const getBlogs = (uid) =>
    axios({
        method: 'get',
        url: `http://localhost:9090/blog/getUserBlogs?uid=${uid}`,
    })
/** 根据bid获取文章 */
export const getBlogByBid = (bid) => axios({
    method: 'get',
    url: `http://localhost:9090/blog/getBlogByBid?bid=${bid}`
})
/** 修改文章 */
export const uptBlog = (params) =>
    axios({
        method: "post",
        url: "http://localhost:9090/blog/uptBlog",
        data: params,
    });