<template>
  <v-btn
    :style="styles"
    color="secondary"
    fab
    fixed
    @click="jump"
    rel="noopener"
    right
    target="_blank"
    top
  >
    <v-icon>
      mdi-home
    </v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: 'Cta',

    computed: {
      styles () {
        return {
          marginTop: `${this.$vuetify.application.top+550}px`,
        }
      },
    },
    methods:{
        jump(){
            if(this.$route.path!='/home'){
                this.$router.push({path:'/home'});
            }
        }
    }
  }
</script>
