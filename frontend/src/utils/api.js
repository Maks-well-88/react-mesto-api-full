class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
		this._headersWithMethods = config.headersWithMethods;
	}

	_getResponce(apiResult) {
		return apiResult.then(response => {
			return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
		});
	}

	getInfo() {
		return this._getResponce(
			fetch(`${this._url}/users/me`, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Origin': 'https://cool-mesto.students.nomoredomains.club',
					'Access-Control-Request-Headers': 'Authorization',
				},
			})
		);
	}

	renderInitialCards() {
		return this._getResponce(
			fetch(`${this._url}/cards`, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Origin': 'https://cool-mesto.students.nomoredomains.club',
					'Access-Control-Request-Headers': 'Authorization',
				},
			})
		);
	}

	editProfile(body) {
		return this._getResponce(
			fetch(`${this._url}/users/me`, {
				method: 'PATCH',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Content-type': 'application/json',
					'Origin': 'https://cool-mesto.students.nomoredomains.club',
					'Access-Control-Request-Headers': 'Content-Type, Authorization',
				},
				body: JSON.stringify(body),
			})
		);
	}

	addNewCard(body) {
		return this._getResponce(
			fetch(`${this._url}/cards`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Content-type': 'application/json',
					'Origin': 'https://cool-mesto.students.nomoredomains.club',
					'Access-Control-Request-Headers': 'Content-Type, Authorization',
				},
				body: JSON.stringify(body),
			})
		);
	}

	removeCard(cartId) {
		return this._getResponce(
			fetch(`${this._url}/cards/${cartId}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Content-type': 'application/json',
					'Origin': 'https://cool-mesto.students.nomoredomains.club',
					'Access-Control-Request-Headers': 'Content-Type, Authorization',
				},
			})
		);
	}

	changeLikeStatusCard(cartId, isLiked) {
		if (isLiked) {
			return this._getResponce(
				fetch(`${this._url}/cards/${cartId}/likes`, {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`,
						'Content-type': 'application/json',
						'Origin': 'https://cool-mesto.students.nomoredomains.club',
						'Access-Control-Request-Headers': 'Content-Type, Authorization',
					},
				})
			);
		}
		return this._getResponce(
			fetch(`${this._url}/cards/${cartId}/likes`, {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Content-type': 'application/json',
					'Origin': 'https://cool-mesto.students.nomoredomains.club',
					'Access-Control-Request-Headers': 'Content-Type, Authorization',
				},
			})
		);
	}

	changeAvatarImage(avatarUrl) {
		return this._getResponce(
			fetch(`${this._url}/users/me/avatar`, {
				method: 'PATCH',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Content-type': 'application/json',
					'Origin': 'https://cool-mesto.students.nomoredomains.club',
					'Access-Control-Request-Headers': 'Content-Type, Authorization',
				},
				body: JSON.stringify({ avatar: avatarUrl }),
			})
		);
	}
}

export const api = new Api({ url: 'https://api.cool-mesto.students.nomoredomains.club'});
