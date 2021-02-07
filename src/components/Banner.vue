<template>
  <v-carousel
    cycle
    height="200"
    hide-delimiters
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        src:
          "https://726f-robot-1gk2vy2q8735f96a-1258099036.tcb.qcloud.la/image/4.png",
      },
      {
        src:
          "https://726f-robot-1gk2vy2q8735f96a-1258099036.tcb.qcloud.la/image/3.png",
      },
    ],
  }),
};
</script>