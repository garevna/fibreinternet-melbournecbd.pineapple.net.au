<template>
  <v-col cols="12" sm="3" class="mx-auto my-0 text-center">
    <v-card flat class="transparent mx-auto my-0 py-0 text-center">
      <v-text-field
              height="48"
              class="input-field rounded transparent mx-auto"
              :label="label"
              hide-details
              rounded
              outlined
              dark
              color="#fff"
              v-model="val"
              :rules="rules"
      ></v-text-field>
    </v-card>
  </v-col>
</template>

<style scoped>

.rounded {
  border-radius: 40px!important;
}

.input-field {
  width: 280px;
  margin-top: -16px!important;
}

</style>

<script>
export default {
  name: 'InputElement',
  props: ['label', 'value', 'rules'],
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    }
  }
}
</script>
