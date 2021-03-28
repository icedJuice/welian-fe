import Vue from 'vue';

import {
  Tabs,
  Table,
  Button,
  Input,
  TableColumn,
  Carousel,
  CarouselItem,
  Dialog,
  TabPane,
  Loading,
  Alert,
  Notification,
  Pagination,
  Breadcrumb,
  BreadcrumbItem,
  Message,
  Image,
  Form,
  FormItem,
  Select,
  Option,
  Cascader,
  Upload,
} from 'element-ui';

Vue.use(Tabs);
Vue.use(Button);
Vue.use(Input);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(TabPane);
Vue.use(Loading);
Vue.use(Alert);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Image);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Cascader);
Vue.use(Upload);


Vue.prototype.$ELEMENT = { size: 'small' };
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
