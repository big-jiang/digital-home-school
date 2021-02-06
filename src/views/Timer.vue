<template>
<div class="pa-6">
  <v-data-table
    :headers="headers"
    :items="timers"
    item-key="_id"
    class="elevation-20"
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
            <v-toolbar-title>定时推送列表</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
  <template v-slot:item._id="{ item }">
      <div>{{formatMsg(item.msg,item._id,'title')}}</div>
    </template>
<template v-slot:item.sendTime="{ item }">
      <div>{{formatTime(item.sendTime)}}</div>
    </template>
    <template v-slot:item.msg="{ item }">
      <!-- <div>{{formatMsg(item.msg,null,'image')}}</div> -->
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="150"
        max-width="250"
        :src="formatMsg(item.msg,null,'image')"
        class="my-4"
      ></v-img>
    </template>
    <template v-slot:item.phone="{ item }">
      <div>{{formatMsg(item.msg,item.phone,'content')}}</div>
    </template>
    <template v-slot:item.active="{ item }">
        <v-scroll-x-transition
            group
            hide-on-leave
          >
            <v-chip
              v-for="(robot, i) in formatMsg(item.msg,item.active,'robot')"
              :key="i"
              color="grey"
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
        timers:[],
        isLoading: false,
        //数据表
        headers: [
            { text: '预计发送时间', value: 'sendTime' ,sortable: false,width:200,align: 'center',},
          {
            text: '文章标题',
            align: 'center',
            sortable: false,
            value: '_id',
            width:200
          },
          
          { text: '主题图片', sortable: false,value: 'msg' ,align: 'center',},
          { text: '文章内容', sortable: false,value: 'phone' ,align: 'center',},
          { text: '发送班级', sortable: false,value: 'active' ,align: 'center',},
        ],
      }
    },
    created () {
      this.getTimer(this.$Global.phone, "getTimer")
    },
    methods: {
      getTimer(phone,method) {
        var url = this.$Global.api;
        var requireData = {phone:phone, method: method };
        this.$axios
          .post(url, requireData)
          .then((res) => {
            console.log("定时推送", res.status);
            this.timers = res.data;
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