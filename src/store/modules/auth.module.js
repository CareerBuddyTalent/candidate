import { setAuthHeaders } from '@/utils/axios';
import AuthService from '../../services/auth.service';
import { useToast } from 'vue-toastification';
import { checkStatus } from '@/utils/helper';

const toast = useToast();
// const user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: {
    userDetails: null,
  },
  mutations: {
    registerSuccess(state, payload) {
      state.userDetails = payload;
    },
    loginSuccess(state, payload) {
      state.userDetails = payload;
    },
    logout(state) {
      state.userDetails = null;
    },

    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
  actions: {
    async login({ commit }, credential) {
      const res = await AuthService.login(credential);
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      commit('loginSuccess', res.data.data);
      localStorage.setItem('uid', res.headers.uid);
      localStorage.setItem('token', res.headers['access-token']);
      localStorage.setItem('client', res.headers.client);
      setAuthHeaders();
      return res;
    },
    async register({ commit }, credential) {
      const res = await AuthService.register(credential);
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      commit('registerSuccess', res.data.data);
      localStorage.setItem('uid', res.headers.uid);
      localStorage.setItem('token', res.headers['access-token']);
      localStorage.setItem('client', res.headers.client);
      setAuthHeaders();
      return res;
    },
    async logout({ commit }) {
      const res = await AuthService.logout();
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      localStorage.removeItem('uid', res.headers.uid);
      localStorage.removeItem('token', res.headers['access-token']);
      localStorage.removeItem('client', res.headers.client);
      commit('logout');
    },
  },
};
