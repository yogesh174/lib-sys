<script>
	import { page } from '$app/stores';
	export let title,
		author,
		cover,
		categories = [];
	import Icon from '@iconify/svelte';
</script>

<div class="card shadow-sm text-accent-content bg-primary bg-opacity-10">
	<slot />

	<figure>
		<img src={cover}/>
	</figure>

	<div class="card-body">
		<div class="card-title">
			<h1>
				{title}
			</h1>
			<span class="font-sans">by {author}</span>
		</div>

		<!-- <div class="mt-4">
			<span class="text-teal-600 text-md font-semibold">{availableCopies}/{totalCopies} copies</span>
		</div> -->

		<div class="flex gap-2 flex-wrap">
			{#each categories as category}
				<div class="badge badge-accent">{category}</div>
			{/each}
		</div>
	</div>
</div>
