<template lang="">
    <div class="fm"> 
        <div class="msg" :style="msg_bg">
          <div style="position:absolute;right: 0;top:10">
              <van-button type="primary" size="mini" @click="passBlog">发布文章</van-button> 
          </div>
            <!-- 头像 -->
            <van-image 
                round
                width="2.5rem"
                height="2.5rem"
                fit="cover"
                :src="this.userinfo.img"
            /> 
            <div class="desc">
                <p>{{ userinfo.name}}</p> 
            </div> 
            </div>
            <van-divider>{{userinfo.name}}的标签</van-divider>
            <div class="bq">
                <van-tag
                  :color="sexTagColor" 
                  round 
                  size="large">
                  {{userinfo.sex}}
                </van-tag>
                <!-- span是为了隔开相邻的tag -->
                <span></span>
                <van-tag 
                  :type="ageTagType"
                  round v-if="userinfo.age"
                  size="large">
                  {{userinfo.age}}岁
                </van-tag>
                <!-- span是为了隔开相邻的tag -->
                <span></span>
                <van-tag  
                  color="#7232dd"
                  round v-if="userinfo.birth"
                  size="large">
                  {{star}}座
                </van-tag>
                <span></span>
                <!-- userinfo.location.split('/')[0]是把省/市/区根据/拆分,然后得到省 -->
                <van-tag  
                  color="brown"
                  round v-if="userinfo.location"
                  size="large">
                  {{userinfo.location.split('/')[0]}}
                </van-tag>
            </div> 
            <van-divider>{{userinfo.name}}的文章</van-divider>
            <!-- 轮播图展示文章封面,点击进入文章详情 -->
            <van-swipe @change="onChange" class="my-swipe" :autoplay="2000">
              <van-swipe-item v-for="(item,i) in bloglist">
                <p style="line-height: 20px;margin-bottom: 10px;">{{item.title}}</p>
                <van-image 
                  width="100%"
                  fit="cover"
                  height="180"
                  :src="item.cover"
                  @click="toBlogDetail(item.id)"
                />
              </van-swipe-item> 
              <template #indicator>
                <div class="custom-indicator">{{ current + 1 }}/{{bloglist.length}}</div>
              </template>
            </van-swipe>
            <!-- <van-pagination v-model="currentPage" :page-count="12" mode="simple" /> -->
            <!-- <van-divider>{{userinfo.name}}的视频</van-divider> 
            <van-pagination v-model="currentPage" :page-count="12" mode="simple" /> -->
      </div>
  </template>
<script>
import { getBlogsApi } from "@/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      // 好友信息
      userinfo: {},
      // 文章列表
      bloglist: {},
      // 当前轮播的图的索引
      current: 0,
    };
  },
  created() {
    // 获取个人信息,因为是对象,所以需要JSON.parse() 方法将接收到的字符串 转换为 JavaScript 对象。
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    // console.log(this.userinfo);
    // 获取文章列表
    // console.log(this.userinfo.id);
    getBlogsApi(this.userinfo.id).then((res) => {
      // console.log(res.data.msg);
      if (res.data.msg !== undefined) {
        Toast.fail(res.data.msg);
      }
      if (res.data.data !== null && res.data.data !== undefined) {
        // Toast.success(res.data.data);
        this.bloglist = res.data.data;
      }
      // console.log(this.bloglist);
    });
  },
  // 计算属性,依赖于其他属性得出
  // 按钮的类型(男的primary,女的success)
  computed: {
    //性别标签的颜色
    sexTagColor() {
      if (this.userinfo.sex === "男") return "blue";
      if (this.userinfo.sex === "女") return "pink";
      if (this.userinfo.sex === "无") return "gray";
    },
    //年龄标签的类型
    ageTagType() {
      if (this.userinfo.sex === "男") return "success";
      if (this.userinfo.sex === "女") return "primary";
      if (this.userinfo.sex === "无") return "warning";
    },
    //根据月日计算星座
    star() {
      let arr1 = this.userinfo.birth.split("-");
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
      if (this.userinfo.sex === "男") return "background-color: skyblue";
      if (this.userinfo.sex === "女") return "background-color: pink";
      if (this.userinfo.sex === "无") return "background-color: #ccc";
    },
  },
  methods: {
    // 跳转到发布文章页面
    passBlog() {
      this.$router.push({ path: "passBlog" });
    },
    // 跳转到文章详情
    toBlogDetail(bid) {
      this.$router.push({
        path: "blogDetail",
        // 传递bid,通过bid获取文章详情
        query: {
          bid: bid,
        },
      });
    },
    // 轮播事件
    onChange(index) {
      this.current = index;
    },
  },
};
</script>
<style>
/* 轮播组件样式: 指示器(1/x),详见文档 */
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.fm {
  padding-top: 40px;
  padding-bottom: 50px;
}
/* 轮播图组件的样式 */
.my-swipe .van-swipe-item {
  line-height: 200px;
  text-align: center;
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