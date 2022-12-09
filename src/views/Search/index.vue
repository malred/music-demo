<template lang="">
    <div class="home"> 
        <van-search v-model="value" shape="round" 
          @input="inputFn"
          placeholder="请输入搜索关键词"
          @keydown.enter="searchFn" />
        <!-- 搜索下容器 -->
        <div class="search_wrap" v-if="resultArr.length===0">
          <!-- 标题 -->
          <p class="hot_title">热门搜索</p>
          <!-- 热搜关键词容器 -->
          <div class="hot_name_wrap">  
            <!-- 热搜关键词 -->
            <span class="hot_item" @click="fn(obj.first)" 
             v-for="(obj,i) in hotArr" :key="i">{{obj.first}}</span>
          </div>
        </div>
        <!-- 搜索结果 --> 
        <div class="search_wrap" v-else> 
          <!-- 标题 -->
          <p class="hot_title">搜索结果</p> 
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <SongItem v-for="obj in resultArr" :key="obj.id" 
              :name="obj.name" :author="obj.ar[0].name" :id="obj.id"
            ></SongItem>
            <!-- <van-cell center :title="obj.name" 
              :label="obj.ar[0].name+' - '+obj.name"
              v-for="obj in resultArr" :key="obj.id">
              <template #right-icon>
                <van-icon name="play-circle-o" size="0.6rem"/>
              </template>
            </van-cell>  -->
          </van-list>
        </div>
    </div>
</template>
<script>
import SongItem from "@/components/SongItem";
import { hotSearchAPI, searchResultListAPI } from "@/api";
export default {
  data() {
    return {
      value: "",
      hotArr: [], // 热搜关键字
      resultArr: [], // 搜索结果
      loading: false, // 是否触发了触底事件
      finished: false, // 是否全部加载完了,设置为true,则不会再有触底
      page: 1, // 当前搜索结果的页码
      timer: null, // 输入框防抖定时器
    };
  },
  async created() {
    const res = await hotSearchAPI();
    this.hotArr = res.data.result.hots;
  },
  methods: { 
    async onLoad() {
      // 触底事件处理,会自动把loading改为true
      this.page++;
      const res = await this.getListFn();
      if (res.data.result.songs === undefined) {
        this.finished = true;
        return;
      }
      this.resultArr = [...this.resultArr, ...res.data.result.songs];
      this.loading = false;
    },
    // 输入框值改变,就会触发
    async inputFn() {
      this.page = 1;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.finished = false;
        if (this.value.trim().length === 0) {
          // 搜索框没有值(或为空)则阻止请求,并把搜索结果清空
          this.resultArr = [];
          this.value = "";
          return;
        }
        const res = await this.getListFn();
        if (res.data.result.songs === undefined) {
          this.resultArr = [];
          return;
        }
        this.resultArr = res.data.result.songs;
        this.loading = false;
      }, 400);
    },
    async searchFn() {
      this.page = 1;
      this.finished = false;
      if (this.value.trim().length === 0) {
        // 搜索框没有值(或为空)则阻止请求,并把搜索结果清空
        this.resultArr = [];
        this.value = "";
        return;
      }
      const res = await this.getListFn();
      if (res.data.result.songs === undefined) {
        this.resultArr = [];
        return;
      }
      this.resultArr = res.data.result.songs;
      this.loading = false;
    },
    async getListFn() {
      return await searchResultListAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20,
      });
    },
    // 点击关键词,把单击的词填入搜索框
    fn(val) {
      this.page = 1;
      this.finished = false;
      this.value = val;
    },
  },
  components: {
    SongItem,
  },
};
</script>
<style lang="less" scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}
/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}
/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}
/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell {
  border-bottom: 1px solid lightgray;
}
.home {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>