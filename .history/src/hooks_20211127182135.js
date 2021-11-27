import * as cookie from 'cookie';
import * as api from '$lib/api';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');
	let user = cookies.jwt && Buffer.from(cookies.jwt.split('.')[1], 'base64').toString('utf-8');
	user = user ? JSON.parse(user) : null;

	request.locals.jwt = cookies.jwt;

	console.log('COOKIES');
	console.log(cookies.jwt);

	if (user) {
		console.log(`users/${user.id}`);
		user = await api.get(`users/${user.id}`, cookies.jwt);
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
