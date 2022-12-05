<template lang="">
    <div class="setting">
        <van-cell title="登录" is-link to="login" v-if="token===''"/>
        <van-cell title="修改密码" is-link to="uptPass"/>
        <van-cell title="退出登录" is-link @click="logout"/>
    </div>
</template>
<script>
// import { token } from "@/router";
import { Toast } from "vant";
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    logout() {
      // 退出登录
      let token = localStorage.getItem("token");
      if (token !== undefined && token !== null && token !== "") {
        localStorage.removeItem("token");
        Toast.success("已退出登录");
        location.reload();// 刷新页面,清除状态
      } else {
        Toast.fail("请先登录");
      }
    },
  },
};
</script>
<style>
.setting {
  padding-top: 55px;
  padding-bottom: 50px;
}
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
.to2 {
  width: 20px;
  height: 20px;
}
</style>