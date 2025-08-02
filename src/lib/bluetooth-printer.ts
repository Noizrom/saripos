/**
 * BluetoothPrinter: Wrapper for connecting and communicating with a Bluetooth ESC/POS printer.
 * Provides verbose logging, error handling, and exposes connection state and diagnostics.
 */
export class BluetoothPrinter {
	private device: BluetoothDevice | null = null;
	private server: BluetoothRemoteGATTServer | null = null;
	private characteristic: BluetoothRemoteGATTCharacteristic | null = null;
	public ready: boolean = false;
	public lastError: string | null = null;
	public logMessages: string[] = [];

	constructor(
		private filters: any = { namePrefix: 'VOZY' },
		private optionalServices: any[] = []
	) {}

	/**
	 * Connects to the Bluetooth printer and finds a writable characteristic.
	 */
	async connect() {
		this.logMessages = [];
		this.lastError = null;
		try {
			this.log('🔍 Requesting Bluetooth device...');
			this.device = await (navigator as any).bluetooth.requestDevice({
				filters: [this.filters],
				optionalServices: this.optionalServices
			});
			this.log(`🔗 Device selected: ${this.device?.gatt ? 'GATT supported' : 'No GATT'}`);
			if (!this.device || !this.device.gatt) {
				this.ready = false;
				this.lastError = 'Device does not support GATT.';
				this.log('❌ Device does not support GATT.');
				return;
			}
			this.server = await this.device.gatt.connect();
			this.log('🔗 Connected to GATT server');
			const services = await this.server.getPrimaryServices();
			this.log(`🔍 Found ${services.length} services`);
			for (const svc of services) {
				this.log(`  Service: ${(svc as any).uuid}`);
				const chars = await svc.getCharacteristics();
				for (const c of chars) {
					this.log(
						`    Characteristic: ${c.uuid} (write: ${c.properties.write}, writeWithoutResponse: ${c.properties.writeWithoutResponse})`
					);
					if (c.properties.write || c.properties.writeWithoutResponse) {
						this.characteristic = c;
						this.log(`✅ Writable characteristic found: ${c.uuid}`);
						break;
					}
				}
				if (this.characteristic) break;
			}
			if (this.characteristic) {
				this.ready = true;
				this.log('✅ Printer ready for writing');
			} else {
				this.ready = false;
				this.lastError = 'No writable characteristic found.';
				this.log('⚠️ No writable characteristic found.');
			}
		} catch (err: any) {
			this.ready = false;
			this.lastError = err.message || String(err);
			this.log('❌ Connection error: ' + this.lastError);
		}
	}

	/**
	 * Writes data to the printer's writable characteristic.
	 */
	async write(data: BufferSource) {
		if (!this.ready || !this.characteristic) {
			this.log('❌ Printer not ready or writable characteristic missing');
			throw new Error('Printer not ready');
		}
		try {
			this.log(`📝 Writing to characteristic: ${this.characteristic.uuid}`);
			await this.characteristic.writeValue(data);
			this.log('✅ Write successful');
		} catch (err: any) {
			this.lastError = err.message || String(err);
			this.log('❌ Write error: ' + this.lastError);
			throw err;
		}
	}

	/**
	 * Returns current connection and printer state.
	 */
	getState() {
		return {
			device: this.device,
			server: this.server,
			characteristic: this.characteristic,
			ready: this.ready,
			lastError: this.lastError
		};
	}

	/**
	 * Adds a message to the log.
	 */
	private log(msg: string) {
		this.logMessages.push(msg);
	}
}
