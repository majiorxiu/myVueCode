const state = {
  menus: [],
}
const mutations = {
  ['SET_MENUS'] (state, data) {
    state.menus = data;
  }
}
const actions = {
  setMenus({commit} , data) {
    commit('SET_MENUS', data);
  }
}
export default {
  state,
  mutations,
  actions,
}