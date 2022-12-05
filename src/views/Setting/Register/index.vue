<template lang="">
    <div class="register">
        <!-- Field 是基于 Cell 实现的，可以使用 CellGroup 作为容器来提供外边框。 -->
        <van-cell-group>
          <van-field v-model="uname" label="用户名" placeholder="请输入用户名" />
          <van-field v-model="upass" label="密  码" placeholder="请输入密码" />
          <van-field v-model="upass2" label="确认密码" placeholder="再次输入密码" />
        </van-cell-group>
        <div class="dl">
          <van-button plain type="primary" @click="register">注册</van-button>  
        </div>
        <div style=" font-size: 16px;text-align: center;margin-top: 20px">
           <a href="/#/layout/login">已有账户? 去登录</a>
        </div>
    </div>
</template>
<script>
import { randomString } from "@/utils/Token";
import { Toast } from "vant";
import { registerApi } from "@/api";
export default {
  data() {
    return {
      uname: "",
      upass: "",
      upass2: "",
    };
  },
  methods: {
    register() {
      //生成用户id(作为主键)
      let id = randomString(12);
      if (this.upass !== this.upass2) {
        Toast.fail("两次输入的密码不正确");
        return;
      }
      registerApi({
        id: id,
        uname: this.uname,
        upass: this.upass,
      }).then((res) => {
        //注册失败
        if (res.data.msg !== null) {
          Toast.fail(res.data.msg);
        }
        //注册成功
        if (res.data.data !== null && res.data.data !== undefined) {
          Toast.success(res.data.data);
          // 清空表单
          this.uname = "";
          this.upass = "";
          this.$router.push({
            path: "/layout/login",
          });
        }
      });
    },
  },
};
</script>
<style>
.register {
  margin-top: 60px;
  margin-bottom: 50px;
}
.dl {
  margin-top: 20px;
  text-align: center;
}
</style>