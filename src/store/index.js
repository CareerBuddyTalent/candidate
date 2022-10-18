import { createStore } from 'vuex';
import { auth } from './modules/auth.module';
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth },
  plugins: [vuexLocal.plugin],
});
