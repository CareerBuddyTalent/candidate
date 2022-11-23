import { axiosInstance } from '@/utils/axios';
class AuthService {
  async login(user) {
    return await axiosInstance.post('auth/login', user);
  }
  async register(user) {
    return await axiosInstance.post('auth/register', user);
  }
  async onboardProfile(details) {
    return await axiosInstance.post('candidate/onboarding/profile', details);
  }
  async onboardPreference(details) {
    return await axiosInstance.post('candidate/onboarding/job-preference', details);
  }
  async onboardResume(details) {
    return await axiosInstance.post('candidate/onboarding/resume', details);
  }
  async getUser() {
    return await axiosInstance.get('candidate/profile');
  }
  async updateUserProfile() {
    return await axiosInstance.post('candidate/profile');
  }
}
export default new AuthService();
