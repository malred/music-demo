<template>
  <div class="me">
    <div class="bg"></div>
    <div class="msg">
      <!-- 头像 -->
      <van-image
        round
        width="2.5rem"
        height="2.5rem"
        fit="cover"
        :src="this.userinfo.img"
      />
      <input
        type="file"
        accept="image/*"
        name="file"
        @change="uptImg"
        class="fileInput"
      />
      <div class="desc">
        <p>{{ uname }}</p>
      </div>
    </div>
    <div class="bottom1">
      <div class="bottom" @click="musicManage">
        <img class="like" src="../../assets/收藏.png" />
        <span class="txt">音乐管理</span>
        <img class="to1" src="../../assets/展开.png" />
      </div>
      <!-- <div class="bottom">
        <img class="like" src="../../assets/图片.png" />
        <van-uploader :after-read="afterRead">
          <span class="txt">设置头像</span>
        </van-uploader>
        <img class="to1" src="../../assets/展开.png" />
      </div> -->
      <div class="bottom" @click="toSpace">
        <img class="like" src="../../assets/搜索备份.png" />
        <span class="txt">进入空间</span>
        <img class="to1" src="../../assets/展开.png" />
      </div>
      <div class="bottom" @click="friendManage">
        <img class="like" src="../../assets/发起.png" />
        <span class="txt">好友管理</span>
        <img class="to1" src="../../assets/展开.png" />
      </div>
      <div class="bottom" @click="uptMsg">
        <img class="like" src="../../assets/留言.png" />
        <span class="txt">修改信息</span>
        <img class="to1" src="../../assets/展开.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { uptImgApi, getMuserInfoByNameApi } from "@/api";
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      uname: "",
      userinfo: {},
      // 上传的头像文件
      file: {},
    };
  },
  methods: {
    toSpace() {
      this.$router.push({
        path: "/layout/space",
      });
    },
    friendManage() {
      this.$router.push({
        path: "/layout/friendManage",
      });
    },
    musicManage() {
      this.$router.push({
        path: "/layout/musicManage",
      });
    },
    uptMsg() {
      this.$router.push({
        path: "/layout/uptMsg",
      });
    },
    // 点击头像上传图片,更新头像
    uptImg(event) {
      // 得到input的文件
      this.file = event.target.files[0];
      // 确认是否修改
      Dialog.confirm({
        title: "确认更新头像?",
        message: "可要想好了哦~",
      }).then(() => {
        // on confirm
        // 更新头像
        uptImgApi({
          id: this.userinfo.id,
          file: this.file,
        }).then((res) => {
          if (res.data.msg !== null && res.data.msg !== undefined) {
            Toast.fail(res.data.msg);
          }
          if (res.data.data !== null && res.data.data !== undefined) {
            Toast.success(res.data.data);
          }
        });
        // 更新成功刷新页面才能看到变化
        location.reload();
      });
    },
  },
  created() {
    this.uname = localStorage.getItem("uname");
    getMuserInfoByNameApi(this.uname).then((res) => {
      // console.log(res.data.data);
      // 浏览器缓存用户信息
      localStorage.setItem("userinfo", JSON.stringify(res.data.data));
      this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    });
  },
};
</script>

<style scoped>
.me {
  padding-top: 50px;
  padding-bottom: 50px;
}
/* 定位布局,子绝父相 */
.msg {
  margin-top: 15px;
  text-align: center;
  position: relative;
}
/* 网上抄的把input和img重合,实现图片点击上传 */
.fileInput {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  display: block;
  width: 3.5rem;
  clear: both;
  margin: auto;
  /* background-color: red; */
}
/* 网上抄的背景图片设置 */
.bg {
  z-index: -999;
  /* height: 100px; */
  bottom: 0;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -ms-opacity: 0.5;
  -webkit-opacity: 0.5;
  -o-opacity: 0.5;
  opacity: 0.3;
  position: absolute;
  background: skyblue;
  top: 0;
  left: 0;
  right: 0;
  background-size: 100% 100%;
}
.desc {
  margin: 0 10px;
  border-bottom: 2px solid burlywood;
}
.desc > p {
  margin-bottom: 10px;
}
.like {
  padding-left: 10px;
  width: 50px;
  height: 50px;
  padding-right: 20px;
}
.to {
  width: 40px;
  height: 40px;
  margin-left: 85px;
}
.to1 {
  width: 40px;
  height: 40px;
  margin-left: 108px;
}
.txt {
  font-size: 25px;
}
.bottom {
  display: flex;
  align-items: center;
  margin: 20px;
  border: 2px solid goldenrod;
}
.bottom1 {
  margin-top: 43px;
}
</style>