<template>
  <v-container class="grey lighten-5"><v-card class="mb-12 elevation-20">
   <v-toolbar
      flat
    >
      <!-- <v-icon>mdi-silverware</v-icon> -->
      <v-toolbar-title>选择班级</v-toolbar-title>
      
    </v-toolbar>
    <v-row>
      <v-col>
        <v-card-text>
          <v-treeview
            v-model="tree"
            :load-children="post"
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
            {{items.length === 0?'暂无数据...':'请在右边选择您要推送的班级'}}
          </div>
          <div v-else>已选择人数:{{tree.length}}</div>
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
        :disabled="items.length===0 || selected.length===0 || tree.length ===0"
      >
        推送
        <v-icon right>
          mdi-cloud-upload
        </v-icon>
      </v-btn>
    <v-spacer></v-spacer>
    </v-col>
    </v-row>
    <v-divider></v-divider>
    
  </v-card>
  <v-data-table
    v-model="selected"
    show-select
    single-select
    item-key="title"
    :headers="headers"
    :items="robots"
    sort-by="name"
    class="elevation-5 ma-6"
    no-data-text="暂无数据..."
    loading-text="加载数据中... 请稍等"
    :items-per-page="10"
    :footer-props="{
      itemsPerPageText: '每页数量',
      itemsPerPageOptions: [10, 20, 50, -1],
      itemsPerPageAllText: '全部',
    }"
  >
  <template v-slot:top>
   <v-dialog
          v-model="dialog"
          max-width="1000px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">推送内容修改</span>
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
                      v-model="editedItem.num"
                      :label="headers[0].text"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.title"
                      :label="headers[1].text"
                      disabled
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
                    :label="headers[2].text"
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
  </template>
  <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >webhook
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>

    <my-snackbar :isShow="snackbar" :text="text"></my-snackbar>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      
      switch1:false,
      snackbar: false,
      text: '请选择班级和推送短信',
      items:[],
      tree:[],
      set:new Set([]),
      grade:['其他','一年级','二年级','三年级','四年级','五年级','六年级'],
      headers: [
        {
          text: '序号',
          align: 'center',
          sortable: false,
          value: 'num',
          width:100
        },
        // { text: '标签', align: 'center', value: 'tag' ,sortable: false,width:100},
        { text: '推送标题', value: 'title',align: 'center',sortable: false,width:200},
        { text: '推送内容', value: 'content',sortable: false,},
        { text: '更新', value: 'actions', sortable: false , align: 'center',width:150},
      ],
      robots: [],
      dialog:false,
      editedIndex: -1,
      editedItem: {
        num: '',
        title: '',
        content: ''
      },
      defaultItem: {
        num: '',
        title: '',
        content: ''
      },
      selected:[],
    }),
    created () {
      this.initialize()
    },
    watch:{
      // tree(val){
      //   console.log(val)
      // }
      dialog (val) {
        val || this.close()
      },
    },
    methods:{
      async initialize(){
        this.items = await this.post(this.$Global.shortApi,{ phone: this.$Global.phone,method:'getStudents'})
        this.getMsgTemplates(this.$Global.shortApi,{ method:'getMsgTemplates'})
      },
      post(url,requireData){
        return this.$axios
          .post(url, requireData)
          .then((res) => {
            if(res.data.length>0){
              return this.formatTree(res.data);
            }else{
              return [];
            }
          })
          .catch(function (error) {
            // 请求失败处理
            return error;
          });
      },
      formatTree(array){
        //获取当前班级类型
            array.map(item=>{
              this.set.add(item.grade)
            })
            var types = [...this.set];
            //构造校园树
            var tree = [{id:0,name:'全选',children:[]}];
            for(var i= 0;i<types.length;i++){
              //构造年级树
              tree[0].children[i]={id:types[i],name:this.grade[types[i]],children:[]}
              for(var j=0;j<array.length;j++){
                if(types[i]==array[j].grade){
                  //将对应班级放入年级树中
                  tree[0].children[i].children.push(array[j]);
                }else{
                  continue;
                }
              }
            }
            return tree;

      },
      getMsgTemplates(url, requireData) {
        this.$axios
          .post(url, requireData)
          .then((res) => {
            this.robots = res.data;
          })
          .catch(function (error) {
            // 请求失败处理
            console.log(error);
          });
      },
      submit(){
        if(this.tree.length>0){
          var phones = [];
          this.tree.map(item=>{
            phones.push(item.phone)
          })
          this.sendMsg(this.$Global.shortApi,{ phones:phones.toString(),content:this.selected[0].content,method:'sendMsg'})
        }else{
          // this.snackbar = true;
        }
      },
      sendMsg(url, requireData) {
        this.$axios
          .post(url, requireData)
          .then((res) => {
            // console.log()
            alert(res.data.split('=')[2])
            // this.robots = res.data;
          })
          .catch(function (error) {
            // 请求失败处理
            console.log(error);
          });
      },
      deletedRobot(index){
        this.tree.splice(index,1);
      },
      editItem (item) {
        this.editedIndex = this.robots.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        var robot = this.editedItem
        if(!robot.content){
          alert('参数不可为空')
          return
        }
        if (this.editedIndex > -1) {
          //修改机器人
          this.updateBack()
        } else {
          //新增机器人
        }
      },
      updateBack(){
        if (this.editedIndex > -1) {
            Object.assign(this.robots[this.editedIndex], this.editedItem)
          } else {
            this.robots.push(this.editedItem)
          }
          this.close()
      },
    }
  }
</script>