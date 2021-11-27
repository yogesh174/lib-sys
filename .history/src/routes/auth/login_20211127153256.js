import * as api from '$lib/api';
import { respond } from './_respond.js';

export async function post(request) {
	const body = await api.post('auth/local', {
		identifier: request.body.identifier,
		password: request.body.password
	});

	console.log('Body');
	console.log(body);

	return respond(body);
}
