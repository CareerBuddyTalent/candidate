import { createStore } from 'vuex';
import { auth } from './modules/auth.module';
import { global } from './modules/global.module';
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
export default createStore({
  state: {},
  mutations: {
    logout(state) {
      state = null;
      localStorage.clear();
    },
  },
  actions: {
    async logout({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('vuex');
      localStorage.clear();
      commit('logout');
    },
  },
  modules: { auth, global },
  plugins: [vuexLocal.plugin],
});
