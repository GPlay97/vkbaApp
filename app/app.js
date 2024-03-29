import Vue from "nativescript-vue";
import App from "./components/App";
import Home from "./components/Home";
import Login from './components/Login';
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
Vue.use(RadSideDrawer);

Vue.config.silent = (TNS_ENV === 'production');

new Vue({
    data: () => ({
      isLoggedIn: false
    }),
    render (h) {
        return h(
          App,
          [
            h(DrawerContent, { slot: 'drawerContent' }),
            h(Login, { slot: 'mainContent' })
          ]
        )
      }
  }).$start();
