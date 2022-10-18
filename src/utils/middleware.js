export default (to, from, next) => {
  let token = localStorage.getItem('token');
  let uid = localStorage.getItem('uid');
  let client = localStorage.getItem('client');
  if (!token || !uid || !client) {
    next({ name: 'Login' });
    return false;
  }
};
