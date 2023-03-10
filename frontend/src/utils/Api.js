class Api {
   constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
   }

   _request(url, options) {
      return fetch(url, options).then(this._getRequestData());
   }

   _getRequestData() {
      return (res) => {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Произошла ошибка, код ошибки: ${res.status}`);
      };
   }

   getUserInfoByRequest() {
      return this._request(`${this._url}users/me`, {
         method: 'GET',
         credentials: 'include',
         headers: this._headers,
      });
   }

   getInitialCards() {
      return this._request(`${this._url}cards`, {
         method: 'GET',
         credentials: 'include',
         headers: this._headers,
      });
   }

   patchProfileInfo(profileInfo) {
      return this._request(`${this._url}users/me`, {
         method: 'PATCH',
         credentials: 'include',
         headers: this._headers,
         body: JSON.stringify(profileInfo),
      });
   }

   postNewPhoto(newPhoto) {
      return this._request(`${this._url}cards`, {
         method: 'POST',
         credentials: 'include',
         headers: this._headers,
         body: JSON.stringify(newPhoto),
      });
   }

   deleteCard(cardId) {
      return this._request(`${this._url}cards/${cardId}`, {
         method: 'DELETE',
         credentials: 'include',
         headers: this._headers,
      });
   }

   changeLikeCardStatus(cardId, isLiked) {
      return isLiked ? this.putLike(cardId) : this.deleteLike(cardId);
   }

   putLike(cardId) {
      return this._request(`${this._url}cards/${cardId}/likes`, {
         method: 'PUT',
         credentials: 'include',
         headers: this._headers,
      });
   }

   deleteLike(cardId) {
      return this._request(`${this._url}cards/${cardId}/likes`, {
         method: 'DELETE',
         credentials: 'include',
         headers: this._headers,
      });
   }

   patchProfileAvatar(newAvatar) {
      return this._request(`${this._url}users/me/avatar`, {
         method: 'PATCH',
         credentials: 'include',
         headers: this._headers,
         body: JSON.stringify(newAvatar),
      });
   }
}

export const api = new Api({
   url: 'https://api.manovieta.nomoredomains.club/',
   headers: {
      'Content-type': 'application/json',
   },
});
