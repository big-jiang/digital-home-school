<template>
<v-app>
  <router-view></router-view>

  <my-cta v-if="this.$Global.isMobile()!=null&&this.$route.path!='/home'"/>
  
  <my-footer />
</v-app>

</template>

<script>
  export default {
    name: 'App',
    components: {
      MyCta: () => import('@/components/Cta'),
      MyFooter: () => import('@/components/Footer'),
    },
  }
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

  // a {
  //   font-weight: bold;
  //   color: #2c3e50;

  //   &.router-link-exact-active {
  //     color: #42b983;
  //   }
  // }
}
</style>
