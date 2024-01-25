import { createStore } from "vuex";
import auth from './modules/auth'
import user from './modules/user'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    user
  },
});
