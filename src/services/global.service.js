import { axiosInstance } from '@/utils/axios';
class GlobalService {
  async getEnum() {
    return await axiosInstance.get('misc/enums');
  }
  async getCountries() {
    return await axiosInstance.get('misc/countries');
  }
  async getStates(country) {
    return await axiosInstance.get(`misc/countries/${country}/states`);
  }
  async getCompanyCategory() {
    return await axiosInstance.get('misc/company-categories');
  }
  async getAllJobs() {
    return await axiosInstance.get('candidate/job-pools');
  }
  async getSingleJob(job) {
    return await axiosInstance.get(`candidate/job-pools/${job}`);
  }
}
export default new GlobalService();
