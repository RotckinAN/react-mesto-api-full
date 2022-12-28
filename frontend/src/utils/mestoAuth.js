export const BASE_URL = 'https://auth.nomoreparties.co';

const request = (url, options) => {
    return fetch(url, options).then(getRequestData())
}

const getRequestData = () => {
    return (res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Произошла ошибка, код ошибки: ${res.status}. Причина: ${res.statusText}`)
    }
}

export const register = ({email, password}) => {
    return request(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email})
        })
        .then((res) => {
            return res
            })
        .catch((err) => console.error(err));
}

export const authorize = ({email, password}) => {
    return request(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email})
    })
        .then((res) => {
            return res
        })
        .catch((err) => console.error(err));
}

export const checkToken = (JWT) => {
    return request(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${JWT}`
        }
    })
        .then((res) => {
            return res
        })
        .catch((err) => console.error(err));
}