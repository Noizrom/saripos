import type { RequestHandler } from '@sveltejs/kit';

interface BillData {
	success: boolean;
	accountNumber?: string;
	routeCode?: string;
	customerName?: string;
	address?: string;
	amount?: string;
	dueDate?: string;
	billDate?: string;
	meterReading?: string;
	consumption?: string;
	error?: string;
	amountBeforeDue?: string;
	amountAfterDue?: string;
	[key: string]: any; // Allow any other grid data
}

function parseBillData(html: string): BillData {
	const isSuccess = html.includes('Invoice') && html.includes('Thank you!');
	if (!isSuccess) {
		return {
			success: false,
			error: 'No bill found or invalid account/route code'
		};
	}

	// Helper to trim peso sign and whitespace
	function cleanAmount(val?: string) {
		if (!val) return undefined;
		return val.replace(/₱/g, '').trim();
	}

	// Get the amount due: next <span> after 'Kindly Pay'
	let amount: string | undefined;
	const kindlyPayIdx = html.indexOf('Kindly Pay');
	if (kindlyPayIdx !== -1) {
		const spanMatch = html.slice(kindlyPayIdx).match(/<span[^>]*>([^<]+)<\/span>/);
		amount = cleanAmount(spanMatch ? spanMatch[1] : undefined);
	}

	// Get due date: next <p> after 'Due Date'
	let dueDate: string | undefined;
	const dueDateIdx = html.indexOf('Due Date');
	if (dueDateIdx !== -1) {
		const pMatch = html.slice(dueDateIdx).match(/<p[^>]*>([^<]+)<\/p>/);
		dueDate = pMatch ? pMatch[1].trim() : undefined;
	}

	// Get account number: next <p> after 'Account Number'
	let accountNumber: string | undefined;
	const acctIdx = html.indexOf('Account Number');
	if (acctIdx !== -1) {
		const pMatch = html.slice(acctIdx).match(/<p[^>]*>([^<]+)<\/p>/);
		accountNumber = pMatch ? pMatch[1].trim() : undefined;
	}

	// Extract all <dt>/<dd> grid pairs
	const gridData: Record<string, string> = {};
	const gridRegex = /<dt[^>]*>([^<]+)<\/dt>\s*<dd[^>]*>([^<]+)<\/dd>/g;
	let gridMatch;
	while ((gridMatch = gridRegex.exec(html))) {
		const key = gridMatch[1].replace(/\s+/g, ' ').trim();
		const value = gridMatch[2].replace(/\s+/g, ' ').trim();
		gridData[key] = value;
	}

	// Get Amount Before Due and Amount After Due
	let amountBeforeDue: string | undefined;
	let amountAfterDue: string | undefined;
	const beforeDueMatch = html.match(/Amount Before Due:[^<]*<dd[^>]*>([^<]+)<\/dd>/);
	if (beforeDueMatch) amountBeforeDue = cleanAmount(beforeDueMatch[1]);
	const afterDueMatch = html.match(/Amount After Due:[^<]*<dd[^>]*>([^<]+)<\/dd>/);
	if (afterDueMatch) amountAfterDue = cleanAmount(afterDueMatch[1]);

	return {
		success: true,
		amount,
		dueDate,
		accountNumber,
		amountBeforeDue,
		amountAfterDue,
		...gridData
	};
}

export const GET: RequestHandler = async ({ url }) => {
	const account_no = url.searchParams.get('acct_no');
	const route_code = url.searchParams.get('route_code');
	if (!account_no || !route_code) {
		return new Response('Missing parameters', { status: 400 });
	}
	const apiUrl = `https://casureco2.com.ph/bill/search?acct_no=${encodeURIComponent(account_no)}&route_code=${encodeURIComponent(route_code)}`;
	try {
		const res = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Accept:
					'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
				'Accept-Language': 'en-US,en;q=0.9',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive',
				Pragma: 'no-cache',
				Referer: 'https://casureco2.com.ph/bill/',
				'Sec-Fetch-Dest': 'document',
				'Sec-Fetch-Mode': 'navigate',
				'Sec-Fetch-Site': 'same-origin',
				'Sec-Fetch-User': '?1',
				'Upgrade-Insecure-Requests': '1',
				'User-Agent':
					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
				'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"macOS"'
			}
		});
		const html = await res.text();

		// Parse the HTML to extract bill data
		const billData = parseBillData(html);

		return new Response(JSON.stringify(billData), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
	} catch (e: any) {
		return new Response('Proxy error', { status: 500 });
	}
};
