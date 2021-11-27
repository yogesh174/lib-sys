<script>
	import Header from '$lib/header/Header.svelte';
	import SideBar from '$lib/header/SideBar.svelte';
	// import '../app.css';
</script>



<main class="flex flex-col min-h-screen">
	<Header />
	<slot />
</main>
