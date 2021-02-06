<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" color="primary" text top>
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: "my-snackbar",
  props: {
    text: {
      default: "默认提示",
      type: String,
    },
    timeout: {
      default: "3000",
      type: String,
    },
    isShow: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      snackbar: this.isShow,
    };
  },
};
</script>