<template lang="">
    <div class="friend">
        <van-divider>添加好友</van-divider>
        <!-- 添加好友 -->
        <van-cell-group> 
            <!-- <van-field
                v-model="sms"
                center
                clearable
                label="添加好友"
                placeholder="请输入要添加的好友的账号"> 
                <template #button>
                    <van-button size="small"icon="plus" type="primary">添加</van-button>
                </template>
            </van-field> -->            
            <van-field v-model="fname" label="好友账号" placeholder="请输入添加的好友的账号" />
            <van-field v-model="fgroup" label="好友分组" placeholder="请输入添加的好友的分组" />
            <div class="center">
                <van-button  
                    size="small" 
                    icon="plus"
                    @click="addFriend"
                    type="primary">添加</van-button>
            </div>
        </van-cell-group>
        <van-divider>好友列表</van-divider>
        <van-collapse v-model="activeNames" border
                      v-for="(obj,i) in groups" :key="i"> 
            <van-collapse-item :title="obj" :name="obj">
                <div class="item" 
                    v-for="(fitem) in friends[obj]" :key="fitem.id" 
                    @click="friendInfo(fitem.id)">
                    <van-image round
                        width="1.2rem"
                        height="1.2rem"
                        fit="cover"
                        :src="fitem.img"
                    />
                    <p>{{fitem.name}}</p>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>
<script>
import { addFriendApi, getFriendsApi } from "@/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      activeNames: ["默认"],
      groups: [],
      // 接收前端传来的map({"分组": Array})
      // 后端需要分组查数据,然后统一返回
      friends: {},
      // 要添加的好友账号
      fname: "",
      // 要添加的好友的分组
      fgroup: "",
    };
  },
  created() {
    // 获取好友列表,并获取groups(好友分组)
    let uid = JSON.parse(localStorage.getItem("userinfo")).id;
    getFriendsApi(uid).then((res) => {
      console.log(res.data.data);
      if (null !== res.data.data && undefined !== res.data.data) {
        this.friends = res.data.data;
        this.groups = Object.keys(res.data.data);
        console.log(this.groups);
      }
    });
  },
  methods: {
    // 去往好友详情页(里面有删除好友选项)
    friendInfo(fid) {
      this.$router.push({
        path: "/layout/friendMsg",
        query: {
          fid: fid, // 传递朋友id,然后跳转
        },
      });
    },
    addFriend() {
      let uid = JSON.parse(localStorage.getItem("userinfo")).id;
      // console.log(this.fgroup,this.fname);
      if (this.fgroup === "" || this.fname === "") {
        Toast.fail("账号或分组为空");
        return;
      }
      addFriendApi({
        uid: uid,
        fname: this.fname,
        fgroup: this.fgroup,
      }).then((res) => {
        if (null !== res.data.msg) {
          Toast.fail(res.data.msg);
        }
        if (null !== res.data.data && undefined !== res.data.data) {
          Toast.success(res.data.data);
          this.fname = "";
          this.fgroup = "";
          // 刷新页面
          location.reload();
        }
      });
    },
  },
};
</script>
<style>
.friend {
  padding-top: 60px;
  padding-bottom: 50px;
}
.item {padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 5px;
  margin-bottom: 5px;
  /* border-right: 3px solid #ccc; */
  /* border-left: 3px solid #ccc; */
  border-bottom: 3px solid #ccc;
  /* border-top: 1px solid #ccc; */
}
.item p {
  flex-grow: 2;
  margin-left: 20px;
  font-size: 18px;
}
.center {
  text-align: center;
  padding-bottom: 5px;
}
</style>