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
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
  actions: {
    async login({ commit }, credential) {
      const res = await AuthService.login(credential);
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      commit('loginSuccess', res.data.data.user);
      localStorage.setItem('token', res.data.data.authorisation.token);
      return res;
    },
    async register({ commit }, credential) {
      const res = await AuthService.register(credential);
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      commit('registerSuccess', res.data.data.user);
      localStorage.setItem('token', res.data.data.authorisation.token);
      return res;
    },
    async getUser({ commit, state }, credential) {
      if (credential.forceReload) {
        const res = await AuthService.getUser();
        if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
        commit('loginSuccess', res.data.data);
      }
      return state.userDetails;
    },
    async updateUserProfile({ commit }, credential) {
      const res = await AuthService.updateUserProfile(credential);
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      return res;
    },
    async onboardProfile({ commit }, credential) {
      const res = await AuthService.onboardProfile(credential);
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      return res;
    },
    async onboardPreference({ commit }, credential) {
      const res = await AuthService.onboardPreference(credential);
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      return res;
    },
    async onboardResume({ commit }, credential) {
      const res = await AuthService.onboardResume(credential);
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      return res;
    },
  },
};
