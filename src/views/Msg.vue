<template>
<div class="pa-6">
 <v-card class="mb-12 elevation-20">
   <v-toolbar
      flat
    >
      <!-- <v-icon>mdi-silverware</v-icon> -->
      <v-toolbar-title>选择班级群</v-toolbar-title>
      
    </v-toolbar>
    <v-row>
      <v-col>
        <v-card-text>
          <v-treeview
            v-model="tree"
            :load-children="getRobot"
            :items="items"
            item-key="name"
            selected-color="primary"
            open-on-click
            selectable
            return-object
          >
          </v-treeview>
        </v-card-text>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col
        cols="12"
        md="6"
        lg="7"
        align-self="center"
      >
        <v-card-text>
          <div
            v-if="tree.length === 0"
            key="title"
            class="title font-weight-light grey--text pa-4 text-center"
          >
            请在右边选择您要推送的班级
          </div>

          <v-scroll-x-transition
            group
            hide-on-leave
          >
            <v-chip
              v-for="(selection, i) in tree"
              :key="i"
              color="grey"
              dark
              small
              close
              class="ma-1"
              @click:close="deletedRobot(i)"
            >
              <v-icon
                left
                small
              >
                mdi-google-classroom
              </v-icon>
              {{ selection.name }}
            </v-chip>
          </v-scroll-x-transition>
        </v-card-text>
      </v-col>
      
      <v-divider vertical></v-divider>
      <v-col
        cols="12"
        lg="2"
        md="3"
        align-self="center"
      >
      
      <!-- <v-card-actions> -->
        
      <v-btn
        color="blue-grey mr-4"
        dark
        class="mb-2 white--text"
        @click="tree = []"
      >
        重置
      </v-btn>
      <v-btn
        class="mb-2 white--text"
        color="primary mr-4"
        depressed
        @click="submit"
        v-if="!switch1"
      >
        实时推送
        <v-icon right>
          mdi-cloud-upload
        </v-icon>
      </v-btn>
      <v-btn
        class="mb-2 white--text"
        color="warning mr-4"
        depressed
        @click="submit"
        v-else
      >
        定时推送
        <v-icon right>
          mdi-cloud-upload
        </v-icon>
      </v-btn>
    <!-- </v-card-actions> -->
    <v-spacer></v-spacer>
    </v-col>
    </v-row>
    <v-divider></v-divider>
    
  </v-card>

  <v-row v-if="permissions[0]">
    <v-col
      cols="12"
      sm="6"
      md="3"
    >
     <v-switch
     color="warning"
      v-model="switch1"
      :label="`预计发送时间(定时)：${this.date} ${this.time}`"
    ></v-switch>
    </v-col>
    <v-spacer></v-spacer>
    
    <v-col
      cols="12"
      sm="6"
      md="2"
      v-if="switch1"
    >
      <v-dialog
        ref="dialogDate"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="选择日期"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
          locale="zh-cn"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            取消
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialogDate.save(date)"
          >
            确认
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="2"
      v-if="switch1"
    >
      <v-dialog
        ref="dialog"
        v-model="modal2"
        :return-value.sync="time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="选择时间"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="modal2"
          v-model="time"
          full-width
          format="24hr"
          :allowed-hours="allowedHours"
          max="19:30"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal2 = false"
          >
            取消
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(time);"
          >
            确认
          </v-btn>
        </v-time-picker>
      </v-dialog>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
      align-self="center"
      v-if="switch1"
    >
    <v-spacer></v-spacer>
    
    </v-col>
  </v-row>

