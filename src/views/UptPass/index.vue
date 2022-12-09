<template lang="">
    <div class="upt">
        <van-cell-group>
          <van-field v-model="old" label="原密码" placeholder="请输入原密码" />
          <van-field v-model="newp" label="新密码" placeholder="请输入密码" />
          <van-field v-model="renewp" label="确认密码" placeholder="请再次输入密码" />
        </van-cell-group>
        <div class="dl">
          <van-button plain type="primary" @click="upt">确认</van-button>  
        </div>
    </div>
</template>
<script>
import { Toast } from "vant";
import { getMuserByNameApi, uptPassApi } from "@/api";
export default {
  data() {
    return {
      muser: {
        uname: "",
        upass: "",
      },
      old: "",
      newp: "",
      renewp: "",
    };
  },
  methods: {
    upt() { 
      if (this.old === "" || this.old === undefined || this.old === null) {
        Toast.fail("请输入原密码");
        return;
      }
      if (this.old.toString() !== this.muser.upass) {
        Toast.fail("旧密码不正确");
        return;
      }
      if (this.newp.split(" ").join("").length === 0) {
        Toast.fail("新密码不能为空");
        return;
      }
      if (this.newp !== this.renewp) {
        Toast.fail("两次输入的密码不匹配");
        return;
      }
      if (this.muser.upass === this.newp) {
        Toast.fail("新旧密码不能相同");
        return;
      }
      uptPassApi({
        uname: this.muser.uname,
        upass: this.newp,
      }).then((res) => {
        if (res.data.msg !== null) {
          Toast.fail(res.data.msg);
        }
        //修改成功
        if (res.data.data !== null && res.data.data !== undefined) {
          Toast.fail(res.data.data);
          // 清空缓存,清除登录状态
          localStorage.removeItem("token");
          // 跳转到登录页面,重新登录
          this.$router.push({
            path: "/layout/setting",
          });
          location.reload();
        }
      });
    },
  },
  created() {
    // 提前查询该用户的密码,后续进行校验
    getMuserByNameApi(localStorage.getItem("uname")).then((res) => {
      console.log(res.data.data);
      this.muser.uname = res.data.data.uname;
      this.muser.upass = res.data.data.upass;
      console.log(this.muser);
    });
  },
};
</script>
<style>
.upt {
  margin-top: 60px;
  margin-bottom: 50px;
}
.dl {
  margin-top: 20px;
  text-align: center;
}
</style>