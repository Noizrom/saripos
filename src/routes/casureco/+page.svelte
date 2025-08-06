<script lang="ts">
	interface BillData {
		success: boolean;
		accountNumber?: string;
		routeCode?: string;
		customerName?: string;
		address?: string;
		amount?: string;
		amountBeforeDue?: string;
		amountAfterDue?: string;
		dueDate?: string;
		billDate?: string;
		meterReading?: string;
		consumption?: string;
		error?: string;
		[key: string]: string | boolean | undefined;
	}

	let pinLength = 6;
	let pinDigits = $state(Array(pinLength).fill(''));
	let route_code = $state('');
	let loading = $state(false);
	let error = $state('');
	let billData = $state<BillData | null>(null);
	let pinRefs: HTMLInputElement[] = [];
	let routeCodeRef: HTMLInputElement;

	let account_no = $derived.by(() => {
		return pinDigits.join('');
	});

	let mockBillData: BillData = {
		success: true,
		accountNumber: '110195',
		amount: '1234.56',
		dueDate: 'July 31, 2025',
		amountBeforeDue: '1200.00',
		amountAfterDue: '1300.00',
		Residential: '7.6848',
		'Low Voltage': '6.8354',
		'High Voltage': '5.7874',
		'Generation Charge': '4.0229',
		'Bill Month': 'July 2025',
		Arrears: '0.00',
		Penalty: '0.00',
		'Current Power Bill': '1234.56',
		Address: '123 Main St, City',
		'Customer Name': 'Juan Dela Cruz'
	};

	let displayBillData = $derived(billData ?? (!loading ? mockBillData : null));

	async function fetchBill() {
		loading = true;
		error = '';
		billData = null;
		try {
			const url = `/casureco?acct_no=${encodeURIComponent(account_no)}&route_code=${encodeURIComponent(route_code)}`;
			const res = await fetch(url);
			if (!res.ok) throw new Error('Failed to fetch bill');
			const data: BillData = await res.json();
			billData = data;
			if (!data.success) {
				error = data.error || 'No bill found';
			}
		} catch (e: any) {
			error = e.message || 'Unknown error';
		} finally {
			loading = false;
		}
	}

	function handlePinInput(e: Event, i: number) {
		const val = (e.target as HTMLInputElement).value;
		if (/^\d?$/.test(val)) {
			pinDigits[i] = val;
			if (val && i < pinLength - 1) {
				pinRefs[i + 1]?.focus();
			}
			if (val && i === pinLength - 1) {
				routeCodeRef?.focus();
			}
			if (!val && i > 0) {
				pinRefs[i - 1]?.focus();
			}
		}
	}

	function handlePinKeydown(e: KeyboardEvent, i: number) {
		if (e.key === 'Backspace' && !pinDigits[i] && i > 0) {
			pinRefs[i - 1]?.focus();
		}
	}

	function formatAmount(val?: string) {
		if (!val) return '';
		const num = Number(val.replace(/[^\d.]/g, ''));
		if (isNaN(num)) return val;
		return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	}

	// Helper to extract rates from API response where key is amount and value is label
	function getRates(data: BillData) {
		const rateLabels = ['Residential', 'Low Voltage', 'High Voltage', 'Generation Charge'];
		const rates: { label: string; value: string }[] = [];
		for (const [key, value] of Object.entries(data)) {
			if (typeof value === 'string' && rateLabels.includes(value)) {
				rates.push({ label: value, value: key });
			}
		}
		return rates;
	}

	// Helper to get all rate keys from API response
	function getRateKeys(data: BillData) {
		const rateLabels = ['Residential', 'Low Voltage', 'High Voltage', 'Generation Charge'];
		const keys: string[] = [];
		for (const [key, value] of Object.entries(data)) {
			if (typeof value === 'string' && rateLabels.includes(value)) {
				keys.push(key);
			}
		}
		return keys;
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-start bg-base-200 p-4">
	<div class="card mb-6 w-full max-w-lg bg-base-100 shadow-xl">
		<div class="card-body">
			<h2
				class="mb-4 rounded-box border border-black/10 bg-blue-800/30 py-2 text-center text-2xl font-bold tracking-wider uppercase drop-shadow-md text-shadow-base-content/20 text-shadow-md"
			>
				Casureco Bill Search
			</h2>
			<div class="form-control mb-3">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="label mb-2 flex w-fit flex-row gap-2 text-left">
					<span class="label-text">Account Number</span>
					<span class="text-sm font-light text-base-content/40">(6 characters)</span>
				</label>
				<div class="flex justify-around gap-2">
					{#each pinDigits as digit, i}
						<input
							type="text"
							maxlength="1"
							class="input-bordered input h-12 w-12 text-center font-mono text-lg transition-all duration-150 focus:ring-2 focus:ring-primary focus:outline-none"
							bind:value={pinDigits[i]}
							bind:this={pinRefs[i]}
							oninput={(e) => handlePinInput(e, i)}
							onkeydown={(e) => handlePinKeydown(e, i)}
							inputmode="numeric"
							pattern="[0-9]*"
							autocomplete="one-time-code"
						/>
					{/each}
				</div>
			</div>
			<div class="form-control mb-3 flex w-full flex-row justify-between gap-2">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="label flex flex-col gap-0">
					<span class="label-text">Route Code</span>
					<span class="text-sm font-light text-base-content/40">(3 characters)</span>
				</label>
				<input
					type="text"
					maxlength="3"
					class="input-bordered input w-24 text-center font-mono text-lg transition-all duration-150 focus:ring-2 focus:ring-primary focus:outline-none"
					bind:value={route_code}
					placeholder="Route"
					bind:this={routeCodeRef}
				/>
				<button
					class="btn grow btn-primary"
					onclick={fetchBill}
					disabled={loading || !account_no || !route_code}
				>
					{loading ? 'Searching...' : 'Search'}
				</button>
			</div>
			{#if error}
				<div class="mt-4 alert alert-error">{error}</div>
			{/if}
		</div>
	</div>

	{#if displayBillData && displayBillData.success}
		<div class="card mb-6 w-full max-w-lg bg-base-100 shadow-lg">
			<div class="card-body">
				<h3 class="divider mb-4 card-title w-full text-center text-2xl text-success">
					Bill Information (Example)
				</h3>
				<div class="space-y-3">
					{#if displayBillData.accountNumber}
						<div class="flex justify-between">
							<span class="font-medium text-base-content/80">Account Number:</span>
							<span class="font-mono">{displayBillData.accountNumber}</span>
						</div>
					{/if}
					{#if displayBillData.dueDate}
						<div class="flex justify-between">
							<span class="font-medium text-base-content/80">Due Date:</span>
							<span class="font-semibold text-warning">{displayBillData.dueDate}</span>
						</div>
					{/if}
					{#if displayBillData.amount}
						<div class="divider"></div>
						<div class="flex justify-between text-lg">
							<span class="font-medium text-base-content/80">Amount Due:</span>
							<span class="font-bold text-primary">₱{formatAmount(displayBillData.amount)}</span>
						</div>
					{/if}
					{#if displayBillData.amountBeforeDue}
						<div class="flex justify-between">
							<span class="font-medium text-base-content/80">Amount Before Due:</span>
							<span class="font-bold">₱{formatAmount(displayBillData.amountBeforeDue)}</span>
						</div>
					{/if}
					{#if displayBillData.amountAfterDue}
						<div class="flex justify-between">
							<span class="font-medium text-base-content/80">Amount After Due:</span>
							<span class="font-bold">₱{formatAmount(displayBillData.amountAfterDue)}</span>
						</div>
					{/if}
					<!-- Dynamically show all other grid key-value pairs except general rates -->
					{#each Object.entries(displayBillData) as [key, value]}
						{#if !['success', 'accountNumber', 'dueDate', 'amount', 'amountBeforeDue', 'amountAfterDue', 'error', 'Residential', 'Low Voltage', 'High Voltage', 'Generation Charge', ...getRateKeys(displayBillData)].includes(key) && value}
							<div class="flex justify-between">
								<span class="font-medium text-base-content/80">{key}:</span>
								<span>{value}</span>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- Mini stats for general rates from API -->
	{#if displayBillData && displayBillData.success && getRates(displayBillData).length}
		<div class="mx-auto mt-8 w-full max-w-xl">
			<div class="flex flex-wrap bg-base-200 text-xs shadow">
				{#each getRates(displayBillData) as rate}
					<div class="stat flex-1">
						<div class="stat-title">{rate.label}</div>
						<div class="stat-value">₱{formatAmount(rate.value)}</div>
					</div>
				{/each}
			</div>
			<div class="mt-2 text-center text-xs text-base-content/60">
				Latest rates for reference only
			</div>
		</div>
	{/if}
</div>
