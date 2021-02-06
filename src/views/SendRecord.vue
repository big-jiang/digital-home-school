<template>
<div class="pa-6">
  <v-row class="mb-6 mt-n12">
      <v-col
        cols="12"
        md="9"
      >
      <v-card
      elevation="10"
      >
        <v-sparkline
        :gradient="gradient"
        smooth = "10"
        line-width="1"
      :value="looked"
      height="60"
      :labels="looked"
      auto-draw
      color="grey"
    >
    </v-sparkline>
    </v-card>
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
          <v-card-text class="my-4 text-center title display-2 orange--text font-weight-black">
            推送次数：{{looked.length}}次
          </v-card-text>
        </v-card>
      </v-hover>
      <v-hover
        v-slot="{ hover }"
      >
        <v-card
          :elevation="hover ? 12 : 2"
          class="mx-auto"
        >
          <v-card-text class="my-4 text-center title display-2">
            视频浏览量：{{totalLooked}}次
          </v-card-text>
        </v-card>
      </v-hover>
      </v-col>
    </v-row>

  <v-data-table
    :headers="headers"
    :items="records"
    item-key="_id"
    class="elevation-8"
    no-data-text="暂无数据..."
    loading-text="加载数据中... 请稍等"
    :footer-props="{
      itemsPerPageText: '每页数量',
      itemsPerPageOptions: [10, 20, 50, -1],
      itemsPerPageAllText: '全部',
    }"
  >
  <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>已推送列表</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
<template v-slot:item.sendTime="{ item }">
      <div>{{formatTime(item.sendTime)}}</div>
    </template>
    <template v-slot:item.image="{ item }">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="150"
        max-width="250"
        :src="item.image"
        class="my-4"
      ></v-img>
    </template>
    <template v-slot:item.content="{ item }">
      <div>{{item.content.slice(0,25)+'...'}}</div>
    </template>
    <template v-slot:item.status="{ item }">
        <v-scroll-x-transition
            group
            hide-on-leave
          >
            <v-chip
              v-for="(robot, i) in item.status"
              :key="i"
              :color="robot.code==0?'success':'red'"
              dark
              small
              class="ma-1"
            >
              <v-icon
                left
                small
              >
                mdi-google-classroom
              </v-icon>
              {{ robot.name }}
            </v-chip>
          </v-scroll-x-transition>
    </template>
  </v-data-table>
</div>
</template>
<script>
  export default {
    data () {
      return {
        records:[],
        isLoading: false,
        //数据表
        headers: [
          { text: '推送时间', value: 'sendTime' ,sortable: false,width:200,align: 'center',},
          { text: '文章标题',align: 'center',sortable: false,value: 'title',width:200},
          { text: '浏览量', value: 'looked' ,sortable: false,width:100,align: 'center',},
          { text: '主题图片', sortable: false,value: 'image' ,align: 'center',},
          { text: '文章内容', sortable: false,value: 'content' ,align: 'center',},
          { text: '推送班级', sortable: false,value: 'status' ,align: 'center',},
        ],
        //数据统计
        looked: [],
        totalLooked:0,
        gradient:['#f72047', '#ffd200', '#1feaea']
      }
    },
    created () {
      this.getData(this.$Global.phone);
      
    },
    methods: {
      async getData(phone) {
        this.getSendRecord(this.$Global.phone,'getSendRecord');
        let task = await this.getPageview({phone:phone,method:"getPageview"});
        if(task.code&&task.res.data.length>0){
          this.looked = task.res.data[0].looked;
          this.totalLooked = task.res.data[0].totalLooked;
        }
        // console.log(task);
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
      getSendRecord(phone,method) {
        var url = this.$Global.api;
        var requireData = {phone:phone, method: method };
        this.$axios
          .post(url, requireData)
          .then((res) => {
            console.log("定时推送", res.data);
            this.records = res.data
          })
          .catch(function (error) {
            // 请求失败处理
            console.log(error);
          });
      },
      formatTime(timestamp){
          return this.$Global.formatTime(timestamp);
      },
      formatMsg(msg,other,str){
          var msgJson = null;
          switch (str) {
              case 'title':
                msgJson = JSON.parse(msg);
                return msgJson.title
              case 'image':
                msgJson = JSON.parse(msg);
                return msgJson.image
            case 'content':
                msgJson = JSON.parse(msg);
                return msgJson.content.slice(0,25)+'...'
            case 'robot':
                msgJson = JSON.parse(msg);
                return msgJson.robot
              default:
                  console.log(other);
                  break;
          }
          
      },
    isMobile() {
        return this.$Global.isMobile();
      },
    },
  }
</script>