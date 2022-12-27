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
			headers: {
				'Origin': 'https://cool-mesto.students.nomoredomains.club',
				'Authorization': `Bearer ${token}`,
				'Access-Control-Request-Headers': 'Authorization',
			},
		})
			.then(response => {
				return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
			})
			.catch(error => console.error(error));
	}
}

export const auth = new Auth({
	url: 'https://api.cool-mesto.students.nomoredomains.club',
	headers: {
		'Content-Type': 'application/json',
		'Origin': 'https://cool-mesto.students.nomoredomains.club',
		'Access-Control-Request-Headers': 'Content-Type',
	},
});
