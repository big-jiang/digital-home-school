<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" width="240" app>
      <v-sheet color="grey lighten-4" class="pa-5">
        <h3>数字家校平台</h3>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item-group v-model="selectedRouter" color="primary">
          <v-list-item v-for="(item, i) in links" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-col 
        cols="12"
        md="12"
        class="primary--text mb-n5"
        >湖州莲盛科技</v-col>
        <v-col
        cols="12"
        md="12"
        class="mb-10"
        >18258169722(丁)</v-col>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#1E88E5"
      dark
      src="https://picsum.photos/1920/1080?random"
      scroll-target="#scrolling-techniques-2"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ account.school }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="jumpHelp">
            <v-list-item-title>介绍文档</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>退出</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    account: { school: "测试学校" },
    drawer: null,
    selectedRouter: 0,
    links: [
      { text: "首页", icon: "mdi-home", url: "welcome" },
      { text: "机器人管理", icon: "mdi-account-multiple", url: "robot" },
      { text: "通用素材", icon: "mdi-book", url: "msg" },
      { text: "校园素材", icon: "mdi-school", url: "schoolMsg" },
      // { text: "定时推送", icon: "mdi-clock", url: "timer" },
      { text: "推送记录", icon: "mdi-check", url: "sendRecord" },
      // { text: "教育主题", icon: "mdi-microsoft-windows", url: "about" },
      // { text: "短信发送", icon: "mdi-message", url: "shortMsg" },
      // { text: "校园门禁", icon: "mdi-door", url: "shortMsg" },
      // { text: "教师评价", icon: "mdi-record", url: "teacherCheck" },
    ],
  }),
  watch: {
    selectedRouter(val) {
      //不能跳相同的页面
      // console.log(this.$router.currentRoute.fullPath);
      if (val == undefined) {
        // this.$router.push('/'+this.links[0].url);
      } else {
        var jumpRoute = "/" + this.links[val].url;
        this.$router.currentRoute.fullPath == jumpRoute
          ? ""
          : this.$router.replace(jumpRoute);
      }
    },
  },
  created() {
    var account = JSON.parse(localStorage.getItem("login"));
    if (account) {
      this.$emit("login");
      this.account = account;
    } else {
      this.$emit("logout");
    }
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    jumpHelp(){
        window.open(this.$Global.docHelp,'_blank')
      }
  },
};
</script>
