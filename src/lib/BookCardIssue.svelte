<script>
	import { page } from '$app/stores';
	export let title,
		author,
		users,
		cover,
		categories = [],
		user, bookIssued, id;
	import Icon from '@iconify/svelte';
	import BookCard from '$lib/BookCard.svelte';
</script>

<BookCard {title} {author} {cover} {categories}>
	<div class="card-actions absolute top-0 right-0">
		<label for="my-modal-1" class="btn btn-primary modal-button btn-circle" on:click={() => bookIssued = id}>
			<Icon icon="bi:plus" width="30" height="30" />
		</label>

		<input type="checkbox" id="my-modal-1" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box">
				<form on:submit|preventDefault>
					<div class="px-4 py-5 space-y-6 sm:p-6">
						<div class="grid grid-cols-2 gap-4">
							<div class="form-control">
								<label class="label">
									<span class="label-text">Username</span>
								</label>
								<select bind:value={user} class="input input-primary input-bordered">
									{#each users as user}
										<option value={user.id}>
											{user.username}
										</option>
									{/each}
								</select>
							</div>
						</div>
					</div>

					<div class="modal-action">
							<button class="btn btn-primary" type="submit">
								Issue Book
							</button>
						<label for="my-modal-1" class="btn" on:click>Close</label>
					</div>
				</form>
			</div>
		</div>
	</div>
</BookCard>
