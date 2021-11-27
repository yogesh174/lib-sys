<script context="module">
	export async function load({ session }) {

		console.log("session.user");
		console.log(session.user);

		if (!session.user) {
			return {
				status: 302,
				redirect: `/login`
			};
		}
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<script>
	import { session } from '$app/stores';
	let user = $session.user;
</script>

<div class="flex flex-col items-center justify-center">
	
	<div class="text-center lg:text-left my-20">
		<h1 class="mb-5 text-5xl font-bold">LibSys</h1>
		<p class="mb-5">
			LibSys is a complete library management system for adding, issuing, 
			and returning books.
		</p>
		<div class="mb-10">
			<p>Hello there!!!</p>
			<p>Checkout other products similar to this</p>
			<ul class="mx-5">
				<li><a href="http://" class="text-purple-300">Hostel management</a></li>
				<li><a href="http://" class="text-purple-300">Online tutorials</a></li>
			</ul>
		</div>
	</div>
</div>