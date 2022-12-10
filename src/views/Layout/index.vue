<template lang="">
    <div> 
        <!-- 顶部导航 -->
        <van-nav-bar @click-left="onClickLeft" left-arrow left-text="返回" :title="activeTit" fixed />
        <!-- 显示当前路由对应的组件的内容 -->
        <router-view></router-view>
        <!-- 底部导航栏 -->
        <van-tabbar route>
          <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
          <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item> 
          <van-tabbar-item replace to="/layout/me" icon="contact">我的</van-tabbar-item> 
          <van-tabbar-item replace to="/layout/setting" icon="setting-o">设置</van-tabbar-item> 
        </van-tabbar>
    </div>
</template>
<script>
export default {
  data() {
    return {
      activeTit: this.$route.meta.title,
    };
  },
  watch: {
    // 监听路由对象改变
    $route() {
      // 顶部导航栏的标题变成当前路由.meta.title
      this.activeTit=this.$route.meta.title
    }
  },
  methods:{
    onClickLeft() {
      // 点击返回按钮时,返回上一个网页
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="less" scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>