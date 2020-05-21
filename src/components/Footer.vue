<template>
  <v-container fluid fill-height class="homefone" style="position: relative; margin-bottom: -10px; margin-top: 50px;">
    <FooterFone :footerHeight="footerHeight" />
    <v-container fluid class="footer--top-content" :style="{ top: topContentTop }">
      <v-row align="start" justify="center" style="top: 0; width: 100%; max-width: 1200px" class="mx-auto">
        <v-card-title>
          <h2 class="white-text centered">{{ footer.title }}</h2>
        </v-card-title>
        <v-card-text max-width="100%">
          <h5 class="white-text centered">
              {{ footer.text }}
          </h5>
        </v-card-text>
        <v-row align="center" justify="center" style="max-width: 1200px" class="mx-auto my-0">

          <InputElement label="Name" :value.sync="name" :rules="[rules.required]" />
          <InputElement label="Email" :value.sync="email" :rules="[rules.required, rules.email]" />
          <InputElement label="Phone" :value.sync="phone" :rules="[rules.phone]" />

          <v-col cols="12" sm="4" md="3" class="mx-auto my-0 text-center">
            <v-card flat class="transparent mx-auto my-0 py-0 text-center">
              <v-btn
                    height="53"
                    max-width="280"
                    min-width="280"
                    dense
                    hide-details
                    rounded
                    light
                    @click="submit"
                    style="color: #20731C"
                    class="mx-auto"
              >{{ footer.button }}</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
    <FooterBottomContent v-if="viewportWidth >= 770" />
    <!-- <FooterBottomContentSmall  v-if="viewportWidth < 770" class="footer--bottom-content-small"/> -->
    <Popup :opened.sync="popupOpened" />
    <PopupError :opened.sync="popupErrorOpened" />
  </v-container>
</template>

<style>

.footer--top-content {
  position: absolute;
  width: 100%;
}

.footer--bottom-content-small {
  position: absolute;
  bottom: 40px;
  left: 0;
}

.title {
  margin-top: 198px;
}

.white-text {
  color: #fff;
}

.centered {
  text-align: center;
}
.icon {
  display: inline-block;
  width: 10px;
  margin-right: 10px;
}

.left-16 {
  font-size: 16px;
  font-weight: 900;
  text-align: left;
  color: #fff;
}
.left-14 {
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  color: #fff;
}

.ref {
  text-decoration: none;
  cursor: pointer;
}
.ref:hover {
  color: #E5FDD7;
}

</style>

<script>

import { mapState, mapActions } from 'vuex'

import FooterFone from '@/components/footer/FooterFone.vue'
import FooterBottomContent from '@/components/footer/BottomContent.vue'
import InputElement from '@/components/footer/InputElement.vue'
// import FooterBottomContentSmall from '@/components/footer/BottomContentSmall.vue'

import Popup from '@/components/contact/Popup.vue'
import PopupError from '@/components/contact/PopupError.vue'

const emailValidator = require('email-validator')

export default {
  name: 'Footer',
  components: {
    FooterFone,
    // FooterBottomContentSmall,
    FooterBottomContent,
    InputElement,
    Popup,
    PopupError
  },
  props: ['user', 'page'],
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      send: false,
      rules: {
        required: value => !!value || 'Required',
        email: () => emailValidator.validate(this.email) ? true : 'Invalid email',
        phone: value => value.match(/^[0-9]*$/gm) ? true : 'Invalid phone number'
      },
      popupOpened: false,
      popupErrorOpened: false
    }
  },
  computed: {
    ...mapState(['viewportWidth']),
    ...mapState('content', ['footer', 'emailSubject', 'emailText']),
    topContentTop () {
      return this.viewportWidth < 420 ? '80px' : this.viewportWidth > 1904 ? '288px' : '198px'
    },
    topContentFont () {
      return this.viewportWidth < 420 ? '80px' : this.viewportWidth > 1904 ? '288px' : '198px'
    },
    footerHeight () {
      return this.viewportWidth < 420 ? 680 : this.viewportWidth > 1904 ? 980 : 860
    }
  },
  methods: {
    ...mapActions('contact', { sendEmail: 'SEND_EMAIL' }),
    initFields () {
      this.name = ''
      this.email = ''
      this.phone = ''
    },
    submit () {
      if (!this.name || !this.phone.match(/^[0-9]*$/gm) || !emailValidator.validate(this.email)) {
        this.popupErrorOpened = true
        return
      }
      this.popupOpened = true
      this.sendEmail({
        subject: this.emailSubject,
        email: this.email,
        message: `
          <p>${this.emailText}</p>
          <hr>
          <h3>Name: ${this.name}</h3>
          <h4>Email: ${this.email}</h4>
          <h4>Phone: ${this.phone}</h4>
          <hr>
          <p>Get promo code!</p>
        `
      })
      this.initFields()
    }
  }
}
</script>
