<template>
    <v-container fluid>
      <v-row dense class="mt-2">
        <v-col
          v-for="(card,i) in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="70px"
              @click="showAlert(i)"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>

      <v-snackbar
      timeout="2000"
      v-model="snackbar"
      color="primary"
      top
      text
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      snackbar: false,
      text:'敬请期待！',
      cards: [
        { title: '专 题 系 列', src: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg', flex: 6 },
        { title: '互 动 问 答', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: '推 送 历 史', src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', flex: 12 },
      ],
    }),
    methods:{
      showAlert(i){
        if(i-2<0){
          this.snackbar = true;
        }
      }
    }
  }
</script>