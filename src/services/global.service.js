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
  async getSingleJob(id) {
    return await axiosInstance.get(`candidate/job-pools/${id}`);
  }
  async applyToJob(data) {
    console.log(data);
    return await axiosInstance.post(`candidate/job-pools/${data.id}/apply`, { note: data.note });
  }
}
export default new GlobalService();
