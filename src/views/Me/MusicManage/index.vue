<template lang="">
    <div class="music">
        <p class="title">我喜欢</p>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad" 
        >
        <van-cell v-for="item in likes" @click="delLike(item.mid)"
            :key="item.id" 
            :title="item.mname" > 
             <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <van-icon name="play-circle-o" size="0.6rem" @click="playFn(item.mid)"/>
            </template>
        </van-cell>
        </van-list>
    </div>
</template>
<script>
import { delLikeApi, getLikesApi } from "@/api";
import { Dialog, Toast } from "vant";
export default {
  created() {
    let uid = JSON.parse(localStorage.getItem("userinfo")).id;
    getLikesApi(uid).then((res) => {
      console.log(res.data);
      this.likes = res.data.data;
      console.log(this.likes);  
    });
  },
  data() {
    return {
      // 加载状态
      loading: false,
      // 加载完毕
      finished: false,
      // 我喜欢的音乐列表
      likes: [],
    };
  },
  methods: {
    onLoad() {
      (this.loading = false), (this.finished = true);
    },
    // 播放音乐
    playFn(mid) {
      this.$router.push({
        path: "/play",
        query: {
          id: mid, // 传递歌曲id,然后跳转
        },
      });
    },
    // 从喜欢的音乐里删除
    delLike(mid) {
      Dialog.confirm({
        title: "移除",
        message: "是否从我喜欢的音乐中移除该歌曲?",
      })
        .then(() => {
          let userinfo = JSON.parse(localStorage.getItem("userinfo"));
          console.log(userinfo);
          delLikeApi({
            uid: userinfo.id,
            mid: mid,
          }).then((res) => {
            if (null !== res.data.msg) {
              Toast.fail(res.data.msg);
            }
            if (null !== res.data.data) {
              Toast.success(res.data.data);
              // 刷新页面
              location.reload();
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style>
.music {
  padding-top: 60px;
  padding-bottom: 50px;
}
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
</style>