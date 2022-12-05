export default (to, from, next) => {
  let token = localStorage.getItem('token');
  if (!token) {
    next({ name: 'Login' });
    return false;
  }
};
