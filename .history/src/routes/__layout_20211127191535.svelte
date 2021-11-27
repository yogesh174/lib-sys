<script>
	import Header from '$lib/header/Header.svelte';
	import SideBar from '$lib/header/SideBar.svelte';
	import '../app.css';
	import { session } from '$app/stores';
	import { post } from '$lib/utils.js';
	
	async function logout() {
		await post(`auth/logout`);
		location.reload();
		// goto('/');
	}

	// export let user;
	let user = $session.user;
	console.log("Session user");
	console.log(user);
	
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