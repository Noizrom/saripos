<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	let { children } = $props();
	let drawerOpen = $state(false);
	let pathname = $derived(page.url.pathname);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="drawer-mobile drawer h-screen lg:drawer-open" data-theme="dark">
	<input id="sidebar-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar bg-base-100 shadow-md">
			<div class="flex-none lg:hidden">
				<label for="sidebar-drawer" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</label>
			</div>
			<div class="flex-1 px-2 text-xl font-bold">SariPOS</div>
		</div>
		<main class="p-4">
			{@render children?.()}
		</main>
	</div>
	<div class="drawer-side">
		<label for="sidebar-drawer" class="drawer-overlay lg:hidden"></label>
		<ul class="menu min-h-full w-64 bg-base-200 p-4 text-base-content">
			{#if pathname === '/casureco'}
				<li><a href="/casureco">Electric Bill Lookup</a></li>
				<li><a href="/">Home</a></li>
			{:else}
				<li><a href="/">Home</a></li>
				<li><a href="/queue">Queue Management</a></li>
				<li><a href="/casureco">Electric Bill Lookup</a></li>
				<li><a href="/pos">POS & Receipt Printing</a></li>
			{/if}
		</ul>
	</div>
</div>
