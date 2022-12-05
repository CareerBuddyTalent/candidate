import { axiosInstance } from '@/utils/axios';
class AuthService {
  async login(user) {
    return await axiosInstance.post('auth/login', user);
  }
  async register(user) {
    return await axiosInstance.post('auth/register', user);
  }
  async forgetPasswordRequestOtp(user) {
    return await axiosInstance.post('auth/forgot-password/request-otp', user);
  }
  async forgetPasswordVerifyOtp(details) {
    return await axiosInstance.post('auth/forgot-password/verify-otp', details);
  }
  async forgetPasswordReset(details) {
    return await axiosInstance.post('auth/forgot-password/reset', details);
  }
  async resetPassword(details) {
    return await axiosInstance.post('candidate/profile/security/password', details);
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
  async updateUserProfile(details) {
    return await axiosInstance.post('candidate/profile', details);
  }
  async updateUserPreference(details) {
    return await axiosInstance.post('candidate/profile/job-preference', details);
  }
  async updateUserResume(details) {
    return await axiosInstance.post('candidate/profile/resume', details);
  }
}
export default new AuthService();
