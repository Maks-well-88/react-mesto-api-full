class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}

	_getResponce(apiResult) {
		return apiResult.then(response => {
			return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
		});
	}

	getInfo() {
		return this._getResponce(
			fetch(`${this._url}/users/me`, {
				headers: this._headers,
			})
		);
	}

	renderInitialCards() {
		return this._getResponce(
			fetch(`${this._url}/cards`, {
				headers: this._headers,
			})
		);
	}

	editProfile(body) {
		return this._getResponce(
			fetch(`${this._url}/users/me`, {
				method: 'PATCH',
				headers: this._headers,
				body: JSON.stringify(body),
			})
		);
	}

	addNewCard(body) {
		return this._getResponce(
			fetch(`${this._url}/cards`, {
				method: 'POST',
				headers: this._headers,
				body: JSON.stringify(body),
			})
		);
	}

	removeCard(cartId) {
		return this._getResponce(
			fetch(`${this._url}/cards/${cartId}`, {
				method: 'DELETE',
				headers: this._headers,
			})
		);
	}

	changeLikeStatusCard(cartId, isLiked) {
		if (isLiked) {
			return this._getResponce(
				fetch(`${this._url}/cards/${cartId}/likes`, {
					method: 'DELETE',
					headers: this._headers,
				})
			);
		}
		return this._getResponce(
			fetch(`${this._url}/cards/${cartId}/likes`, {
				method: 'PUT',
				headers: this._headers,
			})
		);
	}

	changeAvatarImage(avatarUrl) {
		return this._getResponce(
			fetch(`${this._url}/users/me/avatar`, {
				method: 'PATCH',
				headers: this._headers,
				body: JSON.stringify({ avatar: avatarUrl }),
			})
		);
	}
}

export const api = new Api({
	url: 'https://nomoreparties.co/v1/cohort-50',
	headers: {
		authorization: 'b0180cd6-e00d-4c46-af25-2755ea60dd90',
		'content-type': 'application/json',
	},
});
