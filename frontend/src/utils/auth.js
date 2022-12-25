class Auth {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}

	register(body) {
		return fetch(`${this._url}/signup`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(body),
		})
			.then(response => {
				return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
			})
			.catch(error => console.error(error));
	}

	authorize(body) {
		return fetch(`${this._url}/signin`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(body),
		})
			.then(response => {
				return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
			})
			.catch(error => console.error(error));
	}

	getContent(token) {
		return fetch(`${this._url}/users/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then(response => {
				return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
			})
			.catch(error => console.error(error));
	}
}

export const auth = new Auth({
	url: 'https://auth.nomoreparties.co',
	headers: {
		'Content-Type': 'application/json',
	},
});
