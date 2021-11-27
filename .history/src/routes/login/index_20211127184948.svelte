<script context="module">
	export async function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}

		return {};
	}
</script>

<script>
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { post } from '$lib/utils.js';

	let identifier = '';
	let password = '';
	let errors = null;

	async function submit(event) {
		const response = await post(`auth/login`, { identifier, password });
		errors = response.error;

		if (response.user)
			location.reload();
	}
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<div class="hero min-h-screen bg-base-200">
	<div class="flex-col hero-content lg:flex-row space-x-64">
		
		<div class="text-center lg:text-left">
			<h1 class="mb-5 text-5xl font-bold">LibSys</h1>
			<p class="mb-5">
				LibSys is a complete library management system for adding, issuing, 
				and returning books.
			</p>
			<p class="mb-10">
				Note: To register please contact the admin of your school.
			</p>
		</div>

		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				
				{#if errors}
					<pre class="text-sm text-red-300 font-medium">
						Invalid username or password
					</pre>
				{/if}

				<form on:submit|preventDefault={submit}>
					<div class="form-control">
						<label class="label">
							<span class="label-text">Username</span>
						</label>
						<input
							type="text"
							required
							placeholder="Username"
							bind:value={identifier}
							class="input input-bordered"
						/>
					</div>
					<div class="form-control">
						<label class="label">
							<span class="label-text">Password</span>
						</label>
						<input
							type="password"
							required
							placeholder="Password"
							bind:value={password}
							class="input input-bordered"
						/>
						<label class="label">
							<a href="#" class="label-text-alt">Forgot password?</a>
						</label>
					</div>
					<div class="form-control mt-6">
						<input type="submit" value="Login" class="btn btn-primary" />
					</div>
				</form>
			</div>
		</div>
	</div>
</div>