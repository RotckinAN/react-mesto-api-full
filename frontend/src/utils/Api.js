class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers
    }

    _request(url, options) {
        return fetch(url, options).then(this._getRequestData())
    }

    _getRequestData() {
        return (res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка, код ошибки: ${res.status}`)
        }
    }

    getUserInfoByRequest() {
        return this._request(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers
        })
    }

    getInitialCards() {
        return this._request(`${this._url}cards`, {
            method: 'GET',
            headers: this._headers
        })
    }

    patchProfileInfo(profileInfo) {
        return this._request(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(profileInfo)
        })
    }

    postNewPhoto(newPhoto) {
        return this._request(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(newPhoto)
        })
    }

    deleteCard(cardId) {
        return this._request(`${this._url}cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.putLike(cardId) : this.deleteLike(cardId)
    }

    putLike(cardId) {
        return this._request(`${this._url}cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
    }

    deleteLike(cardId) {
        return this._request(`${this._url}cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    patchProfileAvatar(newAvatar) {
        return this._request(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(newAvatar)
        })
    }
}

export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-50/',
    headers: {
        authorization: 'd9722592-b388-4281-b273-bb490f84d549',
        'Content-type': 'application/json'
    }
});