import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'https://api.pineapple.net.au',
    officeAddress: '75 Brighton Road, Elwood VIC 3184',
    officePhone: '1300 857 501',
    officeEmail: 'info@pineapple.net.au',
    officeABN: '55 618 934 437',
    linkedIn: 'https://www.linkedin.com/company/pineapplenet/',
    faceBook: 'https://www.facebook.com/PineappleNetAU/',
    contactEndpoint: '',
    viewport: 'lg',
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    pages: [],
    selectors: [],
    plan: 'residential'
  },
  modules,

  mutations: {
    CHANGE_VIEWPORT: (state) => {
      state.viewportWidth = window.innerWidth
      state.viewportHeight = window.innerHeight
    },

    CHANGE_PLAN: (state, plan) => { state.plan = plan },
    SET_PROPERTY: (state, payload) => {
      Vue.set(payload.object, payload.propertyName, payload.value)
    },
    DELETE_PROPERTY: (state, payload) => {
      Vue.delete(payload.object, payload.propertyName)
    }
  },
  actions: {
  }
})