<!-- {{selected}} -->
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="schoolMsg"
    :search="search"
    show-select
    single-select
    item-key="title"
    class="elevation-1"
    no-data-text="暂无数据..."
    no-results-text="没有找到您搜索的内容"
    loading-text="加载数据中... 请稍等"
    :footer-props="{
      itemsPerPageText: '每页数量',
      itemsPerPageOptions: [10, 20, 50, -1],
      itemsPerPageAllText: '全部',
    }"
  >
  

          <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>通用素材</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="实时搜索"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
          <v-dialog
          v-model="dialog"
          max-width="1250px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">文章修改</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.title"
                      :label="headers[1].text"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="grade[editedItem.grade-1]"
                      :label="headers[0].text"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    :md="permissions[1]==1?10:12"
                  >
                    <v-text-field
                      v-model="editedItem.url"
                      :label="headers[2].text"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="2"
                    v-if="permissions[1]"
                  >
                    <v-file-input
                      prepend-icon="mdi-camera"
                      accept="image/*"
                      label="使用本地图片"
                      @change="getFile"
                    ></v-file-input>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="12"
                    v-if="permissions[2]"
                  >
                    <v-text-field
                      v-model="editedItem.videoUrl"
                      label="视频链接"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="12"
                  >
                  <v-textarea
                    auto-grow
                    v-model="editedItem.content"
                    :label="headers[3].text"
                  ></v-textarea>
    
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions >
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close()"
              >
                取消
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save()"
              >
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </template>

  <template v-slot:item.grade="{ item }">
      <div>{{grade[item.grade-1]}}</div>
    </template>

    <template v-slot:item.url="{ item }">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="150"
        max-width="250"
        :src="item.url"
        class="my-4"
      ></v-img>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>

  </v-data-table>
  <v-row justify="center">
    <v-dialog
      v-model="dialogSend"
      scrollable
      max-width="450px"
    >
      <v-card>
        <v-card-title>推送状态</v-card-title>
        <v-divider></v-divider>
        
        <!-- 出现未成功推送数据，可以先进行二次发送， -->
        <v-card-text style="height: 300px; justify-content:center;align-items:center;" class="pt-6">
          
          <v-chip
              v-for="(selection, i) in statusSend"
              :key="i"
              :color="selection.code==0?'success':'red'"
              dark
              small
              class="ma-1"
            >
              <v-icon
                left
                small
              >
                mdi-beer
              </v-icon>
              {{ selection.name }}
            </v-chip>
        </v-card-text>
        <v-card-text>
        <v-row 
          align="center"
          justify="center"
          >其中<v-chip
              color="success"
              dark
              small
              class="ma-1"
            >
            绿色标签
        </v-chip>
        为发送成功的推送;<v-chip
              color="red"
              dark
              small
              class="ma-1"
            >
            红色标签
        </v-chip>
        为发送失败的推送;</v-row>
        <!-- <v-row justify="center">失败原因可能为：1.推送群组信息有误 2.网络异常 3.其他问题</v-row> -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="dialogSend = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</div>
</template>

