<template>
  <div>
    <h3>{{detail.title}}</h3>
    <div class="d-flex flex-column justify-space-between align-center my-8">
    <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="200"
        max-width="300"
        :src="detail.image"
        class="ml-20"
      ></v-img>
    </div>
    <p class="mx-4" v-for="(item,i) in detail.content.split('#')" :key="i">{{item}}</p>
  </div>
</template>

<script>
  export default {
    data: () => ({
      detail:{title:'',image:'',content:''}
    }),

    created () {
      console.log(this.$route)
      var md5 = this.$route.query.md5;
      this.getData(md5);
    },

    methods: {
    async getData(md5) {
      let task = await this.getArticleDetail({md5:md5,method:"getArticleDetail"});
      console.log(task);
      if(task.code){
        this.detail = task.res.data;
      }
    },
    getArticleDetail(requireData){
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

<style type="text/css">
p{ text-indent:2em;text-align:left;}
</style>
