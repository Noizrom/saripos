// Abstract base class for consistent receipt builders
import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder';
import type { EncoderOptions } from '@point-of-sale/receipt-printer-encoder';

/**
 * Abstract base class for all receipt builders.
 * Extend this class and implement build() to define your receipt layout.
 * Usage:
 *   class MyReceiptBuilder extends ReceiptBuilderBase {
 *     protected build() { ... }
 *   }
 *   const builder = new MyReceiptBuilder(...);
 *   const data = builder.encode();
 */
export abstract class ReceiptBuilderBase {
	protected encoder: ReceiptPrinterEncoder;

	constructor(options?: EncoderOptions) {
		this.encoder = new ReceiptPrinterEncoder(options);
		this.encoder.initialize();
	}

	/**
	 * Subclasses must implement this to build the receipt layout.
	 */
	protected abstract build(): void;

	/**
	 * Returns the encoded receipt data.
	 */
	encode(): Uint8Array {
		this.encoder.newline(); // Universal first newline for layout consistency
		this.build();
		return this.encoder.encode();
	}
}

/**
 * Example implementation for a queue ticket receipt.
 * Usage:
 *   const builder = new QueueReceiptBuilder('PEDIATRICS', 42, { columns: 32 });
 *   const data = builder.encode();
 */
export class QueueReceiptBuilder extends ReceiptBuilderBase {
	constructor(
		private department: string,
		private number: number,
		options?: EncoderOptions
	) {
		super(options);
	}

	protected build() {
		// Header with modern styling
		this.encoder
			.bold(true)
			.invert(true)
			.size(2, 2)
			.align('center')
			.text('QUEUE NUMBER')
			.invert(false)
			.size(1, 1)
			.bold(false)
			.newline(2);

		// Department with emphasis
		this.encoder.size(2, 1).bold(true).text(this.department).bold(false).size(1, 1).newline(2);

		// Large number display
		this.encoder
			.size(3, 3)
			.bold(true)
			.text(this.number.toString().padStart(3, '0'))
			.size(1, 1)
			.bold(false)
			.newline(2);

		// Decorative separator
		this.encoder.rule({ style: 'double' }).newline();

		// Footer info
		this.encoder
			.align('center')
			.text('Issued: ' + new Date().toLocaleString())
			.newline()
			.text('Please wait for your number to be called')
			.newline(2)
			.text('Thank you!')
			.newline(2)
			.cut();
	}
}
