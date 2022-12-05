<template lang="">
    <div class="upt"> 
        <van-form @submit="onSubmit">
            <van-field
                v-model="userinfo.name"
                name="name"
                label="姓名"
                :placeholder="userinfo.name"
                :rules="[{ required: true, message: '请填写姓名' }]"
            />
            <van-field
                v-model="userinfo.age"
                name="age"
                label="年  龄"
                :placeholder="userinfo.age"
                :rules="[{ required: true, message: '请填写年龄' }]"
            />
            <!-- 选择生日 -->
            <van-field
                readonly
                clickable 
                name="datetimePicker"
                :value="userinfo.birth"
                label="生日"
                title="选择年月日"
                @click="showBirthPicker = true"
                />
            <van-popup v-model="showBirthPicker" position="bottom">
                <van-datetime-picker
                    type="date"
                    @confirm="onBirthConfirm"
                    @cancel="showBirthPicker = false"
                    :min-date="minDate"
                    :max-date="maxDate" 
                />
            </van-popup>
            <!-- 选择地区 -->
            <van-field
                readonly
                clickable
                name="area"
                :value="userinfo.location"
                label="地区选择"
                placeholder="点击选择省市区"
                @click="showArea = true"
                />
            <van-popup v-model="showArea" position="bottom">
            <van-area
                    :area-list="areaList"
                    @confirm="onLocationConfirm"
                    @cancel="showArea = false"
                />
            </van-popup>
            <!-- 上传头像 -->  
            <van-cell value="头像">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title> 
                    <input type="file" name="file" @change="uptImg"> 
                </template>
            </van-cell> 
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form> 
    </div>
</template>
<script>
import {  uptImgApi, uptMsgApi } from "@/api";
// vant默认的省市区数据
import { areaList } from "@vant/area-data";
import { Toast } from 'vant';
export default {
  data() {
    return {
      location: "",
      // 传给后端
      userinfo: {},
      // 上传的头像文件
      file: {},
      showBirthPicker: false, // 是否显示时间选择器
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2025, 10, 1),
      showArea: false,
      areaList: areaList, // 数据格式见 Area 组件文档
    };
  },
  created() {
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    this.uploader = [{ url: this.userinfo.img }];
  },
  methods: { 
    uptImg(event) { 
      this.file = event.target.files[0];
      uptImgApi({
        id: this.userinfo.id,
        file: this.file
      }).then((res)=>{
        if (res.data.msg !== null) {
          Toast.fail(res.data.msg);
        }
        //登陆成功
        if (res.data.data !== null && res.data.data !== undefined) {
          Toast.success(res.data.data);
        }
      })
    } ,
    onBirthConfirm(time) {
      this.userinfo.birth =
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
      this.showBirthPicker = false;
    },
    // 地区选择器
    onLocationConfirm(values) {
      this.userinfo.location = values
        // 二次取反,将目标对象转变成对应的boolean类型
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    }, 
    // 提交表单
    onSubmit() { 
      console.log(this.userinfo);
      uptMsgApi({
        userinfo: this.userinfo,
      });
    },
  },
};
</script>
<style>
.upt {
  margin-top: 60px;
  margin-bottom: 50px;
}
</style>