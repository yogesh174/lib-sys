<script context="module">
	export async function load({ session }) {
		const user = session.user;

		if (!user || user.role.name !== 'Admin') {
			return {
				status: 302,
				redirect: `/login`
			};
		}

		const data = {};
		data.users = await api.get('users', session.jwt);
		const rolesObject = await api.get('users-permissions/roles', session.jwt);
		data.roles = rolesObject.roles;

		return { props: data };
	}
</script>

<script>
	import { session } from '$app/stores';
	import * as api from '$lib/api';
	import Icon from '@iconify/svelte';
	import { RingLoader } from 'svelte-loading-spinners';
	let isLoading = false;
	export let users, roles;

	console.log(roles);

	const addUser = async () => {
		isLoading = true;
		const formElement = document.querySelector('form#add-user-form');
		const formElements = formElement.elements;
		const data = { confirmed: true };

		for (let i = 0; i < formElements.length; i++) {
			const currentElement = formElements[i];
			data[currentElement.name] = currentElement.value;
		}

		console.log(data);

		const response = await api.post('users', data, $session.jwt);
		if (!response.error) users.push(response);
		isLoading = false;
	};
</script>

<svelte:head>
	<title>Users</title>
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
			{#if users.length === 0}
				<p>No users found</p>
			{:else}
				<div class="overflow-x-auto">
					<table class="table w-full table-zebra">
						<thead>
							<tr>
								<th />
								<th>Username</th>
								<th>Email</th>
								<th>Role</th>
								<th>First Name</th>
								<th>Last Name</th>
							</tr>
						</thead>
						<tbody>
							{#each users as user, i}
								<tr>
									<th>{i + 1}</th>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>{user.role.name}</td>
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	</div>

	<label
		for="my-modal-2"
		class="btn btn-primary btn-circle btn-md absolute bottom-2 right-5 modal-button"
	>
		<Icon icon="bi:plus-lg" width="25" height="25" />
	</label>

	<input type="checkbox" id="my-modal-2" class="modal-toggle" />

	<div class="modal">
		<div class="modal-box">
			<form on:submit|preventDefault={addUser} id="add-user-form">
				<div class="px-4 py-5 space-y-6 sm:p-6">
					<div class="grid grid-cols-2 gap-4">
						<div class="form-control">
							<label class="label">
								<span class="label-text">First Name</span>
							</label>
							<input
								type="text"
								placeholder="First Name"
								name="firstName"
								class="input input-primary input-bordered"
							/>
						</div>

						<div class="form-control">
							<label class="label">
								<span class="label-text">Last Name</span>
							</label>
							<input
								type="text"
								placeholder="Last Name"
								name="lastName"
								class="input input-primary input-bordered"
							/>
						</div>

						<div class="form-control">
							<label class="label">
								<span class="label-text">Username</span>
							</label>
							<input
								type="text"
								placeholder="Username"
								name="username"
								class="input input-primary input-bordered"
							/>
						</div>

						<div class="form-control">
							<label class="label">
								<span class="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="Email"
								name="email"
								class="input input-primary input-bordered"
							/>
						</div>

						<div class="form-control">
							<label class="label">
								<span class="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="Password"
								name="password"
								class="input input-primary input-bordered"
							/>
						</div>

						<div class="form-control">
							<label class="label">
								<span class="label-text">Role</span>
							</label>

							<select name="role" class="input input-primary input-bordered">
								{#each roles as role, i}
									<option value={role.id}>{role.name}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>

				<div class="modal-action">
					<label for="my-modal-2">
						<button for="my-modal-2" class="btn btn-primary" type="submit"> Add User </button>
					</label>
					<label for="my-modal-2" class="btn">Close</label>
				</div>
			</form>
		</div>
	</div>
{/if}
