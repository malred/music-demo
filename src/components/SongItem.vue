<template lang="">
    <div>  
          <van-cell center :title="name" 
            :label="author+' - '+name">
            <template #right-icon>
              <van-icon name="play-circle-o" size="0.6rem" @click="playFn"/>
            </template>
          </van-cell>  
    </div>
</template>
<script>
export default {
    props: {
        name: String, // 歌手
        author: String, // 歌名
        id: Number // id
    },
    methods: {
      playFn(){
        this.$router.push({
          path: '/play',
          query: {
            id: this.id // 传递歌曲id,然后跳转
          }
        })
      }
    }
};
</script>
<style lang="less" scoped>
/* 单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>