<script>
  export default {
    data () {
      return {
        statusSend:[{name:'',code:0}],
        dialogSend: false,
        //权限管理
        permissions:[0,0,0,0],
        //编辑修改内容
        dialog:false,
        editedIndex: -1,
        editedItem: {
        title: '',
        url: '',
        content: ''
      },
      defaultItem: {
        title: '',
        url: '',
        content: ''
      },
        //时间选择
        // picker: new Date().toISOString().substr(0, 10),
        allowedHours:[7,8,9,17,18,19,20],
        allowedMinutes:[0,10,20,30,40,50],
        switch1:false,
        time: new Date(new Date().getTime()+8*3600*1000).toISOString().substr(11, 8),
        date: new Date(new Date().getTime()+8*3600*1000).toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        modal2: false,
        robots:[],
        //树形结构
        breweries: [],
        isLoading: false,
        tree: [],
        types: [],
        //数据表
        search: "",
        selected:[],
        grade:['小学','初中','高中','其他'],
        headers: [
          {
            text: '文章类型',
            align: 'center',
            sortable: false,
            value: 'grade',
            width:150
          },
          { text: '主题标题', sortable: false,value: 'title' ,width:300,align: 'center',},
          { text: '主题图片', sortable: false,value: 'url' ,align: 'center',},
          { text: '文章内容', sortable: false,value: 'content' },
          { text: '操作', value: 'actions', sortable: false ,width:100,align: 'center'},
        ],
        schoolMsg: [],
        account:{school:'',motto:'',url:''}
      }
    },
    computed: {
      items () {
        const children = this.types.map(type => ({
          id: type,
          name: type,
          children: this.getChildren(type),
        }))
        console.log([{
          id: 1,
          name: '全选',
          children,
        }])
        return [{
          id: 1,
          name: '全选',
          children,
        }]
      },
      shouldShowTree () {
        return this.breweries.length > 0 && !this.isLoading
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      breweries (val) {
        this.types = val.reduce((acc, cur) => {
          const type = cur.grade

          if (!acc.includes(type)) acc.push(type)

          return acc
        }, []).sort()
      },
    },

    created () {
      this.initialize();
      this.getSchoolMsg(this.$Global.phone, "getMsg")
      this.getRobot(this.$Global.phone, "getRobot")
      this.getAccount(this.$Global.phone, "getAccount")
      // this.getTimer(this.$Global.phone, "getTimer")
    },
    methods: {
      initialize(){
        this.permissions = this.$Global.permissions;
        // console.log(this.$Global.permissions);
      },
      getAccount(phone, method) {
      var url = this.$Global.api;
      var requireData = { phone: phone, method: method };
      this.$axios
        .post(url, requireData)
        .then((res) => {
          // console.log("学校信息", res);
          this.account = res.data[0];
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
      getSchoolMsg(phone,method) {
        var url = this.$Global.api;
        var requireData = {phone:phone, method: method };
        this.$axios
          .post(url, requireData)
          .then((res) => {
            // console.log("通用素材", res);
            this.schoolMsg = res.data;
          })
          .catch(function (error) {
            // 请求失败处理
            console.log(error);
          });
      },
      getRobot() {
      var url = this.$Global.api;
      var requireData = { phone: this.$Global.phone, method: "getRobot" };
      this.$axios
        .post(url, requireData)
        .then((res) => {
          // console.log("学校机器人", res);
          this.breweries = res.data;
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    getTimer(phone,method) {
        var url = this.$Global.api;
        var requireData = {phone:phone, method: method };
        this.$axios
          .post(url, requireData)
          .then((res) => {
            console.log("定时推送", res);
          })
          .catch(function (error) {
            // 请求失败处理
            console.log(error);
          });
      },
    
    deletedRobot(index){
      this.tree.splice(index,1);
    },
    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
    submit() {
      // console.log((new Date(this.date+' '+this.time+':00')).getTime())
      // console.log(this.selected,this.account,this.tree);
      if (this.selected.length>0&&this.tree.length>0) {
        var msg = this.selected[0];
        var sendTime = (new Date(this.date+' '+this.time+':00')).getTime();
        var content = {
          phone:this.account.phone,
          school: this.account.school,
          image: msg.url,
          videoUrl:msg.videoUrl,
          title: msg.title,
          content: msg.content,
          motto: this.account.motto,
          logo: this.account.url,
          robot: this.tree,
          sendTime:sendTime,
          method: this.switch1?"timer":"sendMsg"
        };
        if(this.switch1&&sendTime<(new Date().getTime()+300*1000)){
          alert("5分钟之内的推送，建议您使用实时推送！！！");
          return 
        }
        this.sendMsg(content);
        // console.log(content)
      } else {
        alert("请选择需要推送的内容和班级群");
      }
    },
    sendMsg(content) {
      var url = this.$Global.api;
      var requireData = content;
      this.$axios
        .post(url, requireData)
        .then((res) => {
          this.dialogSend = true;
          this.statusSend = res.data
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
          alert("推送失败");
        });
    },

      getChildren (type) {
        const breweries = []
        for (const brewery of this.breweries) {
          brewery
          if (brewery.grade !== type) continue
          breweries.push(brewery)
        }
        return breweries
      },
    editItem(item) {
        this.editedIndex = this.schoolMsg.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
    close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save() {
        console.log(this.editedItem)
        if (this.editedIndex > -1) {
          Object.assign(this.schoolMsg[this.editedIndex], this.editedItem)
        }
        this.close()
      },
      //上传图片
      async getFile(file){
        // console.log(file.size>1024000)
        if(file==undefined||file.size>1024000){
            console.log('超出图片限制大小（1M）');
            return;
          }else{
            let image= await this.file2Image(file);
            let url = await this.uploadImage(image,file.name,"uploadImage");
            this.editedItem.url = url;
          }
      },
      uploadImage(image,path,method){
        return new Promise((resolve) => {
          var url = this.$Global.api;
          var requireData = { imageBase64:image,phone: this.$Global.phone, path:path,method:method};
          this.$axios
            .post(url, requireData)
            .then((res) => {
              resolve(res.data.url)
            })
            .catch(function (error) {
              // 请求失败处理
              console.log(error);
            });
        });
      },
      file2Image(file) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            const data = e.target.result;
            resolve(data);
          };
          reader.readAsDataURL(file);
        });
      },
    },
  }
</script>