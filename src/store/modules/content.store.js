/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {}

const getters = {
  contentEndpoint: (state, getters, rootState) => `${rootState.host}/content/3`
}

const mutations = {}

const actions = {
  async GET_CONTENT ({ state, getters, commit, dispatch }) {
    const content = await (await fetch(getters.contentEndpoint)).json()
    for (const field in content) {
      commit('SET_PROPERTY', {
        object: state,
        propertyName: field,
        value: content[field]
      }, { root: true })
    }
    return state.browserTabTitle
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
