<template>
  <v-row justify="center">
      <v-dialog v-model="opened" persistent max-width="290">
        <v-card class="pa-6">
          <v-card-title>
            <h2 color="primary">Thanks!</h2>
          </v-card-title>
          <v-card-text>
            <p>We'll get back to you shortly</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                  class="submit-button"
                  dark
                  width="80"
                  text @click="$emit('update:opened', false)"
            >
              CLOSE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<style scoped>
h2 {
  color: #4CAF50;
}
/* .submit-button {
  color: #fff!important;
} */
</style>

<script>
export default {
  name: 'Popup',
  props: ['opened']
}
</script>
