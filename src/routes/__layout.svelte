<script>
	import Header from '$lib/header/Header.svelte';
	import SideBar from '$lib/header/SideBar.svelte';
	import '../app.css';
	import { session } from '$app/stores';
	import { post } from '$lib/utils.js';
	import { navigating } from '$app/stores';
	import { RingLoader } from 'svelte-loading-spinners';
	import { goto } from '$app/navigation';
	let isLoading = false;

	async function logout() {
		isLoading = true;
		await post(`/auth/logout`);
		goto('/login');
		location.reload();
		isLoading = false;
	}

	let user = $session.user;
</script>

<main class="flex flex-col h-screen">
	{#if user}
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
	
	{#if user && user.role.name === 'Admin'}
		<SideBar>
			<div class="drawer-content">
				{#if $navigating || isLoading}
					<div class="h-full w-full flex justify-center">
						<div class="m-auto">
							<RingLoader size="5" color="#86d2f9" unit="em" duration="2s" />
						</div>
					</div>
				{:else}
					<slot />
				{/if}
			</div>
			<div slot="menu">
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/books">Books</a>
				</li>
				<li>
					<a href="/issues">Issues</a>
				</li>
				<li>
					<a href="/users">Users</a>
				</li>
			</div>
		</SideBar>
	{:else if user}
		<SideBar>
			<div class="drawer-content">
				{#if $navigating || isLoading}
					<div class="h-full w-full flex justify-center">
						<div class="m-auto">
							<RingLoader size="5" color="#86d2f9" unit="em" duration="2s" />
						</div>
					</div>
				{:else}
					<slot />
				{/if}
			</div>

			<div slot="menu">
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/books">Books</a>
				</li>
				<li>
					<a href="/issues">Issues</a>
				</li>
			</div>
		</SideBar>
	{/if}
</main>