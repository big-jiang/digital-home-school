<template>
  <v-app>
    <v-app-bar 
      app
      color="#1E88E5"
      dark
    >
      <v-toolbar-title>数字家校平台</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-main class="align-center mx-auto mt-n16">
      <v-container class="pa-5">
    <v-row class="elevation-20" justify="center" align="center" style="width:1000px;height:500px;">   
<!-- <v-card-title>账号密码登录</v-card-title> -->
<!-- background-image:url('') -->
    <v-col 
    lg="5">
    <h3>账号密码登录</h3>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="account"
      :counter="11"
      :rules="[v => !!v || '请输入账号']"
      label="账号"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="[v => !!v || '请输入密码']"
      label="密码"
      required
      type="password"
    ></v-text-field>

    
    <v-btn
      :disabled="!valid"
      color="primary"
      width="180rpx"
      class="mr-4"
      @click="validate"
    >
      登录
    </v-btn>
  </v-form>
    </v-col>
    <v-col lg="5"> <v-img 
      :src="`https://picsum.photos/500/300?image=${2 * 5 + 10}`"
      :lazy-src="`https://picsum.photos/10/6?image=${2 * 5 + 10}`"
      height="280rpx"
      width="500rpx"
      ></v-img>
      <v-col 
        class="primary--text mb-n5"
        >
         <v-btn
              text
              @click="jumpHelp"
            >
              数字家校介绍文档
            </v-btn>
        </v-col>
      </v-col> 
    </v-row></v-container>
  </v-main>
  <v-footer
      v-bind="localAttrs"
    >
      <v-card
        flat
        tile
        width="100%"
        class="primary lighten-1 text-center"
      >
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} - 《 数字家校平台 》
        </v-card-text>
      </v-card>
    </v-footer>

  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      overlay:false,
      accountInfo:null,
      valid: true,
      account: '18258169721',
      accountRules: [
        v => (v && v.length < 10) || '无效账号',
      ],
      password: '',
      passwordRules: [
        v => (v && v.length < 6) || '无效密码',
      ],
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
      ],

    }),
    computed: {
      localAttrs () {
        const attrs = {fixed:true}
        return attrs
      },
    },
    methods:{
      validate () {
        this.overlay=true
        // this.$refs.form.validate()
        if(this.account&&this.password){
          this.login(this.account,this.password,'login')
        }else{this.$refs.form.validate();this.overlay=false}
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      async login(account, password,method) {
      var url = this.$Global.api;
      var requireData = {phone:account,password:password,method:method};
      // let result = await this.$Global.httpApi(requireData);
      // console.log(result);
      this.$axios
        .post(url, requireData)
        .then((res) => {
          console.log("学校信息", res.status);
          if(res.data.length>0){
              //赋值
              this.$Global.phone = res.data[0].phone;
              this.$Global.grade = res.data[0].type;
              this.$Global.permissions = res.data[0].permissions;
              localStorage.setItem('login',JSON.stringify(res.data[0]));
              //切换状态
              this.$emit('login');
          }else{alert("账号或密码有误，请重新输入");}
          this.overlay=false
          //this.account = res.data[0];
          //alert("发送成功");
        })
        .catch(function (error) {
          this.overlay=false
          // 请求失败处理
          console.log(error);
          
        });
    },
    jumpHelp(){
        window.open(this.$Global.docHelp,'_blank')
      }
    }
  }
</script>
