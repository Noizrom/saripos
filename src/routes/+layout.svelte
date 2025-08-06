<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	let { children } = $props();
	let drawerOpen = $state(false);
	let pathname = $derived(page.url.pathname);
	let theme = $state('dark');

	// Navigation items configuration
	const navItems = [
		{ href: '/', label: 'Home', icon: 'mdi:home' },
		{ href: '/queue', label: 'Queue Management', icon: 'mdi:format-list-numbered' },
		{ href: '/casureco', label: 'Electric Bill Lookup', icon: 'mdi:flash' },
		{ href: '/pos', label: 'POS & Receipt Printing', icon: 'mdi:printer' }
	];

	// Check if current path is active
	function isActive(href: string) {
		return pathname === href;
	}

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="drawer-mobile drawer h-screen lg:drawer-open" data-theme={theme}>
	<input id="sidebar-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar bg-base-100 shadow-md">
			<div class="flex-none lg:hidden">
				<label for="sidebar-drawer" class="btn btn-square btn-ghost">
					<Icon icon="mdi:menu" class="h-6 w-6" />
				</label>
			</div>
			<div class="flex-1 px-2 text-xl font-bold">SariPOS</div>
			<div class="flex-none">
				<button class="btn btn-square btn-ghost" onclick={toggleTheme} aria-label="Toggle theme">
					{#if theme === 'dark'}
						<Icon icon="mdi:weather-night" class="h-6 w-6" />
					{:else}
						<Icon icon="mdi:white-balance-sunny" class="h-6 w-6" />
					{/if}
				</button>
			</div>
		</div>
		<main class="p-4">
			{@render children?.()}
		</main>
	</div>
	<div class="drawer-side">
		<label for="sidebar-drawer" class="drawer-overlay lg:hidden"></label>
		<ul class="menu min-h-full w-64 bg-base-200 p-4 text-base-content">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class={isActive(item.href) ? 'active' : ''}
						class:font-bold={isActive(item.href)}
					>
						<Icon icon={item.icon} class="h-5 w-5" />
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
