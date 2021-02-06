<template>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="60px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        { title: '专 题 系 列', src: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg', flex: 12 },
        { title: '互 动 问 答', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 12 },
        { title: '推 送 历 史', src: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg', flex: 12 },
      ],
    }),
  }
</script>