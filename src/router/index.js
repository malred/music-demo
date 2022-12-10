// 路由相关配置
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout";
import Search from "@/views/Search";
import Me from "@/views/Me";
import Home from "@/views/Home";
import Play from "@/views/Play";
import Setting from "@/views/Setting";
import Login from "@/views/Setting/Login";
import Register from "@/views/Setting/Register";
import UptPass from "@/views/UptPass";
import UptMsg from "@/views/Me/UptMsg";
import MusicManage from "@/views/Me/MusicManage";
import FriendManage from "@/views/Me/Friends";
import FriendMsg from "@/views/Me/Friends/FriendMsg";
import Space from "@/views/Me/Space";
import PassBlog from "@/views/Me/Blog/PassBlog";
import BlogDetail from "@/views/Me/Blog/BlogDetail";
import { Notify } from "vant";
Vue.use(VueRouter);
const routes = [
  // 进入网站就跳转到/layout
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/layout",
    component: Layout,
    // 进入/layout就跳转到/layout/home(即直接跳转首页)
    redirect: "/layout/home",
    children: [
      {
        path: "home",
        component: Home,
        meta: {
          // 保存路由对象额外信息
          title: "首页",
        },
      },
      {
        path: "search",
        component: Search,
        meta: {
          title: "搜索",
        },
      },
      {
        path: "me",
        component: Me,
        meta: {
          title: "我的",
        },
      },
      {
        path: "setting",
        component: Setting,
        meta: {
          title: "设置",
        },
      },
      {
        path: "login",
        component: Login,
        meta: {
          title: "登录",
        },
      },
      {
        path: "register",
        component: Register,
        meta: {
          title: "注册",
        },
      },
      {
        path: "uptPass",
        component: UptPass,
        meta: {
          title: "修改密码",
        },
      },
      {
        path: "uptMsg",
        component: UptMsg,
        meta: {
          title: "修改信息",
        },
      },
      {
        path: "musicManage",
        component: MusicManage,
        meta: {
          title: "音乐管理",
        },
      },
      {
        path: "friendManage",
        component: FriendManage,
        meta: {
          title: "好友管理",
        },
      },
      {
        path: "friendMsg",
        component: FriendMsg,
        meta: {
          title: "好友详情",
        },
      },
      {
        path: "space",
        component: Space,
        meta: {
          title: "我的空间",
        },
      },
      {
        path: "blogDetail",
        component: BlogDetail,
        meta: {
          title: "文章详情",
        },
      },
      {
        path: "passBlog",
        component: PassBlog,
        meta: {
          title: "发布文章",
        },
      },
    ],
  },
  {
    path: "/play",
    component: Play,
  },
];
const router = new VueRouter({
  routes,
});
// /me需要登录才能使用
// 全局路由守卫,next是执行的函数
// 如果之前有登录会有token,就不需要初始化
if (
  localStorage.getItem("token") === undefined ||
  localStorage.getItem("token") === null ||
  localStorage.getItem("token") === ""
) {
  localStorage.setItem("token", "");
}
setTimeout(() => {
  localStorage.removeItem("token");
  location.reload();
}, 3600000);
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (to.path === "/layout/me" && token === "") {
    // alert("请登录");
    Notify({ type: "primary", message: "请在设置中登录" });
    next(false); // 阻止路由跳转
  } else if (to.path === "/layout/uptPass" && token === "") {
    // alert("请登录");
    Notify({ type: "primary", message: "请在设置中登录" });
    next(false); // 阻止路由跳转
  } else {
    next(); // 正常使用
  }
});
export default router;
