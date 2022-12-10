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
            <!-- 选择性别 --> 
            <van-field name="radio" label="单选框">
              <template #input>
                <van-radio-group v-model="userinfo.sex" direction="horizontal">
                  <van-radio name="男">男</van-radio>
                  <van-radio name="女">女</van-radio>
                  <van-radio name="无">无</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 选择生日 -->
            <van-field
                readonly
                clickable 
                name="datetimePicker"
                :rules="[{ required: true, message: '请选择生日' }]"
                :value="userinfo.birth"
                placeholder="点击选择生日"
                label="生日"  
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
                :rules="[{ required: true, message: '请选择住址' }]"
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
            <!-- <van-cell value="头像"> 
                <template #title> 
                    <input type="file" name="file" @change="uptImg"> 
                </template>
            </van-cell>  -->
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form> 
    </div>
</template>
<script>
import { getMuserInfoByNameApi, uptMsgApi } from "@/api";
// vant默认的省市区数据
import { areaList } from "@vant/area-data";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      location: "",
      // 传给后端
      userinfo: {},
      showBirthPicker: false, // 是否显示时间选择器
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2025, 10, 1),
      showArea: false,
      areaList: areaList, // 数据格式见 Area 组件文档  
    };
  },
  created() {
    let uname=localStorage.getItem('uname')
    // 重新获取userinfo,更新信息
    getMuserInfoByNameApi(uname).then((res) => { 
      // 浏览器缓存用户信息
      localStorage.setItem("userinfo", JSON.stringify(res.data.data));
      this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    });
    // this.userinfo = JSON.parse(localStorage.getItem("userinfo")); 
  },
  methods: { 
    // 日期选择器选择后
    onBirthConfirm(time) {
      // 获取年月日,然后拼接,赋值给userinfo
      this.userinfo.birth =
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
      // 让选择器消失
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
      // console.log(this.userinfo);
      // console.log(this.radio);
      // 更新信息
      // 确认是否修改
      Dialog.confirm({
        title: "确认更新个人信息?",
        message: "可要想好了哦~",
      }).then(() => {
        console.log(this.userinfo);
        uptMsgApi({
          // userinfo: this.userinfo,
          id: this.userinfo.id,
          name: this.userinfo.name,
          age: this.userinfo.age,
          sex: this.userinfo.sex,
          birth: this.userinfo.birth,
          location: this.userinfo.location,
        }).then((res) => {
          if (null !== res.data.msg) {
            Toast.fail(res.data.msg);
          }
          if (null !== res.data.data && undefined !== res.data.data) {
            Toast.success(res.data.data);
            // 清空表单
            this.userinfo = null;  
            // 刷新页面
            location.reload();
          }
        });
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