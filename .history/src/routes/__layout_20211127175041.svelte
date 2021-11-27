<script context="module">
	export async function load({ session }) {
		// const user = await api.get('users/me', session.jwt);

		if (user)
			return {props: {user}};
		return {error: 'Uh oh! Could not fetch data!'};
	}
</script>

<script>
	import Header from '$lib/header/Header.svelte';
	import SideBar from '$lib/header/SideBar.svelte';
	import '../app.css';
	import * as api from '$lib/api';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { post } from '$lib/utils.js';

	// export let user;
	let user = $session.user;

	async function logout() {
		await post(`auth/logout`);
		$session.user = null;
		// goto('/');
	}
	
</script>

<main class="flex flex-col h-screen">
	{#if user.firstName}
		<Header>
			<div class="avatar" slot="avatar">
				<div class="rounded-full w-10 h-10 m-auto bg-purple-400 text-center py-2">
					{user.firstName[0] + user.lastName[0]}
				</div>
			</div>
			
			<form on:submit|preventDefault={logout} slot="logout">
				<button type="submit" class="btn btn-primary mx-3">
					Logout
				</button>
			</form>
		</Header>
	
	{:else}
		<Header>
			<form on:submit|preventDefault={logout} slot="logout">
				<button type="submit" class="btn btn-primary mx-3">
					Logout
				</button>
			</form>
		</Header>
	{/if}
	
	<SideBar>
		<div class="drawer-content"> <!-- flex flex-col items-center justify-center  -->
			<!-- <label for="my-drawer-2" class="mb-4 btn btn-primary drawer-button lg:hidden">open menu</label
			> -->

			<slot />
		</div>
	</SideBar>
</main>