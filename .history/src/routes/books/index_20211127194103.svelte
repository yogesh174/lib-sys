<script context="module">
	export async function load({ session }) {
		const user = session.user;
		
		if (!user) {
			return {
				status: 302,
				redirect: `/login`
			};
		}

		const data = {user};
		data.books = await api.get('books', session.jwt);
		if (user.role.name === "Admin" || user.role.name === "Librarian")
			data.users = await api.get('users', session.jwt);

		return {props: data};
	}
</script>

<script>
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	import * as api from '$lib/api';
	import Icon from '@iconify/svelte';
	import Tags from 'svelte-tags-input';
	import BookCardIssue from '$lib/BookCardIssue.svelte';
	import BookCard from '$lib/BookCard.svelte';
	import Dropzone from 'svelte-file-dropzone';
	export let books, users, user;

	let categories = '';

	function handleTags(event) {
		categories = event.detail.tags;
	}

	const addBook = () => {
		const formData = new FormData();
		const formElement = document.querySelector('form#book-form');
		const formElements = formElement.elements;
		const data = { categories };

		for (let i = 0; i < formElements.length; i++) {
			const currentElement = formElements[i];
			data[currentElement.name] = currentElement.value;
		}

		formData.append('files.cover', files.accepted[0]);

		const date = new Date();
		data['createdOn'] = date.toLocaleString();
		formData.append('data', JSON.stringify(data));
		api.postFormData('books', formData, $session.jwt);
	};

	let bookForm = {};
	const issueBook = (book, bookForm) => {
		let issuedTo = bookForm[book];
		const data = { book, issuedTo };
		bookForm = {};
		const date = new Date();
		data['issuedOn'] = date.toLocaleString();
		data['issuedBy'] = user.id;
		data['status'] = 'issued';

		// console.log(data);
		api.post('issues', data, $session.jwt);
	};

	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="container my-12 mx-auto px-4 md:px-12">
	<div class="flex flex-wrap -mx-1 lg:-mx-4">
		{#each books as book}
			<div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
				{#if !users}
					<BookCard
						title={book.title}
						author={book.author}
						cover={book.cover.url}
						categories={book.categories}
					/>
				{:else}
					<BookCardIssue
						title={book.title}
						author={book.author}
						cover={book.cover.url}
						categories={book.categories}
						{users}
						bind:user={bookForm[book.id]}
						on:click={() => {
							bookForm[book.id] = '';
						}}
						on:submit={() => {
							issueBook(book.id, bookForm);
						}}
					/>
				{/if}
			</div>
		{/each}
	</div>
</div>

{#if users}
	<label
		for="my-modal-2"
		class="btn btn-primary btn-circle btn-lg absolute bottom-2 right-2 modal-button"
	>
		<Icon icon="bi:plus-lg" width="30" height="30" />
	</label>

	<input type="checkbox" id="my-modal-2" class="modal-toggle" />

	<div class="modal">
		<div class="modal-box">
			<form on:submit={addBook} id="book-form">
				<div class="px-4 py-5 space-y-6 sm:p-6">
					<div class="grid grid-cols-2 gap-4">
						<div class="form-control">
							<label class="label">
								<span class="label-text">Title</span>
							</label>
							<input
								type="text"
								placeholder="Book Title"
								name="title"
								class="input input-primary input-bordered"
							/>
						</div>

						<div class="form-control">
							<label class="label">
								<span class="label-text">Author</span>
							</label>
							<input
								type="text"
								placeholder="Book Author"
								name="author"
								class="input input-primary input-bordered"
							/>
						</div>

						<div class="form-control">
							<label class="label">
								<span class="label-text">Copies</span>
							</label>
							<input
								type="text"
								placeholder="Number of books"
								name="copies"
								class="input input-primary input-bordered"
							/>
						</div>

						<div class="form-control">
							<label class="label">
								<span class="label-text">Pages</span>
							</label>
							<input
								type="text"
								placeholder="Number of pages"
								name="pages"
								class="input input-primary input-bordered"
							/>
						</div>

						<div class="form-control">
							<label class="label">
								<span class="label-text">Categories</span>
							</label>
							<!-- <input type="text" placeholder="Number of pages" class="input input-primary input-bordered"> -->

							<div class=" text-indigo-900">
								<Tags on:tags={handleTags} />
							</div>
						</div>
					</div>

					{#if browser}
						<Dropzone on:drop={handleFilesSelect} />
						<ol>
							{#each files.accepted as item}
								<li>{item.name}</li>
							{/each}
						</ol>
					{/if}
				</div>

				<div class="modal-action">
					<button for="my-modal-2" class="btn btn-primary" type="submit">
						<label for="my-modal-2">Add Book</label>
					</button>
					<label for="my-modal-2" class="btn">Close</label>
				</div>
			</form>
		</div>
	</div>
{/if}
