<template lang="">
    <div class="pb">
      <van-cell-group>
        <van-field v-model="title" label="标题" placeholder="请输入文章标题"/>
      </van-cell-group>
      <!-- 富文本 -->
      <quill-editor class="editor" 
                    v-model="content"
                    :options="editorOption"  
                    ref="myTextEditor"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                    @change="onEditorChange($event)">
      </quill-editor>
      <div class="bbt">
        <!-- 设置封面 -->  
        <!-- <a href="javascript:;" class="file">选择文件
            <input type="file" accept="image/*" 
                   name="file" @change="uptFile">
        </a> -->
        <!-- <van-uploader :before-read="beforeRead" :after-read="uptFile"> -->
        <van-uploader :after-read="uptFile">
          <van-button plain type="primary">上传封面</van-button>
        </van-uploader>
        <!-- v-if和v-else根据文章修改还是添加来切换显示 -->
        <van-button plain type="primary" @click="addBlog" v-if="state">
          发布文章</van-button>
        <van-button plain type="primary" @click="uptBlog" v-else>
          修改文章</van-button>
      </div>
    </div>
</template>
  <script>
import { addBlogApi, getBlogByBidApi, uptBlogApi, uptCoverApi } from "@/api";
import { Dialog, Toast } from "vant";
import { getBlogByBid } from "@/api/MUser";
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"], // 链接、图片、视频
];
export default {
  data() {
    return {
      // 富文本编辑器的内容
      content: null,
      editorOption: {
        modules: {
          // 配置富文本的顶栏可以用的功能组件
          toolbar: toolbarOptions,
        },
        placeholder: "点亮文字样式图标,可以输入特定样式文字", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true, //语法检测
      },
      // 上传的封面的url
      cover: "",
      // 文章标题
      title: "",
      // 判断是添加还是修改
      // 如果url里有bid,说明是修改文章(false)
      // 如果没有,说明是新增(true)
      state: true,
      // 如果是修改信息,要获取文章信息
      bloginfo: {},
    };
  },
  methods: {
    // 失去焦点
    onEditorBlur(editor) {},
    // 获得焦点
    onEditorFocus(editor) {},
    // 开始
    onEditorReady(editor) {},
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
      console.log(editor);
    },
    // 上传前置处理(和后置处理不能同时生效,不知道为啥)
    // beforeRead(file) {
    //   // console.log(file);
    //   // 校验
    //   if (file.type !== "image/jpeg") {
    //     Toast.fail("请上传 jpg 格式图片");
    //     return false;
    //   }
    // },
    // 上传封面
    // uptFile(event) {
    uptFile(file) {
      console.log(file);
      // 上传服务器,成功接收到文件路径,toast提交成功
      uptCoverApi(
        // file: event.target.files[0],
        file
      ).then((res) => {
        console.log(res);
        if (res.data.msg !== null) {
          Toast.fail(res.data.msg);
        }
        if (res.data.data !== null && res.data.data !== undefined) {
          // 保存封面url,提交文章时一起提交
          this.cover = res.data.data;
          Toast.success("上传成功");
        }
      });
    },
    addBlog() {
      // console.log(this.title === "");
      if (this.title === "") {
        return Toast.fail("文章标题不能为空");
      }
      // console.log(this.content);
      if (this.content === null) {
        return Toast.fail("文章内容不能为空");
      }
      Dialog.confirm({
        title: "确认发布?",
        message: "可要想好了哦~",
      }).then(() => {
        addBlogApi({
          uid: JSON.parse(localStorage.getItem("userinfo")).id,
          title: this.title,
          content: this.content,
          cover: this.cover,
        }).then((res) => {
          if (res.data.msg !== undefined) {
            Toast.fail(res.data.msg);
          }
          if (res.data.data !== null && res.data.data !== undefined) {
            Toast.success(res.data.data);
            // 发布成功返回空间
            this.$router.push({ path: "space" });
            // 刷新页面
            location.reload()
          }
        });
      });
    },
    uptBlog() {
      if (this.title === "") {
        return Toast.fail("文章标题不能为空");
      }
      // console.log(this.content);
      if (this.content === null) {
        return Toast.fail("文章内容不能为空");
      }
      Dialog.confirm({
        title: "确认修改?",
        message: "可要想好了哦~",
      }).then(() => {
        uptBlogApi({
          id: this.bloginfo.id,
          uid: JSON.parse(localStorage.getItem("userinfo")).id,
          title: this.title,
          content: this.content,
          cover: this.cover,
        }).then((res) => {
          if (res.data.msg !== undefined) {
            Toast.fail(res.data.msg);
          }
          if (res.data.data !== null && res.data.data !== undefined) {
            Toast.success(res.data.data);
            // 修改成功返回空间
            this.$router.push({ path: "space" });
            // 刷新页面
            location.reload()
          }
        });
      });
    },
  },
  // 计算属性
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
  },
  // 判断是添加还是修改
  created() {
    // 查询路由参数
    let bid = this.$route.query.bid;
    // 如果路径没有bid参数,则是添加文章
    if (bid === undefined) {
      this.state = true;
    } else {
      // 如果是修改,要数据回填
      // 获取bloginfo
      getBlogByBidApi(bid).then((res) => {
        // console.log(res);
        if (res.data.msg !== undefined) {
          Toast.fail(res.data.msg);
        }
        if (res.data.data !== null && res.data.data !== undefined) {
          this.bloginfo = res.data.data.bloginfo;
          console.log(this.bloginfo);
          // 数据回填
          this.content = this.bloginfo.content;
          this.title = this.bloginfo.title;
          this.cover = this.bloginfo.cover;
        }
        this.state = false;
      });
      console.log(this.state);
    }
  },
};
</script>
<style>
/* input输入框file类型样式美化,网上抄的 */
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 6px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 30px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
/* input输入框file类型样式美化,网上抄的 */
.pb {
  padding-top: 50px;
  padding-bottom: 50px;
}
/* 布局,让两个按钮分开 */
.bbt {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
/* 以下是富文本编辑器的汉化->网上抄的 */
.editor {
  line-height: normal !important;
  height: 600px;
  border-bottom: 1px solid brown;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
/* 富文本编辑器汉化样式 */
</style>