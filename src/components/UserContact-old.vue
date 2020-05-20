<template>
  <v-card class="user-info mx-auto pa-6 homefone" width="480">
    <v-card-title>
      <h4>{{ userForm.title }}</h4>
    </v-card-title>
    <v-card-text class="mx-0 px-0" width="100%">
      <div v-for="(item, prop) in items" :key="prop">
        <v-text-field
            v-if="item.show"
            :placeholder="item.placeholder"
            outlined
            dense
            hide-details
            height="32"
            :color="item.color"
            v-model="item.value"
            class="user-inputs"
            :error="item.error"
            :append-icon="item.validationIcon"
            @input="validate(item)"
        ></v-text-field>
      </div>
      <v-select v-if="show.state"
          :items="['VIC', 'NSW', 'ACT', 'QLD', 'SA', 'WA', 'TAS', 'NT']"
          outlined
          v-model="state"
          label="State"
        ></v-select>

        <v-select v-if="show.building"
            :items="['Aurora', 'QV1', 'Conservatory']"
            outlined
            hide-details
            style="margin-top:16px;"
            v-model="building"
            label="Building*"
        ></v-select>

        <v-select v-if="show.promocode"
            :items="['FREEINTERNETAURORA', 'FREEINTERNETCONSERVATORY', 'FREEINTERNETQV1']"
            outlined
            hide-details
            style="margin-top:16px;"
            v-model="promocode"
            label="Promocode?*"
        ></v-select>

      <v-textarea
            :placeholder="userForm.messagePlaceholder"
            outlined
            :label="userForm.messagePlaceholder"
            color="#656565"
            style="margin-top:16px;"
            auto-grow
            v-model="message"
            class="user-inputs"
      ></v-textarea>
    </v-card-text>
    <v-card-actions class="text-center">
      <v-btn
          color="buttons"
          dark
          rounded
          min-width="300"
          width="100%"
          height="48"
          class="submit-button px-auto mx-auto"
          @click="sendUserRequest"
      >
        {{ userForm.button }}
      </v-btn>
    </v-card-actions>
    <Popup :opened.sync="popupOpened" />
    <PopupError :opened.sync="popupErrorOpened" />
  </v-card>
</template>

<style scoped>

.v-text-field.v-text-field--enclosed {
  margin-bottom: 4px!important;
}

.user-info {
  width: 640px;
  padding-left: 80px;
  border-radius: 15px!important;
}
h4 {
  width: 100%;
  text-align: center;
  margin-top: 0;
  margin-bottom: 8px;
}
.user-inputs {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #656565;
}

@media screen and (max-width: 600px) {
  .v-btn__content {
    font-size: 16px!important;
  }
  .user-info {
    width: 480px!important;
    padding-left: 40px;
  }
  .user-inputs {
    font-size: 14px;
  }
}
@media screen and (max-width: 320px) {
  .user-info {
    width: 300px!important;
    padding-left: 0px;
  }
  .user-inputs {
    font-size: 13px;
  }
}
</style>

<script>

import { mapState, mapActions } from 'vuex'

import Popup from '@/components/Popup.vue'
import PopupError from '@/components/PopupError.vue'

const emailValidator = require('email-validator')

export default {
  name: 'UserContact',
  components: {
    Popup,
    PopupError
  },
  data () {
    return {
      message: '',
      normalColor: '#656565',
      errorColor: '#FF0E00',
      popupOpened: false,
      popupErrorOpened: false,
      items: {
        name: {
          value: '',
          show: true,
          placeholder: 'Full name*',
          error: false,
          color: '',
          validationIcon: '',
          validator () { this.error = this.value.length < 2 }
        },
        email: {
          value: '',
          show: true,
          placeholder: 'Email*',
          error: false,
          color: '',
          validationIcon: '',
          validator () {
            this.error = !emailValidator.validate(this.value)
            this.validationIcon = this.error ? '$invalid' : '$valid'
            this.color = this.error ? '#FF0E00' : '#656565'
          }
        },
        address: {
          value: '',
          show: false,
          placeholder: 'Address*',
          error: false,
          color: '',
          validationIcon: '',
          validator () { this.error = this.value.length < 5 }
        },
        postcode: {
          value: '',
          show: false,
          placeholder: 'Postcode*',
          error: false,
          color: '',
          validationIcon: '',
          validator () {
            this.error = !Number(this.value) || Number(this.value) < 3000 || Number(this.value) > 9999
          }
        },
        phone: {
          value: '',
          show: true,
          placeholder: 'Phone',
          error: false,
          color: ''
        }
      },
      state: '',
      building: '',
      promocode: '',
      show: {
        state: false,
        building: true,
        promocode: true
      }
    }
  },
  computed: {
    ...mapState('content', ['userForm', 'emailSubject', 'emailText'])
  },
  methods: {
    ...mapActions('contact', { sendEmail: 'SEND_EMAIL' }),
    initFields () {
      for (const item in this.items) {
        this.items[item].validationIcon = ''
        this.items[item].error = false
        this.items[item].color = this.normalColor
        this.items[item].value = ''
        this.state = ''
        this.building = ''
        this.promocode = ''
      }
      this.state = null
      this.message = ''
    },
    validate (item) {
      if (!item.validator) return
      item.validator()
      item.validationIcon = item.error ? '$invalid' : '$valid'
      item.color = item.error ? this.errorColor : this.normalColor
    },

    findErrors () {
      let errorsCounter = 0
      for (const item in this.items) {
        if (this.items[item].show) {
          this.validate(this.items[item])
          errorsCounter += this.items[item].error
        }
      }
      return errorsCounter > 0
    },

    async sendUserRequest () {
      if (this.findErrors()) {
        this.popupErrorOpened = true
        return
      }
      this.popupOpened = true
      const phone = this.items.phone.show ? `<h4>Phone: ${this.items.phone.value}</h4>` : ''
      const address = this.items.address.show ? `<p>Address: ${this.items.address.value}</p>` : ''
      const postcode = this.items.postcode.show ? `<p>Postcode: ${this.items.postcode.value}</p>` : ''
      const state = this.show.state ? `<p>State: ${this.state}</p>` : ''
      const building = this.show.building ? `<p>Building: ${this.building}</p>` : ''
      const promocode = this.show.promocode ? `<p>Promocode: ${this.promocode}</p>` : ''
      const message = `
        <p>${this.emailText}</p>
        <h3>Your name: ${this.items.name.value}</h3>
        <h4>Your email: ${this.items.email.value}</h4>
        ${phone}
        <fieldset>
          <legend>Details:</legend>
          ${address}
          ${postcode}
          ${state}
          ${building}
          ${promocode}
        </fieldset>
        <h4>Your message:</h4>
        <p>${this.message.split('\n').join('<br>')}</p>
      `
      this.sendEmail({
        subject: this.emailSubject,
        email: this.items.email.value,
        message
      })

      this.initFields()
    }
  },
  mounted () {
    this.initFields()
  }
}

</script>
