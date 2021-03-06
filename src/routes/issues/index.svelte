<script context="module">
	export async function load({ session }) {
		const user = session.user;
		if (!user) {
			return {
				status: 302,
				redirect: `/login`
			};
		}
		const data = { user };

		if (user.role.name === 'Admin' || user.role.name === 'Librarian')
			data.issues = await api.get('issues', session.jwt);

		return { props: data };
	}
</script>

<script>
	import { session } from '$app/stores';
	import * as api from '$lib/api';
	export let issues, user;

	import { RingLoader } from 'svelte-loading-spinners';
	let isLoading = false;

	if (user.role.name === 'Student') issues = user.booksBorrowed;

	const issued = issues.filter((issue) => issue.status === 'issued');
	const returned = issues.filter((issue) => issue.status === 'returned');

	const returnBook = async (issue) => {
		isLoading = true;
		const date = new Date();
		const data = {
			returnedOn: date.toISOString().substring(0, 10),
			status: 'returned'
		};
		const response = await api.put('issues/' + issue.id, data, $session.jwt);

		if (!response.error) {
			location.reload();
		}
		isLoading = false;
	};

	let openTab = 1;
	function toggleTabs(tabNumber) {
		openTab = tabNumber;
	}
</script>

<svelte:head>
	<title>Issues</title>
</svelte:head>

{#if isLoading}
	<div class="h-full w-full flex justify-center">
		<div class="m-auto">
			<RingLoader size="5" color="#86d2f9" unit="em" duration="2s" />
		</div>
	</div>
{:else}
	<div class="container my-12 mx-auto px-4 md:px-12">
		<div class="flex flex-wrap -mx-1 lg:-mx-4 flex-col gap-y-10">
			<div class="tabs">
				<a
					class="tab tab-bordered {openTab === 1 ? 'tab-active' : ''}"
					on:click={() => toggleTabs(1)}>Active Issued Books</a
				>
				<a
					class="tab tab-bordered {openTab === 2 ? 'tab-active' : ''}"
					on:click={() => toggleTabs(2)}>Returned Books</a
				>
			</div>

			<div class={openTab === 1 ? 'block' : 'hidden'}>
				{#if issued.length === 0}
					<p>No issues found</p>
				{:else}
					<div class="overflow-x-auto">
						<table class="table w-full table-zebra">
							<thead>
								<tr>
									<th />
									<th>Book</th>
									<th>Issued to</th>
									<th>Issued on</th>
									<th>Issued by</th>
									{#if user.role.name === 'Admin' || user.role.name === 'Librarian'}
										<th>Return</th>
									{/if}
								</tr>
							</thead>
							<tbody>
								{#each issued as issue, i}
									<tr>
										<th>{i + 1}</th>
										<td>{issue.book.title} by {issue.book.author}</td>
										<td>{issue.issuedTo.username}</td>
										<td>{issue.issuedOn}</td>
										<td>{issue.issuedBy.username}</td>
										{#if user.role.name === 'Admin' || user.role.name === 'Librarian'}
											<td>
												<form on:submit={() => returnBook(issue)}>
													<button for="my-modal-1" class="btn btn-primary" type="submit">
														Return
													</button>
												</form>
											</td>
										{/if}
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>

			<div class={openTab === 2 ? 'block' : 'hidden'}>
				{#if returned.length === 0}
					<p>No returns found</p>
				{:else}
					<div class="overflow-x-auto">
						<table class="table w-full table-zebra">
							<thead>
								<tr>
									<th />
									<th>Book</th>
									<th>Issued to</th>
									<th>Issued on</th>
									<th>Issued by</th>
									<th>Returned on</th>
								</tr>
							</thead>
							<tbody>
								{#each returned as issue, i}
									<tr>
										<th>{i + 1}</th>
										<td>{issue.book.title} by {issue.book.author}</td>
										<td>{issue.issuedTo.username}</td>
										<td>{issue.issuedOn}</td>
										<td>{issue.issuedBy.username}</td>
										<td>{issue.returnedOn}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
