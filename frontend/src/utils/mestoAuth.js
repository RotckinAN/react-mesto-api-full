export const BASE_URL = 'https://api.manovieta.nomoredomains.club';

const request = (url, options) => fetch(url, options).then(getRequestData());

const getRequestData = () => (res) => {
   if (res.ok) {
      return res.json();
   }
   return Promise.reject(`Произошла ошибка, код ошибки: ${res.status}. Причина: ${res.statusText}`);
};

export const register = ({email, password}) => request(`${BASE_URL}/signup`, {
   method: 'POST',
   credentials: 'include',
   headers: {
      'Content-Type': 'application/json',
   },
   body: JSON.stringify({password, email}),
})
   .then((res) => res)
   .catch((err) => console.error(err));

export const authorize = ({email, password}) => request(`${BASE_URL}/signin`, {
   method: 'POST',
   credentials: 'include',
   headers: {
      'Content-Type': 'application/json',
   },
   body: JSON.stringify({password, email}),
})
   .then((res) => res)
   .catch((err) => console.error(err));

export const checkToken = () => request(`${BASE_URL}/users/me`, {
   method: 'GET',
   credentials: 'include',
   headers: {
      'Content-Type': 'application/json',
   },
})
   .then((res) => res)
   .catch((err) => console.error(err));

export const logOut = () => request(`${BASE_URL}/signout`, {
   method: 'GET',
   credentials: 'include',
   headers: {
      'Content-Type': 'application/json',
   },
})
   .then((res) => res)
   .catch((err) => console.error(err));
