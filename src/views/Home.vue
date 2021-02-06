<template>
  <div class="home">
    <v-carousel 
    cycle
    height="200"
    hide-delimiters
    hide-delimiter-background
    show-arrows-on-hover
    >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>

  

  <v-toolbar
  color="yellow lighten-5"
  height="45px"
  dense
  elevation=0
>
<v-btn icon>
        <v-icon color="orange darken-2">mdi-volume-high</v-icon>
      </v-btn>
      <v-toolbar-title class=" ml-n6 body-1 orange--text darken-2">
        感谢各位家长的支持与理解！！！
        </v-toolbar-title>

      </v-toolbar>
<Model />
<Record />
<!-- mdi-eye-outline -->
    <HelloWorld msg="Welcome to Your Vue.js App" v-if="false"/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Record from '@/components/Record.vue'
import Model from '@/components/Model.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Record,
    Model
  },
  data:()=>({
    value:1,
    records:[],
    items: [
          {
            src: 'https://726f-robot-1gk2vy2q8735f96a-1258099036.tcb.qcloud.la/image/4.png',
          },
          {
            src: 'https://726f-robot-1gk2vy2q8735f96a-1258099036.tcb.qcloud.la/image/3.png',
          },
        ],
  }),
  created () {
    console.log(this.$route)
      //this.getData();
    },

    methods: {
    async getData() {
      let task = await this.getSendRecord({phone:this.$Global.phone,method:"getSendRecord"});
      // console.log(task);
      if(task.code&&task.res.data.length>0){
        this.records = task.res.data;
        //console.log(sendRecord)
      }
    },
    getSendRecord(requireData){
      return this.$axios
        .post(this.$Global.api, requireData)
        .then((res) => {
          return {code:1,res:res};
        })
        .catch((error) => {
          // 请求失败处理
          return {code:0,res:error};
      });
    },
    jumpToDetail(md5){
      this.$router.push({path:`/`,query:{md5:md5}});
    },
    formatTime(timestamp){
      return this.$Global.formatTime(timestamp)
    }
    }
}
</script>
