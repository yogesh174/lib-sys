export function respond(body) {
	if (body.error || body.errors) {
		return { status: 401, body };
	}

	return {
		headers: {
			'set-cookie': `jwt=${body.jwt}; Path=/; HttpOnly`
		},
		body
	};
}
