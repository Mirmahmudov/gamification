export const setToken = (token) => {
  window.localStorage.setItem("codial_token", token);
};
export const getToken = () => {
  return window.localStorage.getItem("codial_token");
};
