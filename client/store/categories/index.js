export const mutations = {
  setData(state, data) {
    state.data = data
  }
}

export const actions = {
  async getData({ commit }) {
    const { data } = await this.$axios.get('/categories/?active=true')
    commit('setData', data)
  }
}

export const state = () => ({
  data: []
})
