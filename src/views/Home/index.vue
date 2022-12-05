<template lang="">
    <div class="home">
        <p class="title">推荐歌单</p>
        <!-- 通过 gutter 属性可以设置列元素之间的间距，默认间距为 0。 -->
        <van-row gutter="6">
          <!-- 
            Layout 组件提供了 24列栅格，
            通过在 Col 上添加 span 属性设置列所占的宽度百分比。
           -->
          <van-col span="8" v-for="obj in reList" :key="obj.id">
            <van-image
              width="100%"
              height="3rem"
              fit="cover"
              :src="obj.picUrl"
            />
            <p class="song_name">{{obj.name}}</p>
          </van-col>   
        </van-row>
        <p class="title">最新音乐</p>
        <SongItem v-for="obj in songList" 
         :name="obj.name" 
         :author="obj.song.artists[0].name" 
         :id="obj.id" :key="obj.id"></SongItem>
    </div>
</template>
<script>
import { recommendMusicAPI, newMusicApi } from "@/api"; 
import SongItem from "@/components/SongItem.vue";
export default {
  async created() {
    const res = await recommendMusicAPI({
      limit: 6,
    });
    this.reList = res.data.result; // 推荐歌单数据

    const res2 = await newMusicApi({
      limit: 20,
    }); 
    this.songList = res2.data.result;
  },
  data() {
    return {
      reList: [],
      songList: [],
    };
  },
  components: {SongItem}
};
</script>
<style lang="less" scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  // 伸缩就可以文字显示多行
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出2行的内容 **/
}

.home {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>