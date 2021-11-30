<script context="module">
	export async function load({ session }) {
		const user = session.user;
		if (!user) {
			return {
				status: 302,
				redirect: `/login`
			};
		}
		return {props: {user}};
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<script>
	export let user;
</script>

<div class="flex flex-col items-center justify-center">
	
	<div class="text-center lg:text-left my-20">
		<h1 class="mb-5 text-5xl font-bold">LibSys</h1>
		<p>Hello there {user.firstName}!</p>
		<p class="mb-5">
			LibSys is a complete library management system for adding, issuing, 
			and returning books.
		</p>
		<div class="mb-10">
			
			<p>Checkout other products similar to this</p>
			<ul class="mx-5">
				<li><a href="https://htl-mgmt.vercel.app/" class="text-purple-300">Hostel management</a></li>
				<li><a href="https://vid-onl.vercel.app/" class="text-purple-300">Online tutorials</a></li>
			</ul>
		</div>
	</div>
</div>