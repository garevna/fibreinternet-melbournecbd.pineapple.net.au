/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {
  userInfo: {
    name: '',
    email: '',
    phone: ''
  },
  mailEndpoint: 'https://api.pineapple.net.au/email/landing',
  emailSubject: '',
  emailText: 'Thank you for your interest in Pineapple NET! A member of our team will be in touch shortly.',
  errors: {
    name: false,
    email: false,
    phone: false
  }
}

const getters = {
  pages: (state, getters, rootState) => rootState.pages.filter(item => item !== 'Contact Us'),
  selectors: (state, getters, rootState) => rootState.selectors.filter(item => item !== '#footer')
}

const mutations = {
  UPDATE_USER_INFO: (state, payload) => { state.userInfo[payload.prop] = payload.value },
  UPDATE_EMAIL_SUBJECT: (state, payload) => { state.emailSubject = payload },
  UPDATE_EMAIL_TEXT: (state, payload) => { state.emailText = payload },
  CREATE_MESSAGE: (state) => {
    const phone = state.userInfo.phone ? `<h4>Phone: ${state.userInfo.phone}</h4>` : ''
    state.messageForMail = `
      <p>${state.emailText}</p>
      <h3>Your name: ${state.userInfo.name}</h3>
      <h4>Your email: ${state.userInfo.email}</h4>
      ${phone}
    `
  },
  CLEAR_ALL_FIELDS: (state) => {
    state.userInfo = {
      name: '',
      email: '',
      phone: ''
    }
    state.errors = {
      name: false,
      email: false,
      phone: false
    }
  }
}

const actions = {

  async SEND_EMAIL ({ state, commit }, data) {
    const response = await (await fetch(state.mailEndpoint, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })).json()
    console.log(response)
    return true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
