<template>
<div>
  <v-expansion-panels v-if="false">
    <v-expansion-panel
      v-for="(item,i) in 5"
      :key="i"
    >
      <v-expansion-panel-header>
        Item
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-card  id="0">
                <v-card-title >
                  <span  @click="home" class="headline">暨阳小学班主任工作学期考核</span>
                </v-card-title>
                <v-card-text class="my-10">
                  <v-container id="printpdf">
                     <table class="black--text" border="1" >
            
            <tr>
                <td align="center">基本要求</td>
                <td align="center" width="100">项目</td>
                <td align="center" colspan="2">标准</td>
                <td align="center">权重</td>
                <td align="center">自评</td>
                <td align="center">考核</td>
                <td align="center" width="100">检评方法</td>
            </tr>
            <tr>
                <td rowspan="8">班主任能以人为本为教育理念，以行为规范为育人准则，在教育工作中取得较好效果。

</td>
<td align="center" colspan="7">1.常规教育</td>
            </tr>
            <tr>
                <td align="center">（1）三项竞赛</td>
                <td align="center" colspan="2">竞赛名次年段前8名。</td>
                <td align="center">10、8、6、5、4、3、2、1</td>
                <td align="center"><input /></td>
                <td align="center"><input /></td>
                <td align="center">查资料</td>
            </tr>
            <tr>
                <td align="center">（2）安全教育</td>
                <td align="center" colspan="2">认真地对学生进行安全教育。</td>
                <td align="center">6</td>
                <td align="center"><input /></td>
                <td align="center"><input /></td>
                <td align="center">座     谈</td>
            </tr>
            <tr>
                <td align="center">（3）法制教育</td>
                <td align="center" colspan="2">积极参加学校组织的活动。</td>
                <td align="center">1-3</td>
                <td align="center"><input /></td>
                <td align="center"><input /></td>
                <td align="center">座     谈</td>
            </tr>
            <tr>
                <td align="center">（4）思想教育</td>
                <td align="center" colspan="2">有计划、针对性地组织教育活动(少先队活动课、晨间谈话)</td>
                <td align="center">5</td>
                <td align="center"><input /></td>
                <td align="center"><input /></td>
                <td align="center">座     谈</td>
            </tr>
            <tr>
                <td align="center" rowspan="3">（5）健身教育</td>
                <td align="center" colspan="2">认真地组织“两操”活动。(课间操、眼保健操)</td>
                <td align="center">2</td>
                <td align="center"><input /></td>
                <td align="center"><input /></td>
                <td align="center">实地观察</td>
            </tr>
            <tr>
                <td align="center" colspan="2">积极开展“两课”活动。(体育课、课外活动课)</td>
                <td align="center">2</td>
                <td align="center"><input /></td>
                <td align="center"><input /></td>
                <td align="center">查资料</td>
            </tr>
            <tr>
                <td align="center" colspan="2">个人卫生，无长发、长指甲，衣着整洁。</td>
                <td align="center">2</td>
                <td align="center"><input /></td>
                <td align="center"><input /></td>
                <td align="center">查资料</td>
            </tr>
            
            <!-- <tr >
              <td align="center" colspan="1" width="100">姓名</td>
              <td align="center" colspan="1" width="100">{{person.name||''}}</td>
              <td align="center" colspan="1" width="100">身份证号</td>
              <td align="center" colspan="2" width="200">{{person.cardId||''}}</td>
               <td align="center" style="vertical-align:middle">
                   
                   <input />
               </td>
            </tr> -->
 </table>
                  </v-container>
                </v-card-text>

                <!-- <v-card-actions>
                  <v-btn color="primary darken-1" text @click="prePerson" v-if="piSearch&&piIndex>0">
                    上一个
                  </v-btn>
                  <v-btn color="primary darken-1" text @click="nextPerson" v-if="piSearch&&piIndex<piPersons.length-1">
                    下一个
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    取消
                  </v-btn>
                  <v-btn color="success darken-1" text @click="print">
                    打印
                  </v-btn>
                </v-card-actions> -->
              </v-card>

              <v-file-input 
    class="mx-6"
    outlined
    dense
    show-size
    label="请选择文件（xls或xlsx）" 
    accept=".xls, .xlsx" 
    @change="uploadFile"
    ></v-file-input>
    <v-data-table
        item-key="num"
        :headers="headers"
        :items="desserts"
        class="elevation-1 ma-6"
        no-data-text="请先选择数据文件,然后选择需要查询的人员,再点击批量查询"
        no-results-text="没有找到您搜索的内容"
        loading-text="加载数据中... 请稍等"
        :footer-props="{
          itemsPerPageText: '每页数量',
          itemsPerPageOptions: [10, 20, 50, -1],
          itemsPerPageAllText: '全部',
        }"
      >
    <template v-slot:item.self="{ item }" style="align-items:center;justify-content:center">
        <v-row align="center" justify="center">
            <v-text-field
            :label="item"
            solo
          ></v-text-field>
        </v-row>
    </template>
    <template v-slot:item.check="{ item }">
      <div>
            <v-text-field
            :label="item"
            solo
          ></v-text-field>
        </div>
    </template>
    </v-data-table>
