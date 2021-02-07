<template>
  <div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <Home v-if="home" v-on:login="login" v-on:logout="logout"/>
    <Login v-else v-on:login="login"/>
    
  </div>
</template>

<script>
export default {
    name: 'App',
    components: {
      Login: () => import('@/components/Login'),
      Home: () => import('@/components/Home'),
    },
    data:()=>({
      home:false
    }),
    methods:{
      login(){
        this.home = true;
      },
      logout(){
        this.home = false;
      },
    },
}
</script>>
