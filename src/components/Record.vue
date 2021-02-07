<template>
  <v-fade-transition mode="out-in">
    <v-timeline dense class="ml-n5">
      <v-timeline-item
        v-for="(item, i) in records"
        :key="i"
        class="mb-8"
        color="grey"
        icon-color="grey lighten-2"
        small
      >
        <v-row class="mr-4 elevation-0" justify="space-between" @click="jumpToDetail(item.md5)">
          <v-col cols="7">
            <v-img
              :src="item.image"
              :lazy-src="`https://picsum.photos/10/6?image=101`"
              max-height="100"
              max-width="160"
              aspect-ratio="1"
            ></v-img>
          </v-col>
          <v-col
            class="text-left my-auto grey--text darken-2"
            align-self="center"
            cols="5"
          >
            <v-row>{{ formatTime(item.sendTime) }}</v-row>
            <v-row>浏览量:{{ item.looked }}</v-row>
            <v-row>留言:***</v-row>
          </v-col>
          <v-col cols="12">
            <v-row>
          {{ item.title }}
            </v-row>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </v-fade-transition>
</template>

<script>
export default {
  data: () => ({
    records: [],
  }),
  created() {
    this.getData();
  },

  methods: {
    async getData() {
      let task = await this.getSendRecord({
        phone: this.$Global.phone,
        method: "getSendRecord",
      });
      if (task.code && task.res.data.length > 0) {
        this.records = task.res.data;
      }
    },
    getSendRecord(requireData) {
      return this.$axios
        .post(this.$Global.api, requireData)
        .then((res) => {
          return { code: 1, res: res };
        })
        .catch((error) => {
          // 请求失败处理
          return { code: 0, res: error };
        });
    },
    jumpToDetail(md5) {
      this.$router.push({ path: `/`, query: { md5: md5 } });
    },
    formatTime(timestamp) {
      return this.$Global.formatTime(timestamp);
    },
  },
};
</script>