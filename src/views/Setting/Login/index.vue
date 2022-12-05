<template lang="">
    <div class="login">
        <!-- Field 是基于 Cell 实现的，可以使用 CellGroup 作为容器来提供外边框。 -->
        <van-cell-group>
          <van-field v-model="uname" label="用户名" placeholder="请输入用户名" />
          <van-field v-model="upass" label="密  码" placeholder="请输入密码" />
        </van-cell-group>
        <div class="dl">
          <van-button plain type="primary" @click="login">登录</van-button>  
        </div>
        <div style=" font-size: 16px;text-align: center;margin-top: 20px">
           <a href="/#/layout/register">没有账户? 去注册</a>
        </div>
    </div>
</template>
<script>
import { loginApi } from "@/api";
import { randomString } from "@/utils/Token";
import { Toast } from "vant"; 
export default {
  data() {
    return {
      uname: "",
      upass: "",
    };
  },
  methods: {
    login() {
      loginApi({
        uname: this.uname,
        upass: this.upass,
      }).then((res) => {
        //接收后台数据并作为提示信息
        // console.log(res.data);
        if (res.data.msg !== null) {
          Toast.fail(res.data.msg);
        }
        //登陆成功
        if (res.data.data !== null && res.data.data !== undefined) {
          Toast.success(res.data.data);
          // 生成token
          let newtoken = randomString(16);
          console.log(newtoken);
          // 保存token
          localStorage.setItem("token", newtoken);
          // 清除定时任务(原本有一个10天之后清除token的),并重新设置
          clearTimeout();
          setTimeout(() => {
            localStorage.removeItem("token");
            //token过期,页面刷新,才能退出登录状态
            location.reload();
          }, 3600000);
          // 登录成功,保存当前账号的用户名,以便后续操作
          localStorage.setItem('uname',this.uname)
          this.$router.push({
            path: "/layout/me",
          });
        }
      });
    },
  },
};
</script>
<style>
.login {
  margin-top: 60px;
  margin-bottom: 50px;
}
.dl {
  margin-top: 20px;
  text-align: center;
}
</style>