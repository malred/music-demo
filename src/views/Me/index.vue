<template>
  <div class="me">
    <div class="bg"></div>
    <div class="msg">
      <!-- 头像 -->
      <van-image
        class="tx"
        round
        width="2.5rem"
        height="2.5rem"
        fit="cover"
        :src="this.userinfo.img || 'https://img01.yzcdn.cn/vant/cat.jpeg'"
      />
      <div class="desc">
        <p>{{ uname }}</p>
      </div>
    </div>
    <div class="bottom1">
      <div class="bottom">
        <img class="like" src="../../assets/收藏.png" />
        <span class="txt">喜欢的音乐</span>
        <img class="to" src="../../assets/展开.png" />
      </div>
      <!-- <div class="bottom">
        <img class="like" src="../../assets/图片.png" />
        <van-uploader :after-read="afterRead">
          <span class="txt">设置头像</span>
        </van-uploader>
        <img class="to1" src="../../assets/展开.png" />
      </div> -->
      <div class="bottom" @click="uptMsg">
        <img class="like" src="../../assets/留言.png" />
        <span class="txt">修改信息</span>
        <img class="to1" src="../../assets/展开.png" />
      </div>
      <div class="bottom">
        <img class="like" src="../../assets/搜索备份.png" />
        <span class="txt">进入空间</span>
        <img class="to1" src="../../assets/展开.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { getMuserInfoByName } from "@/api/MUser";

export default {
  data() {
    return {
      uname: "",
      userinfo: {},
    };
  },
  methods: {
    uptMsg() {
      this.$router.push({
        path: "/layout/uptMsg",
      });
    },
  },
  created() {
    this.uname = localStorage.getItem("uname");
    getMuserInfoByName(this.uname).then((res) => {
      // console.log(res.data.data);
      // 浏览器缓存用户信息
      localStorage.setItem("userinfo", JSON.stringify(res.data.data));
      this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    });
  },
};
</script>

<style>
.me {
  padding-top: 50px;
  padding-bottom: 50px;
}
.msg {
  margin-top: 15px;
  text-align: center;
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
  opacity: 0.4;
  position: absolute;
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
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
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