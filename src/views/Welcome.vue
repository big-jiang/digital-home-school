<template>
  <v-container class="grey lighten-5">
    
    <v-row v-if="false">
      <v-col
        cols="12"
        md="6"
      >
        <v-sparkline
        :gradient="gradient"
        smooth = "10"
        line-width="1.2"
      :value="looked"
      auto-draw
    >
    <template v-slot:label="item">{{ item.value }}</template>
    </v-sparkline>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-hover
        v-slot="{ hover }"
      >
        <v-card
          :elevation="hover ? 12 : 2"
          class="mx-auto"
        >
          <v-card-text class="my-4 text-center title">
            推送文章：{{looked.length}}次
          </v-card-text>
        </v-card>
      </v-hover>
      
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-hover
        v-slot="{ hover }"
      >
        <v-card
          :elevation="hover ? 12 : 2"
          class="mx-auto"
        >
          <v-card-text class="my-4 text-center title">
            总浏览量：{{totalLooked}}次
          </v-card-text>
        </v-card>
      </v-hover>
      
      </v-col>
      
    </v-row>

     <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <video width="100%" controls src="https://dingrobotfiles.oss-cn-hangzhou.aliyuncs.com/systemfile/dingding0301-3.mp4"></video>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <video  width="100%" controls src="https://dingrobotfiles.oss-cn-hangzhou.aliyuncs.com/systemfile/dingding2019.3.1.mp4"></video>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      looked: [],
      totalLooked:0,
      gradient:['#f72047', '#ffd200', '#1feaea']
    }),

    created () {
      //this.getData(this.$Global.phone);
    },

    methods: {
    async getData(phone) {
      let task = await this.getPageview({phone:phone,method:"getPageview"});
      if(task.code&&task.res.data.length>0){
        this.looked = task.res.data[0].looked;
        this.totalLooked = task.res.data[0].totalLooked;
      }
      console.log(task);
    },
    getPageview(requireData){
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
    }
  }
</script>