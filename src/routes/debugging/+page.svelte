<script lang="ts">
	// Svelte 5 runes mode
	import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder';
	import { QueueReceiptBuilder } from '../../lib/receipt-builder';
	import { BluetoothPrinter } from '../../lib/bluetooth-printer';

	// --- Department types ---
	type Department = 'OB' | 'PEDIATRICS' | 'MEDICINE' | 'SURGERY';

	// --- Bluetooth state ---
	let logMessages = $state<string[]>([]);
	let printer = $state<BluetoothPrinter | null>(null);
	let printerReady = $state(false);

	// --- Queue state ---
	let selectedDepartment = $state<Department>('OB');
	let counters = $state<Record<Department, number>>({
		OB: 1,
		PEDIATRICS: 1,
		MEDICINE: 1,
		SURGERY: 1
	});
	let jumpToNumberInput = $state('');

	// Restore counters from localStorage on mount
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('queue-counters');
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				if (parsed && typeof parsed === 'object') {
					for (const key of Object.keys(counters)) {
						if (parsed[key] && typeof parsed[key] === 'number') {
							counters[key as Department] = parsed[key];
						}
					}
				}
			} catch {}
		}
	}

	// Persist counters to localStorage whenever they change
	$effect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('queue-counters', JSON.stringify(counters));
		}
	});

	// --- Theme state ---
	let theme = $state<'light' | 'dark'>('light');

	function log(...args: any[]) {
		logMessages.push(args.join(' '));
	}

	async function connectPrinter() {
		logMessages = [];
		printer = new BluetoothPrinter({ namePrefix: 'VOZY' }, [
			0x1800,
			0x1801,
			0x18f0,
			0xff00,
			0xeee0,
			0xeee2,
			0xfee7,
			'e7810a71-73ae-499d-8c15-faa9aef0c3f2',
			'49535343-fe7d-4ae5-8fa9-9fafd205e455'
		]);
		await printer.connect();
		logMessages = printer.logMessages.slice();
		printerReady = printer.ready;
	}

	function vibrate(ms: number = 30) {
		if (typeof window !== 'undefined' && 'vibrate' in navigator) {
			navigator.vibrate(ms);
		}
	}

	function nextNumber() {
		vibrate();
		counters[selectedDepartment]++;
	}

	function resetCounter() {
		vibrate();
		if (confirm(`Reset ${selectedDepartment} counter to 1?`)) {
			counters[selectedDepartment] = 1;
		}
	}

	function jumpToNumber() {
		vibrate();
		const num = parseInt(jumpToNumberInput);
		if (num > 0) {
			counters[selectedDepartment] = num;
			jumpToNumberInput = '';
		}
	}

	async function printCurrentNumber() {
		vibrate();
		if (!printer || !printer.ready) {
			alert('Printer not connected');
			return;
		}

		try {
			const builder = new QueueReceiptBuilder(selectedDepartment, counters[selectedDepartment], {
				printerModel: 'pos-5890',
				columns: 32
			});
			const result = builder.encode();
			const buffer = new Uint8Array(Array.from(result));
			await printer.write(buffer);
			logMessages = printer.logMessages.slice();
			log(
				`✅ Printed: ${selectedDepartment} #${counters[selectedDepartment].toString().padStart(3, '0')}`
			);
			counters[selectedDepartment]++;
		} catch (err: any) {
			log('❌ Print error:', err.message);
			if (printer) logMessages = printer.logMessages.slice();
		}
	}

	function toggleTheme() {
		vibrate();
		theme = theme === 'light' ? 'dark' : 'light';
	}
</script>

<div
	class={`flex min-h-screen flex-col bg-base-200 ${theme === 'dark' ? 'dark' : ''}`}
	data-theme={theme}
>
	<!-- Header -->
	<div class="border-b bg-base-100 shadow-sm">
		<div class="mx-auto max-w-md p-4">
			<div class="mb-2 flex items-center justify-between">
				<h1 class="flex-1 text-center text-xl font-bold text-base-content">Queue Management</h1>
				<button class="btn btn-ghost btn-sm" onclick={toggleTheme} aria-label="Toggle theme">
					{theme === 'light' ? '🌙' : '☀️'}
				</button>
			</div>
			<button
				class="btn mt-2 w-full btn-outline btn-sm"
				class:btn-success={printerReady}
				class:btn-error={!printerReady}
				onclick={connectPrinter}
			>
				{#if printerReady}
					✅ Printer Connected
				{:else}
					🔌 Connect Printer
				{/if}
			</button>
		</div>
	</div>

	<!-- Main Content -->
	<div class="mx-auto w-full max-w-md flex-1 p-4">
		<!-- Department Selector -->
		<div class="card mb-6 bg-base-100 shadow-lg">
			<div class="card-body p-4">
				<h2 class="mb-4 card-title text-center text-base-content">Department</h2>
				<select
					class="select-bordered select w-full text-center text-lg font-bold"
					bind:value={selectedDepartment}
				>
					<option value="OB">OB</option>
					<option value="PEDIATRICS">PEDIATRICS</option>
					<option value="MEDICINE">MEDICINE</option>
					<option value="SURGERY">SURGERY</option>
				</select>
			</div>
		</div>

		<!-- Current Number Display -->
		<div class="card mb-6 bg-primary text-primary-content shadow-xl">
			<div class="card-body p-8 text-center">
				<h3 class="mb-2 text-lg font-medium opacity-90">Current Number</h3>
				<div class="text-8xl font-bold tracking-wider">
					{counters[selectedDepartment].toString().padStart(3, '0')}
				</div>
				<div class="divider my-4 divider-neutral opacity-30"></div>
				<p class="text-sm opacity-75">{selectedDepartment}</p>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="mb-6 grid grid-cols-1 gap-3">
			<button class="btn btn-lg btn-primary" onclick={nextNumber}>
				<span class="text-lg">Next Number</span>
			</button>

			<button class="btn btn-lg btn-success" onclick={printCurrentNumber} disabled={!printerReady}>
				<span class="text-lg">🖨️ Print Current</span>
			</button>
		</div>

		<!-- Management Controls -->
		<div class="card mb-6 bg-base-100 shadow-lg">
			<div class="card-body p-4">
				<h3 class="mb-3 card-title text-sm text-base-content">Manage Counter</h3>

				<!-- Jump to Number -->
				<div class="mb-3 flex gap-2">
					<input
						type="number"
						placeholder="Jump to..."
						class="input-bordered input flex-1"
						bind:value={jumpToNumberInput}
						min="1"
					/>
					<button class="btn btn-outline" onclick={jumpToNumber} disabled={!jumpToNumberInput}>
						Go
					</button>
				</div>

				<!-- Reset Button -->
				<button class="btn w-full btn-outline btn-sm btn-error" onclick={resetCounter}>
					Reset to 1
				</button>
			</div>
		</div>
	</div>

	<!-- Log Messages (Collapsible) -->
	{#if logMessages.length > 0}
		<div class="mx-auto w-full max-w-md p-4">
			<details class="collapse-arrow collapse bg-base-100">
				<summary class="collapse-title text-sm font-medium">
					System Log ({logMessages.length})
				</summary>
				<div class="collapse-content max-h-32 overflow-y-auto">
					{#each logMessages.slice(-5) as msg}
						<pre class="mb-1 text-xs text-base-content">{msg}</pre>
					{/each}
				</div>
			</details>
		</div>
	{/if}
</div>
