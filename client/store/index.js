export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('settings/getMeta')
    await dispatch('categories/getData')
  }
}
