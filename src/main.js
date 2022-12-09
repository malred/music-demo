import Vue from "vue";
import App from "./App.vue";
import "@/mobile/flexible"; // 适配
import "@/styles/reset.css"; // 初始化样式
import router from "@/router"; // 路由对象
import {
  Button,
  Form,
  Field,
  Uploader,
  Tabbar,
  TabbarItem,
  NavBar,
  Col,
  Row,
  Image as VanImage,
  Cell,
  CellGroup,
  Icon,
  Search,
  List,
  Toast,
  Popup,
  DatetimePicker,
  Area,
  Dialog,
  Overlay,
  Collapse,
  CollapseItem,
  Radio,
  RadioGroup,
  Divider,
  Tag,
  Pagination,
} from "vant";
Vue.use(Tag);
Vue.use(Radio);
Vue.use(Pagination);
Vue.use(RadioGroup);
Vue.use(Toast);
Vue.use(Divider);
Vue.use(Area);
Vue.use(Collapse);
Vue.use(DatetimePicker);
Vue.use(CollapseItem);
Vue.use(Form);
Vue.use(Popup);
Vue.use(Search);
Vue.use(Button);
Vue.use(List);
Vue.use(Field);
Vue.use(Dialog);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(CellGroup);
Vue.use(Uploader);
Vue.use(Overlay);
Vue.config.productionTip = false;
// vant组件库适配方案: pxtorem自动转换
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
