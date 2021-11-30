<script>
	import Header from '$lib/header/Header.svelte';
	import { navigating } from '$app/stores';
	import { RingLoader } from 'svelte-loading-spinners';
</script>

<main class="flex flex-col h-screen">
	<Header />
	{#if $navigating}
		<div class="h-full w-full flex justify-center">
			<div class="m-auto">
				<RingLoader size="5" color="#86d2f9" unit="em" duration="2s" />
			</div>
		</div>
	{:else}
		<slot />
	{/if}
</main>