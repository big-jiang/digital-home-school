<template>
  <div class="home">
    <Banner />

    <Toolbar />

    <Model />

    <Record />
  </div>
</template>

<script>
// @ is an alias to /src
import Record from "@/components/Record.vue";
import Model from "@/components/Model.vue";
import Toolbar from "@/components/Toolbar.vue";
import Banner from "@/components/Banner.vue";

export default {
  name: "Home",
  components: {
    Banner,
    Record,
    Model,
    Toolbar,
  },
  data: () => ({}),
  created() {
    console.log(200);
    //this.getData();
  },
};
</script>