</div>
</template>

<script>
import XLSX from "xlsx";

  export default {
    data: () => ({
      snackbar: true,
      text: '如有需要，请联系技术人员',
      person:{name:"大将",cardId:"身份证号"},
      headers: [
      { align: "center",text: "序号", value: "num" },
      { align: "left",text: "类型", value: "type1" },
      { align: "left",text: "项目", value: "type2" },
      { align: "left",text: "标准", value: "type3" },
      { align: "center",text: "权重", value: "weight" },
      { align: "center",text: "自评", value: "self", sortable: false },
      { align: "center",text: "检查", value: "check", sortable: false },
      { align: "center",text: "检评方法", value: "method" },
      { align: "center",text: "操作", value: "actions", sortable: false },
    ],
    desserts: [],
    }),
    methods:{
        async home(){
            console.log("1");
            var url = 'https://robot-1gk2vy2q8735f96a.service.tcloudbase.com/rest-api/v1.0/robot';
            var requireData = {"query": {"phone": "18258169722"},"data": {"active": true}};
            let task = await this.restApi(url,requireData);
            console.log(task);
        },
        restApi(url,requireData){
          return this.$axios
                  .patch(url, requireData)
                  .then((res) => {return res.data;})
                  .catch(function (error){console.log(error);});
        },
        async uploadFile(event) {
      try {
        if (typeof event == "undefined") {
          return;
        }
        this.overlay = true;
        const file = event;
        const types = file.name.split(".")[1];
        const fileType = ["xlsx", "xls"].some((item) => item === types);
        if (!fileType) {
          this.snackbar = true;
          return (this.text = "文件类型错误，请重新选择"); //注意此处的$snackbar()是vuetify框架中的组件，此处改为自己使用的组件即可
        }
        let fileList = [];
        let tabJson = await this.file2Xce(file);
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson;
          fileList = this.xlsxJson[0].sheet;
          //console.log(fileList);
          this.overlay = false;
          this.desserts = fileList;
          //event.target.value = ""; // 解决上传相同附件只传一次问题，可以参考博文：https://blog.csdn.net/weixin_43363871/article/details/106716737
        }
      } catch (error) {
        console.log(error);
        this.overlay = false;
      }
    },
    file2Xce(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = e.target.result;
          this.wb = XLSX.read(data, {
            type: "binary",
          });
          const result = [];
          const sheet2JSONOpts = {
            defval: "", //给defval赋值为空的字符串
          };
          this.wb.SheetNames.forEach((sheetName) => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(
                this.wb.Sheets[sheetName],
                sheet2JSONOpts //当excel内容为空时若不加此属性没有相应的字段，可以取消试试效果
              ),
            });
          });
          resolve(result);
        };
        reader.readAsBinaryString(file);
      });
    },
    }
  }
</script>
<style scoped>
 td{
    border-style: solid;
    border-width: 1.0pt;
  }
</style>