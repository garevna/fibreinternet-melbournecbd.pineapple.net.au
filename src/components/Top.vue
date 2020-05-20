<template>
<v-container fluid class="top-element">
  <v-card flat class="mx-auto homefone" width="100%" max-width="1920">
    <v-row align="center" justify="center">
      <!-- <v-col cols="12" class="text-center mx-auto"> -->
        <v-img :src="top.pictureURL" width="1920">
          <v-card
                flat width="100%"
                max-width="900"
                class="transparent mx-auto"
          >
            <v-card-text class="text-center text-md-left">
              <h1 class="text-center">{{ top.header }}</h1>
            </v-card-text>
            <v-card-text class="mx-auto mx-lg-0">
              <p class="text-center">
                {{ top.text }}
              </p>
            </v-card-text>
            <v-card-text class="text-center">
              <v-btn
                  color="buttons"
                  dark
                  rounded
                  height="48"
                  class="submit-button px-auto mx-auto"
                  @click="$emit('update:page', top.goto)"
              >
                  {{ top.button }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-img>
      <!-- </v-col> -->
    </v-row>
  </v-card>
</v-container>
</template>

<style scoped>
.top-element {
  margin-top: 120px;
  margin-bottom: 64px;
  overflow-x: hidden;
}
p {
  line-height: 180%!important;
  font-weight: 600;
}
h1, p {
  text-shadow: 0 0 4px #fff;
}
@media screen and (max-width: 500px) {
  .top-element {
    margin-top: 80px;
    margin-bottom: 48px;
  }
}
</style>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Top',
  props: ['page'],
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('content', ['top'])
  }
}
</script>
