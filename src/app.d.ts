// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Navigator {
		bluetooth: Bluetooth;
		vibrate(pattern: number | number[]): boolean;
	}
	interface Bluetooth {
		requestDevice(options: any): Promise<BluetoothDevice>;
	}
	interface BluetoothDevice {
		gatt?: BluetoothRemoteGATTServer;
	}
	interface BluetoothRemoteGATTServer {
		connect(): Promise<BluetoothRemoteGATTServer>;
		getPrimaryServices(): Promise<BluetoothRemoteGATTService[]>;
	}
	interface BluetoothRemoteGATTService {
		getCharacteristics(): Promise<BluetoothRemoteGATTCharacteristic[]>;
	}
	interface BluetoothRemoteGATTCharacteristic {
		readonly uuid: string;
		readonly properties: {
			readonly broadcast: boolean;
			readonly read: boolean;
			readonly writeWithoutResponse: boolean;
			readonly write: boolean;
			readonly notify: boolean;
			readonly indicate: boolean;
			readonly authenticatedSignedWrites: boolean;
			readonly reliableWrite: boolean;
			readonly writableAuxiliaries: boolean;
		};
		writeValue(value: BufferSource): Promise<void>;
	}
}

declare module '@point-of-sale/receipt-printer-encoder' {
	export default class ReceiptPrinterEncoder {
		constructor(options?: {
			printerModel?: string;
			columns?: number;
			language?: string;
			codepageMapping?: string;
		});

		initialize(): this;
		align(value: 'left' | 'center' | 'right'): this;
		bold(value?: boolean): this;
		invert(value?: boolean): this;
		size(width: number, height: number): this;
		text(value: string): this;
		newline(count?: number): this;
		line(value: string): this;
		rule(options?: { style?: 'single' | 'double' }): this;
		cut(type?: 'partial' | 'full'): this;
		qrcode(
			data: string,
			options?: { model?: number; size?: number; errorlevel?: 'l' | 'm' | 'q' | 'h' }
		): this;
		table(
			columns: Array<{ width: number; marginRight?: number; align?: 'left' | 'center' | 'right' }>,
			rows: Array<Array<string | ((encoder: ReceiptPrinterEncoder) => ReceiptPrinterEncoder)>>
		): this;
		encode(): Uint8Array;
	}
}

export {};
