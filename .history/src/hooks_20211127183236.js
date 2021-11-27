import * as cookie from 'cookie';
import * as api from '$lib/api';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');
	let user = cookies.jwt && Buffer.from(cookies.jwt.split('.')[1], 'base64').toString('utf-8');

	console.log(user);

	user = user ? JSON.parse(user) : null;

	request.locals.jwt = cookies.jwt;

	console.log('COOKIES');
	console.log(cookies.jwt);

	if (user) {
		console.log(`users/${user.id}`);
		// user = await api.get(`users/${user.id}`, cookies.jwt);

		const opts = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${cookies.jwt}`
			}
		};

		user = fetch(`http://pop:1337/users/${user.id}`, opts);

		console.log('request.locals.user');
		console.log(user);
		request.locals.user = user;
	}

	return await resolve(request);
}

export function getSession({ locals }) {
	return {
		jwt: locals.jwt,
		user: locals.user
	};
}
