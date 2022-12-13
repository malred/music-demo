import axios from "@/utils/request";
/** 
 * baseurl方便调试 
 * 3000的是vercel离线测试,9090是java的后端
 * 有域名的是部署在vercel的
 * */
const baseUrl = 'https://music-back-node.vercel.app/api'
// const baseUrl = 'http://localhost:9090'
// const baseUrl = 'http://localhost:3000/api'
const baseUrl1 = 'https://music-back-node-1.vercel.app/api'
// const baseUrl1 = 'http://localhost:9090'
// const baseUrl1 = 'http://localhost:3000/api'
/** 登录 */
export const login = (params) =>
    axios({
        method: "post",
        url: baseUrl + "/user/login",
        data: {uname: params.uname,upass:params.upass}
    });
/** 注册 */
export const register = (params) =>
    axios({
        method: "post",
        url: baseUrl + "/user/register",
        data: params, 
    });
/** 获取用户信息 */
export const getMuserInfoByName = (uname) =>
    axios({
        url: baseUrl + `/user/info?uname=${uname}`,
        method: "GET",
    });
/** 根据账号查询账号密码 */
export const getMuserByName = (uname) =>
    axios({
        url: baseUrl + `/user/muser?uname=${uname}`,
        method: "GET",
    });
/** 修改密码 */
export const uptPass = (params) =>
    axios({
        method: "post",
        url: baseUrl + "/user/uptPass",
        data: params, 
    });
/** 上传头像 */
export const uptImg = (params) =>
    axios({
        method: "post",
        url: "http://localhost:9090/user/uptImg",
        data: params, // data: xxx 才能传文件
        // 不加报错: Current request is not a multipart request传递文件
        headers: { "Content-Type": "multipart/form-data" },
    });
// 更新个人信息
export const uptMsg = (params) =>
    axios({
        method: "post",
        url: baseUrl + "/user/uptMsg", // vercel远程serverless 
        data: params, 
    });
/** 添加喜欢音乐 */
export const addLike = (params) =>
    axios({
        method: "post",
        url: baseUrl + "/music/addLike",
        data: params,
        headers: {
            "Content-Type": "application/json",
        },
    });
/** 获取喜欢的音乐列表 */
export const getLikes = (uid) =>
    axios({
        url: baseUrl + `/music/getLikes?uid=${uid}`,
        method: "GET",
    });
/** 从我喜欢的音乐中移除歌曲(根据uid和mid) */
export const delLike = (params) =>
    axios({
        url: baseUrl + `/music/delLike`,
        method: "delete",
        params,
    });
/** 添加好友 */
export const addFriend = (params) =>
    axios({
        url: baseUrl + `/friend/addFriend`,
        method: "post",
        data: params,
        headers: {
            "Content-Type": "application/json",
        },
    });
/** 获取所有好友信息 */
export const getFriends = (uid) =>
    axios({
        url: baseUrl + `/friend/getFriends?uid=${uid}`,
        method: "GET",
    });
/** 通过fid获取好友信息 */
export const getFriendsByFid = (fid) =>
    axios({
        url: baseUrl + `/friend/getFriendByFid?fid=${fid}`,
        method: "GET",
    });
/** 根据fid删除好友 */
export const delFriend = (params) =>
    axios({
        url: baseUrl1 + `/friend/delFriend`,
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
/** 添加文章 */
export const addBlog = (params) =>
    axios({
        method: "post",
        url: baseUrl1 + `/blog/addBlog`,
        data: params,
    });
/** 获取文章 */
export const getBlogs = (uid) =>
    axios({
        method: 'get',
        url: baseUrl1 + `/blog/getUserBlogs?uid=${uid}`,
    })
/** 根据bid获取文章 */
export const getBlogByBid = (bid) => axios({
    method: 'get',
    url: baseUrl1 + `/blog/getBlogByBid?bid=${bid}`,
})
/** 修改文章 */
export const uptBlog = (params) =>
    axios({
        method: "post",
        url: baseUrl1 + "/blog/uptBlog",
        data: params,
    });
/** 根据bid删除文章 */
export const delBlog = (params) =>
    axios({
        url: baseUrl1 + `/blog/delBlog`,
        method: "delete",
        params,
    });
