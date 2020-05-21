<template>
<v-container fluid class="top-element">
  <v-card flat class="mx-auto homefone" width="100%" max-width="1920">
        <v-img :src="viewportWidth > 600 ? top.pictureURL : ''" width="1920" max-height="600" min-height="400" cover position="center">
          <v-row align="center" justify="center" style="height: 100%">
            <v-card
                  flat width="100%"
                  max-width="900"
                  class="transparent mx-auto"
            >
              <v-card-text class="text-center">
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
                    class="submit-button px-auto mx-auto"
                    @click="$emit('update:page', top.goto)"
                >
                    {{ top.button }}
                </v-btn>
              </v-card-text>
            </v-card>
          </v-row>
        </v-img>
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
  font-size: 20px;
}
h1, p {
  text-shadow: 0 0 3px #fff;
}
@media screen and (max-width: 500px) {
  .top-element {
    margin-top: 80px;
    margin-bottom: 48px;
  }
  p {
    font-size: 14px!important;
    line-height: 150%!important;
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
