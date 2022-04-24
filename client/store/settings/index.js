export const mutations = {
  setMeta(state, meta) {
    state.meta = meta
  }
}

export const actions = {
  async getMeta({ commit }) {
    const { data } = await this.$axios.get('/settings')
    commit('setMeta', data)
  }
}

export const state = () => ({
  meta: {}
})
