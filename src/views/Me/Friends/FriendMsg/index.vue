<template lang="">
    <div class="fm"> 
        <div class="msg" :style="msg_bg">
            <div style="position:absolute;right: 0;top:0">
                <van-button type="danger" size="mini" @click="delFriend">删除好友</van-button> 
            </div>
            <!-- 头像 -->
            <van-image 
                round
                width="2.5rem"
                height="2.5rem"
                fit="cover"
                :src="this.fitem.img"
            /> 
            <div class="desc">
                <p>{{ fitem.name}}</p> 
            </div> 
            </div>
            <van-divider>{{fitem.name}}的标签</van-divider>
            <div class="bq">
                <van-tag
                  :color="sexTagColor" 
                  round 
                  size="large">
                  {{fitem.sex}}
                </van-tag>
                <span></span>
                <van-tag 
                  :type="ageTagType"
                  round v-if="fitem.age"
                  size="large">
                  {{fitem.age}}岁
                </van-tag>
                <span></span>
                <van-tag  
                  color="#7232dd"
                  round v-if="fitem.birth"
                  size="large">
                  {{star}}座
                </van-tag>
                <span></span>
                <van-tag  
                  color="brown"
                  round v-if="fitem.location"
                  size="large">
                  {{fitem.location.split('/')[0]}}
                </van-tag>
            </div> 
            <van-divider>{{fitem.name}}的文章</van-divider>
            <van-pagination v-model="currentPage" :page-count="12" mode="simple" />
            <van-divider>{{fitem.name}}的视频</van-divider> 
            <van-pagination v-model="currentPage" :page-count="12" mode="simple" />
      </div>
  </template>
<script>
import { delFriendApi, getFriendsByFidApi } from "@/api";
import { Dialog, Toast } from "vant";

export default {
  data() {
    return {
      //好友信息
      fitem: {},
    };
  },
  methods: {
    delFriend() {
      Dialog.confirm({
        title: "移除",
        message: "是否从好友列表中移除该好友?",
      }).then(() => {
        delFriendApi({
          uid: JSON.parse(localStorage.getItem("userinfo")).id,
          fid: this.$route.query.fid,
        }).then((res) => {
          if (null !== res.data.msg) {
            Toast.fail(res.data.msg);
          }
          if (null !== res.data.data && undefined !== res.data.data) {
            Toast.success(res.data.data);
            // 返回上一级
            this.$router.go(-1);
          }
        });
      });
    },
  },
  created() {
    let fid = this.$route.query.fid;
    this.fitem = getFriendsByFidApi(fid).then((res) => {
      this.fitem = res.data.data;
      console.log(this.fitem);  
      if(this.fitem.age===null) this.fitem.age='???'
    });
  },
  //计算属性,依赖于其他属性得出
  //按钮的类型(男的primary,女的success)
  computed: {
    //性别标签的颜色
    sexTagColor() {
      if (this.fitem.sex === "男") return "blue";
      if (this.fitem.sex === "女") return "pink";
      if (this.fitem.sex === "无") return "gray";
    },
    //年龄标签的类型
    ageTagType() {
      if (this.fitem.sex === "男") return "success";
      if (this.fitem.sex === "女") return "primary";
      if (this.fitem.sex === "无") return "warning";   
    },
    //根据月日计算星座
    star() {
      let arr1 = this.fitem.birth.split("-");
      let month = arr1[1];
      let day = arr1[2];
      console.log(arr1);
      //这一段是抄的
      var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
      var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
    },
    //男生和女生的背景颜色不一样
    msg_bg() {
      if (this.fitem.sex === "男") return "background-color: skyblue";
      if (this.fitem.sex === "女") return "background-color: pink";
      if (this.fitem.sex === "无") return "background-color: #ccc";
    },
  },
};
</script>
<style>
.fm {
  padding-top: 40px;
  padding-bottom: 50px;
}
/* 定位布局,子绝父相 */
.fm .msg {
  text-align: center;
  position: relative;
  padding-top: 10px;
  background-color: rgb(206, 238, 249);
}
/*标签所在盒子样式*/
.bq {
  /* margin-top: 10px; */
  text-align: center;
}
.bq span {
  padding-left: 10px;
}
.desc {
  margin: 0 10px;
  border-bottom: 2px solid burlywood;
}
.desc > p {
  margin-bottom: 10px;
}
</style>