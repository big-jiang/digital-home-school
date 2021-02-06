<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="robots"
    sort-by="name"
    class="elevation-5 ma-6"
    
    no-data-text="暂无机器人..."
    loading-text="加载数据中... 请稍等"
    :items-per-page="10"
    :footer-props="{
      itemsPerPageText: '每页数量',
      itemsPerPageOptions: [10, 20, 50, -1],
      itemsPerPageAllText: '全部',
    }"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>机器人管理</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              新增
            </v-btn>

            <v-btn
              depressed
              class="mr-10 mb-2"
              @click="jumpHelp"
            >
              操作手册
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
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
                      v-model="editedItem.grade"
                      :label="headers[0].text"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      :label="headers[1].text"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.webhook"
                      :label="headers[2].text"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions >
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                取消
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                确认
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确认</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >webhook
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
        v-if="false"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        重新获取
      </v-btn>
    </template>
    <template v-slot:item.webhook="{ item }">
      <div>{{isMobile()?item.webhook.slice(0,30)+'...':item.webhook}}</div>
    </template>
  </v-data-table>
  <my-snackbar :isShow="snackbar" :text="text"></my-snackbar>
  <my-overlay :overlay="overlay"></my-overlay>
  <!-- <v-snackbar
      v-model="snackbar"
      timeout="3000"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar> -->
</v-container>
</template>

<script>
import myOverlay from '../lib/my-overlay.vue'
  export default {
  components: { myOverlay },
    data: () => ({
      //加载动画和反馈
      snackbar:false,
      text:'提示语',
      overlay:false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: '年级',
          align: 'center',
          sortable: false,
          value: 'grade',
          width:250
        },
        { text: '班级名称', align: 'center', value: 'name' ,width:250,sortable: false,},
        { text: '机器人链接', value: 'webhook',sortable: false,},
        { text: '更新', value: 'actions', sortable: false , align: 'center',width:150},
      ],
      robots: [],
      editedIndex: -1,
      editedItem: {
        grade: '',
        name: '',
        webhook: ''
      },
      defaultItem: {
        grade: '',
        name: '',
        webhook: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增' : '编辑'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize();
    },

    methods: {
    async getData(phone) {
      //this.getAccount(phone, "getAccount");
      // this.getRobot(phone, "getRobotByGroup");
      this.getRobot(phone, "getRobot");
      // this.getMsg();
      // this.getSchoolMsg(phone, "getSchoolMsg");
    },
    http(requireData){
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
    getAccount(phone, method) {
      var url = this.$Global.api;
      var requireData = { phone: phone, method: method };
      this.$axios
        .post(url, requireData)
        .then((res) => {
          console.log("学校信息", res.status);
          this.account = res.data[0];
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    getRobot(phone, method) {
      var url = this.$Global.api;
      var requireData = { phone: phone, method: method };
      this.$axios
        .post(url, requireData)
        .then((res) => {
          console.log("学校机器人", res.status);
          this.robots = res.data;
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    getMsg() {
      var url = this.$Global.api;
      var requireData = { method: "getMsg" };
      this.$axios
        .post(url, requireData)
        .then((res) => {
          console.log("通用素材", res.status);
          this.msg = res.data;
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
          console.log("学校素材", res.status);
          this.schoolMsg = res.data;
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    addRobot(phone, name, webhook, grade, method) {
      var url = this.$Global.api;
      var requireData = {
        phone: phone,
        name: name,
        webhook: webhook,
        grade: grade,
        method: method,
      };
      // console.log(requireData);
      this.$axios
        .post(url, requireData)
        .then((res) => {
          
          console.log("新增机器人", res.status);
          this.addBack();
        })
        .catch(function (error) {
          // 请求失败处理1
          console.log(error);
        });
    },
    addBack(){
      if (this.editedIndex > -1) {
          Object.assign(this.robots[this.editedIndex], this.editedItem)
        } else {
          this.robots.push(this.editedItem)
        }
        this.close()
    },
    async updateRobot(id,requireData){
            var url = `https://robot-1gk2vy2q8735f96a.service.tcloudbase.com/rest-api/v1.0/robot/${id}`;
            let task = await this.restApi(url,requireData);
            if(task.updated>0){alert('更新成功')}
            this.addBack();
    },
    restApi(url,requireData){
        return this.$axios
                  .patch(url, requireData)
                  .then((res) => {return res.data;})
                  .catch(function (error){console.log(error);});
    },
      initialize () {
        this.robots = [];
        this.getData(this.$Global.phone);
      },

      editItem (item) {
        
        this.editedIndex = this.robots.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.robots.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.robots.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        var robot = this.editedItem
        if(!robot.name||!robot.webhook||!robot.grade){
          alert('参数不可为空')
          return
        }
        if (this.editedIndex > -1) {
          //修改机器人
          this.updateRobot(robot._id,{"data": {"name": robot.name,"webhook": robot.webhook, "grade":robot.grade}})
        } else {
          //新增机器人
          this.addRobot(this.$Global.phone, robot.name, robot.webhook, robot.grade, 'addRobot')
        }
      },
      isMobile() {
        return this.$Global.isMobile();
      },
      jumpHelp(){
        window.open(this.$Global.robotHelp,'_blank')
      }
    },
  }
</script>