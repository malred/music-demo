<template lang="">
    <div class="bd">  
      <van-image 
        width="100%"
        fit="cover"
        height="150"
        :src="bloginfo.cover" 
      />
      <!-- 修改文章按钮: 只有是当前用户的文章才显示 -->
      <div style="position:absolute;right: 0;top:0;margin-top: 50px;z-index: 1;"
          v-if="this.authorinfo.id===this.curid"
      >
          <van-button type="primary" size="mini" @click="uptBlog(bloginfo.id)">修改文章</van-button> 
          <br/>
          <van-button type="danger" size="mini" @click="delBlog(bloginfo.id)">删除文章</van-button> 
      </div>  
      <div class="title">
        <div style="border-bottom: 1px solid black;padding-bottom: 5px">
          {{bloginfo.title}}
        </div>
        <p class="at">   
            <van-image 
              width="1rem"
              fit="cover"
              height="1rem"
              :src="authorinfo.img"
              round 
            />    
            <span class="author">{{authorinfo.name}}</span>   
            <span>发布于</span>
            <span class="day">{{bloginfo.createday}}</span>   
        </p>
      </div>  
      <van-divider>正文</van-divider>
      <div v-html="bloginfo.content" class="content"> 
      </div>
    </div>
</template>
<script>
import { delBlogApi, getBlogByBidApi } from "@/api";
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      // 文章信息
      bloginfo: {},
      // 作者信息
      authorinfo: {},
      // 当前登录的用户的id,用于判断是不是当前用户的文章
      curid: "",
    };
  },
  methods: {
    // 修改文章
    uptBlog(bid) {
      // 跳转修改
      this.$router.push({ path: "passBlog", query: { bid } });
    },
    // 删除文章
    delBlog(bid) {
      if (bid === "" || bid === undefined) {
        return;
      }
      Dialog.confirm({
        title: "确认删除?",
        message: "可要想好了哦~",
      }).then(() => {
        delBlogApi({ bid }).then((res) => {
          console.log(res);
          if (res.data.msg !== undefined) {
            Toast.fail(res.data.msg);
          }
          if (res.data.data !== null && res.data.data !== undefined) {
            Toast.success(res.data.data);
            // 删除成功返回空间
            this.$router.push({ path: "space" });
            // 刷新页面
            location.reload();
          }
        });
      });
    },
  },
  created() {
    // 根据文章id获取文章详情
    // console.log(this.$route.query.bid);
    getBlogByBidApi(this.$route.query.bid).then((res) => {
      if (res.data.msg !== undefined) {
        Toast.fail(res.data.msg);
      }
      if (res.data.data !== null && res.data.data !== undefined) {
        // Toast.success(res.data.data);
        this.bloginfo = res.data.data.bloginfo;
        this.authorinfo = res.data.data.authorinfo;
        // console.log(res.data.data);
        // 格式化时间
        let day = new Date(this.bloginfo.createday);
        day =
          day.getFullYear() + "." + (day.getMonth() + 1) + "." + day.getDate();
        this.bloginfo.createday = day;
        // 获取缓存中的用户名称(登录时自动获取并保存)
        this.curid = JSON.parse(localStorage.getItem("userinfo")).id;
      }
    });
  },
};
</script>
<style scoped>
.bd {
  position: relative;
  padding-top: 60px;
  padding-bottom: 50px;
}
.title {
  font-size: 25px;
  margin-left: 10px;
  font-weight: 600;
  text-align: left;
  background-color: #fff;
}
.at {
  padding-bottom: 10px;
  border-bottom: 1px solid black;
  margin-top: 10px;
  display: flex;
  align-self: center;
  line-height: 40px;
}
.at span {
  font-weight: normal;
  font-size: 15px;
  margin-right: 10px;
}
.at .author {
  margin-left: 10px;
}
.content {
  margin-left: 20px;
  /* 超出部分滚动,
     这样不会撑开整个页面,让整个页面都滚动 */
  overflow: scroll;
}
</style>