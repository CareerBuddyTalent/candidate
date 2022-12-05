import { axiosInstance } from '@/utils/axios';
class GlobalService {
  async getEnum() {
    return await axiosInstance.get('misc/enums');
  }
  async getJobTitles() {
    return await axiosInstance.get('misc/job-titles');
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
  async getAllApplications() {
    return await axiosInstance.get('candidate/applications');
  }
  async getSingleApplication(id) {
    return await axiosInstance.get(`candidate/applications/${id}`);
  }
  async applyToJob(data) {
    console.log(data);
    return await axiosInstance.post(`candidate/job-pools/${data.id}/apply`, { note: data.note });
  }
}
export default new GlobalService();
