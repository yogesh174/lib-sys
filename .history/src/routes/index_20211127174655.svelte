<script context="module">
	export async function load({ session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: `/login`
			};
		}

		const user = await api.get('users/me', session.jwt);

		if (user)
			return {props: {user}};

		return { error: 'Uh oh! Could not fetch data!' };
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<script>
	import { session } from '$app/stores';
	import * as api from '$lib/api';
	import { stringify } from 'postcss';
	import Icon from '@iconify/svelte';
	// export let user;
	let user = $session.user;
</script>

<div class="flex flex-col items-center justify-center">
	
	<div class="text-center lg:text-left my-20">
		<h1 class="mb-5 text-5xl font-bold">LibSys</h1>
		<p class="mb-5">
			LibSys is a complete library management system for adding, issuing, 
			and returning books.
		</p>
		<div class="mb-10">
			<p>Hello there!!!</p>
			<p>Checkout other products similar to this</p>
			<ul class="mx-5">
				<li><a href="http://" class="text-purple-300">Hostel management</a></li>
				<li><a href="http://" class="text-purple-300">Online tutorials</a></li>
			</ul>
		</div>
	</div>
</div>