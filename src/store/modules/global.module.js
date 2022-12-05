import { setAuthHeaders } from '@/utils/axios';
import GlobalService from '../../services/global.service';
import { useToast } from 'vue-toastification';
import { checkStatus } from '@/utils/helper';

const toast = useToast();

export const global = {
  namespaced: true,
  state: {
    EnumDetails: null,
    Countries: null,
    States: null,
    companyCategory: null,
    jobTitles: null,
  },
  mutations: {
    Countries(state, payload) {
      state.Countries = payload;
    },
    States(state, payload) {
      state.States = payload;
    },
    Enum(state, payload) {
      state.EnumDetails = payload;
    },
    setCompanyCategory(state, payload) {
      state.companyCategory = payload;
    },
    setJobTitles(state, payload) {
      state.jobTitles = payload;
    },
  },
  actions: {
    async getEnums({ commit }) {
      const res = await GlobalService.getEnum();
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      commit('Enum', res.data.data);

      return res.data.data;
    },
    async getCountries({ commit }) {
      const res = await GlobalService.getCountries();
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      commit('Countries', res.data.data);
      return res.data.data;
    },
    async getStates({ commit }, credential) {
      const res = await GlobalService.getStates(credential);
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      commit('States', res.data.data);
      return res.data.data;
    },
    async getCompanyCategory({ commit }) {
      const res = await GlobalService.getCompanyCategory();
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      commit('setCompanyCategory', res.data.data);
      return res.data.data;
    },
    async getJobTitles({ commit }) {
      const res = await GlobalService.getJobTitles();
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      commit('setJobTitles', res.data.data);
      return res.data.data;
    },
    async getAllJobs({ commit }) {
      const res = await GlobalService.getAllJobs();
      // if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      return res.data.data;
    },
    async getSingleJob({ commit }, credential) {
      const res = await GlobalService.getSingleJob(credential);
      // if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      return res.data.data;
    },
    async applyToJob({ commit }, credential) {
      console.log(credential);
      const res = await GlobalService.applyToJob(credential);
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      return res.data.data;
    },
    async getAllApplications({ commit }) {
      const res = await GlobalService.getAllApplications();
      // if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      return res.data.data;
    },
    async getSingleApplication({ commit }, credential) {
      const res = await GlobalService.getSingleApplication(credential);
      if (!checkStatus(res.data.status)) throw Error(res.data.err_message);
      return res.data.data;
    },
  },
};
