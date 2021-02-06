<template>
<v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
</template>
<script>
export default {
  name: "my-overlay",
  props: {
    overlay: {
      default: false,
      type: Boolean,
    },
  },
};
</script>