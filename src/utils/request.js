// 网络请求
import axios from "axios";
// axios.defaults.baseURL='http://192.168.2.228:3000'
// 我使用vercel部署了开源发布者的网易云接口api仓库
axios.defaults.baseURL = "https://netease-cloud-music-api-malred.vercel.app/"; 
export default axios;
