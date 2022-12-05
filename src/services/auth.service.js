import { axiosInstance } from '@/utils/axios';
class AuthService {
  async login(user) {
    return await axiosInstance.post('auth/login', user);
  }
  async register(user) {
    return await axiosInstance.post('/auth/register', user);
  }
  async logout() {
    return await axiosInstance.delete('/auth/candidate/logout');
  }
  async getUser() {
    return await axiosInstance.get('/auth/candidate');
  }
}
export default new AuthService();
