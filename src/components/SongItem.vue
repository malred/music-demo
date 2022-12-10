<template lang="">
    <div>   
        <!-- 遮罩层,防止短时间快速添加 -->
        <van-overlay :show="show"/>
          <van-cell center :title="name" @click="addLike"
            :label="author+' - '+name">
            <template #right-icon>
              <van-icon name="play-circle-o" size="0.6rem" @click="playFn"/>
            </template>
          </van-cell>  
        </van-overlay>
    </div>
</template>
<script>
import { Dialog, Toast } from "vant";
import { addLikeApi, getMusicByIdApi } from "@/api";
export default {
  data() { 
    return {
      show: false,
    };
  },
  // 组件传值(父传子)
  props: {
    name: String, // 歌手
    author: String, // 歌名
    id: Number, // id
  },
  methods: {
    // 添加喜欢
    addLike() {
      Dialog.confirm({
        title: "添加到喜欢",
        message: "是否添加该歌曲到我喜欢?",
      })
        .then(() => {
          this.show = true;
          // 根据id获取歌单信息,并存入后端
          getMusicByIdApi({
            ids: this.id,
          }).then((res) => {
            console.log(res.data.songs[0]);
            // 传递id
            let userinfo = JSON.parse(localStorage.getItem("userinfo"));
            addLikeApi({
              uid: userinfo.id,
              mid: res.data.songs[0].id,
              mname: res.data.songs[0].al.name,
              picUrl: res.data.songs[0].al.picUrl,
              arname: res.data.songs[0].ar[0].name,
            }).then((res) => {
              if (res.data.msg !== null) {
                Toast.fail(res.data.msg);
                this.show = false;
              }
              if (res.data.data !== null && res.data.data !== undefined) {
                Toast.success(res.data.data);
                this.show = false;
              }
            });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    playFn() {
      this.$router.push({
        path: "/play",
        query: {
          id: this.id, // 传递歌曲id,然后跳转
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
/* 单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>