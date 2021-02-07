<template>
  <v-app>
    <router-view></router-view>

    <my-cta v-if="this.$Global.isMobile() != null && permissions[0]==1 && this.$route.path != '/home'" />

    <my-footer />
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    MyCta: () => import("@/components/Cta"),
    MyFooter: () => import("@/components/Footer"),
  },
  data:()=>({
    permissions:[0]
  }),
  async created(){
    this.permissions = (await this.getPermissions({method:'getPermissions'})).data.data[0].permissions;
  },
  methods:{
    getPermissions(requireData){
      return this.$axios.post(this.$Global.api, requireData);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
</style>
