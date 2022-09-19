export const URL = 'http://localhost:8080/api/';

export const setLocalStorage = (data) => {
  if (data.token) {
    localStorage.setItem('logindata', JSON.stringify(data));
  }
  return data;
};

export const authHeader = () => {
  const logindata = JSON.parse(localStorage.getItem('logindata'));
  if (logindata && logindata.token) {
    console.log(logindata.token);
    return { Authorization: 'Bearer ' + logindata.token };
  }
  return {};
};
