<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<svelte:head>
	<title>SariPOS - Complete Sari-Sari Store Management System</title>
	<meta
		name="description"
		content="Comprehensive POS and business management solution for sari-sari stores in the Philippines"
	/>
</svelte:head>

<!-- Hero Section -->
<div class="hero min-h-[60vh] bg-gradient-to-br from-primary via-primary/80 to-secondary">
	<div class="hero-content text-center">
		<div class="max-w-4xl">
			<h1 class="mb-6 text-5xl font-bold text-primary-content">
				<Icon icon="mdi:store" class="mr-2 inline h-12 w-12" />
				SariPOS
			</h1>
			<p class="mb-8 text-xl leading-relaxed text-primary-content/90">
				Complete Point-of-Sale and Business Management System<br />
				<span class="text-lg opacity-80">Designed for Filipino Sari-Sari Stores</span>
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<a href="/pos" class="btn gap-2 btn-lg btn-accent">
					<Icon icon="mdi:cash-register" class="h-6 w-6" />
					Start Selling
				</a>
				<a
					href="/inventory"
					class="btn gap-2 border-primary-content text-primary-content btn-ghost btn-lg"
				>
					<Icon icon="mdi:package-variant" class="h-6 w-6" />
					Manage Inventory
				</a>
			</div>
		</div>
	</div>
</div>

<!-- Feature Cards -->
<div class="px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<h2 class="mb-12 text-center text-3xl font-bold">Everything Your Store Needs</h2>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			<!-- POS System -->
			<div class="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
				<div class="card-body">
					<div class="mb-4 flex items-center gap-3">
						<div class="rounded-lg bg-primary/10 p-3">
							<Icon icon="mdi:cash-register" class="h-8 w-8 text-primary" />
						</div>
						<h3 class="card-title">Point of Sale</h3>
					</div>
					<p>
						Complete POS system with barcode scanning, inventory tracking, and multi-payment
						support.
					</p>
					<div class="card-actions justify-end">
						<a href="/pos" class="btn btn-sm btn-primary">Start POS</a>
					</div>
				</div>
			</div>

			<!-- Receipt Printing -->
			<div class="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
				<div class="card-body">
					<div class="mb-4 flex items-center gap-3">
						<div class="rounded-lg bg-secondary/10 p-3">
							<Icon icon="mdi:printer" class="h-8 w-8 text-secondary" />
						</div>
						<h3 class="card-title">Thermal Printing</h3>
					</div>
					<p>Print receipts, labels, and promotional materials with Bluetooth thermal printers.</p>
					<div class="card-actions justify-end">
						<a href="/printing" class="btn btn-sm btn-secondary">Setup Printer</a>
					</div>
				</div>
			</div>

			<!-- Inventory Management -->
			<div class="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
				<div class="card-body">
					<div class="mb-4 flex items-center gap-3">
						<div class="rounded-lg bg-accent/10 p-3">
							<Icon icon="mdi:package-variant" class="h-8 w-8 text-accent" />
						</div>
						<h3 class="card-title">Inventory</h3>
					</div>
					<p>Track stock levels, manage suppliers, and get alerts for low inventory.</p>
					<div class="card-actions justify-end">
						<a href="/inventory" class="btn btn-sm btn-accent">Manage Stock</a>
					</div>
				</div>
			</div>

			<!-- Bill Payments -->
			<div class="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
				<div class="card-body">
					<div class="mb-4 flex items-center gap-3">
						<div class="rounded-lg bg-warning/10 p-3">
							<Icon icon="mdi:flash" class="h-8 w-8 text-warning" />
						</div>
						<h3 class="card-title">Bill Payments</h3>
					</div>
					<p>Process utility bill payments and earn commissions with integrated lookup systems.</p>
					<div class="card-actions justify-end">
						<a href="/casureco" class="btn btn-sm btn-warning">Check Bills</a>
					</div>
				</div>
			</div>

			<!-- Queue Management -->
			<div class="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
				<div class="card-body">
					<div class="mb-4 flex items-center gap-3">
						<div class="rounded-lg bg-info/10 p-3">
							<Icon icon="mdi:format-list-numbered" class="h-8 w-8 text-info" />
						</div>
						<h3 class="card-title">Queue System</h3>
					</div>
					<p>Organize customers with digital queue numbers and service management.</p>
					<div class="card-actions justify-end">
						<a href="/queue" class="btn btn-sm btn-info">Manage Queue</a>
					</div>
				</div>
			</div>

			<!-- Analytics -->
			<div class="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
				<div class="card-body">
					<div class="mb-4 flex items-center gap-3">
						<div class="rounded-lg bg-success/10 p-3">
							<Icon icon="mdi:chart-line" class="h-8 w-8 text-success" />
						</div>
						<h3 class="card-title">Analytics</h3>
					</div>
					<p>Track sales, analyze trends, and generate reports for business insights.</p>
					<div class="card-actions justify-end">
						<a href="/analytics" class="btn btn-sm btn-success">View Reports</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Quick Stats -->
<div class="bg-base-200 py-12">
	<div class="mx-auto max-w-4xl px-4">
		<div class="stats w-full stats-vertical shadow lg:stats-horizontal">
			<div class="stat">
				<div class="stat-figure text-primary">
					<Icon icon="mdi:store" class="h-8 w-8" />
				</div>
				<div class="stat-title">For Sari-Sari Stores</div>
				<div class="stat-value text-primary">100%</div>
				<div class="stat-desc">Designed for Filipino businesses</div>
			</div>

			<div class="stat">
				<div class="stat-figure text-secondary">
					<Icon icon="mdi:devices" class="h-8 w-8" />
				</div>
				<div class="stat-title">Cross Platform</div>
				<div class="stat-value text-secondary">Web</div>
				<div class="stat-desc">Works on any device</div>
			</div>

			<div class="stat">
				<div class="stat-figure text-accent">
					<Icon icon="mdi:bluetooth" class="h-8 w-8" />
				</div>
				<div class="stat-title">Thermal Printing</div>
				<div class="stat-value text-accent">BT</div>
				<div class="stat-desc">Bluetooth ESC/POS support</div>
			</div>
		</div>
	</div>
</div>

<!-- Call to Action -->
<div class="px-4 py-16">
	<div class="mx-auto max-w-2xl text-center">
		<h2 class="mb-6 text-3xl font-bold">Ready to Modernize Your Store?</h2>
		<p class="mb-8 text-lg opacity-70">
			Join the digital revolution and transform your sari-sari store with SariPOS. Start with our
			basic features and scale as your business grows.
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<a href="/pos" class="btn gap-2 btn-lg btn-primary">
				<Icon icon="mdi:rocket-launch" class="h-6 w-6" />
				Get Started Now
			</a>
			<a href="#features" class="btn gap-2 btn-outline btn-lg">
				<Icon icon="mdi:information" class="h-6 w-6" />
				Learn More
			</a>
		</div>
	</div>
</div>
