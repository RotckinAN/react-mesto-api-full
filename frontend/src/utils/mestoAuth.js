export const BASE_URL = 'https://api.manovieta.nomoredomains.club';

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

export const checkToken = () => {
    return request(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'credentials': 'include'
            // "Authorization" : `Bearer ${JWT}`
        }
    })
        .then((res) => {
            return res
        })
        .catch((err) => console.error(err));
}