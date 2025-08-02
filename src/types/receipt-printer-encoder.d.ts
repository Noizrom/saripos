declare module '@point-of-sale/receipt-printer-encoder' {
	export interface PrinterModel {
		id: string;
		name: string;
	}

	export type Codepage =
		| 'ascii'
		| 'cp437'
		| 'cp720'
		| 'cp737'
		| 'cp771'
		| 'cp772'
		| 'cp774'
		| 'cp775'
		| 'cp850'
		| 'cp851'
		| 'cp852'
		| 'cp853'
		| 'cp855'
		| 'cp857'
		| 'cp858'
		| 'cp860'
		| 'cp861'
		| 'cp862'
		| 'cp863'
		| 'cp864'
		| 'cp865'
		| 'cp866'
		| 'cp869'
		| 'cp874'
		| 'cp1001'
		| 'cp1098'
		| 'cp1125'
		| 'cp3001'
		| 'cp3002'
		| 'cp3011'
		| 'cp3012'
		| 'cp3021'
		| 'cp3041'
		| 'cp3840'
		| 'cp3841'
		| 'cp3843'
		| 'cp3844'
		| 'cp3845'
		| 'cp3846'
		| 'cp3847'
		| 'cp3848'
		| 'iso8859-1'
		| 'iso8859-2'
		| 'iso8859-7'
		| 'iso8859-15'
		| 'windows1250'
		| 'windows1251'
		| 'windows1252'
		| 'windows1253'
		| 'windows1254'
		| 'windows1255'
		| 'windows1256'
		| 'windows1257'
		| 'windows1258'
		| 'epson/katakana'
		| 'epson/iso8859-2'
		| 'star/standard'
		| 'star/katakana'
		| 'star/cp874'
		| 'star/cp928'
		| 'bixolon/cp866'
		| 'bixolon/hebrew'
		| 'xprinter/hebrew'
		| 'pos8360/hebrew'
		| 'auto';

	export type BarcodeSymbology =
		| 'upca'
		| 'upce'
		| 'ean13'
		| 'ean8'
		| 'code39'
		| 'itf'
		| 'code93'
		| 'code128'
		| 'codabar'
		| 'gs1-128'
		| 'gs1-databar-omni'
		| 'gs1-databar-truncated'
		| 'gs1-databar-limited'
		| 'gs1-databar-expanded'
		| 'code128-auto';

	export interface BoxOptions {
		style?: 'none' | 'single' | 'double';
		width?: number;
		marginLeft?: number;
		marginRight?: number;
		paddingLeft?: number;
		paddingRight?: number;
		align?: 'left' | 'right';
	}

	export interface RuleOptions {
		style?: 'single' | 'double';
		width?: number;
	}

	export interface BarcodeOptions {
		height?: number;
		width?: number;
		text?: boolean;
	}

	export interface QrcodeOptions {
		model?: number;
		size?: number;
		errorlevel?: 'l' | 'm' | 'q' | 'h';
	}

	export interface Pdf417Options {
		width?: number;
		height?: number;
		columns?: number;
		rows?: number;
		errorlevel?: number;
		truncated?: boolean;
	}

	export type DitherAlgorithm = 'threshold' | 'bayer' | 'floydsteinberg' | 'atkinson';

	export interface TableColumn {
		width: number;
		marginLeft?: number;
		marginRight?: number;
		align?: 'left' | 'center' | 'right';
		verticalAlign?: 'top' | 'bottom';
	}

	export interface EncoderOptions {
		/**
		 * The model of the printer. If specified, the library will automatically
		 * configure the most important options.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/configuration.md#printer-model
		 */
		printerModel?: string;
		/**
		 * Number of characters per line (paper width).
		 *
		 * - For 57mm paper: use 32 or 35 columns
		 * - For 80mm paper: use 42, 44, or 48 columns
		 *
		 * See: https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/configuration.md#paper-width
		 */
		columns?: number;
		/**
		 * The printer language.
		 * @default 'esc-pos'
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/configuration.md#printer-language
		 */
		language?: 'esc-pos' | 'star-prnt' | 'star-line';
		/**
		 * The code page mapping for the printer.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/text.md#code-page-mappings
		 */
		codepageMapping?: string | Record<string, number>;
		/**
		 * Number of lines to feed before cutting the paper.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/configuration.md#feed-before-cut
		 */
		feedBeforeCut?: number;
		/**
		 * The character(s) to use for a newline.
		 * @default '\n'
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/configuration.md#newline
		 */
		newline?: string;
		/**
		 * The image mode to use for ESC/POS printers.
		 * @default 'column'
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/configuration.md#image-mode
		 */
		imageMode?: 'column' | 'raster';
		/**
		 * A list of candidate code pages to use for auto-encoding.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/text.md#auto-encoding
		 */
		codepageCandidates?: Codepage[];
		/**
		 * A function to create a canvas, required for using `image()` with an Image object in Node.js.
		 */
		createCanvas?: (...args: any[]) => any;
	}

	export default class ReceiptPrinterEncoder {
		/**
		 * A list of all supported printer models.
		 */
		static printerModels: PrinterModel[];

		constructor(options?: EncoderOptions);

		/**
		 * Initializes the printer.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#initialize
		 */
		initialize(): this;
		/**
		 * Sets the text alignment.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#align
		 */
		align(value: 'left' | 'center' | 'right'): this;
		/**
		 * Toggles or sets the bold text style.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#bold
		 */
		bold(value?: boolean): this;
		/**
		 * Toggles or sets the inverted text style (white on black).
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#invert
		 */
		invert(value?: boolean): this;
		/**
		 * Toggles or sets the italic text style. (Not widely supported)
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#italic
		 */
		italic(value?: boolean): this;
		/**
		 * Toggles or sets the underline text style.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#underline
		 */
		underline(value?: boolean): this;
		/**
		 * Sets the printer font.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#font
		 */
		font(value: string): this;
		/**
		 * Sets the text width.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#width
		 */
		width(value: number): this;
		/**
		 * Sets the text height.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#height
		 */
		height(value: number): this;
		/**
		 * Sets the text width and height.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#size
		 */
		size(width: number, height?: number): this;
		/**
		 * Prints a string of text with word wrapping.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#text
		 */
		text(value: string): this;
		/**
		 * Adds one or more newlines.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#newline
		 */
		newline(count?: number): this;
		/**
		 * Prints a line of text and adds a newline.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#line
		 */
		line(value: string): this;
		/**
		 * Sets the code page for text encoding.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#codepage
		 */
		codepage(value: Codepage | string): this;
		/**
		 * Prints a horizontal rule.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#rule
		 */
		rule(options?: RuleOptions): this;
		/**
		 * Cuts the paper.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#cut
		 */
		cut(type?: 'partial' | 'full'): this;
		/**
		 * Prints a QR code.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#qrcode
		 */
		qrcode(data: string, options?: QrcodeOptions): this;
		/**
		 * Prints a barcode.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#barcode
		 */
		barcode(data: string, symbology: BarcodeSymbology, options?: BarcodeOptions): this;
		/**
		 * Prints a PDF417 code.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#pdf417-code
		 */
		pdf417(data: string, options?: Pdf417Options): this;
		/**
		 * Prints an image.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#image
		 */
		image(
			image: any,
			width?: number,
			height?: number,
			dither?: DitherAlgorithm,
			threshold?: number
		): this;
		/**
		 * Prints a bordered box.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#box
		 */
		box(
			options: BoxOptions,
			content: string | ((encoder: ReceiptPrinterEncoder) => ReceiptPrinterEncoder)
		): this;
		/**
		 * Prints a table.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#table
		 */
		table(
			columns: Array<TableColumn>,
			rows: Array<Array<string | ((encoder: ReceiptPrinterEncoder) => ReceiptPrinterEncoder)>>
		): this;
		/**
		 * Sends a pulse to an external device (e.g., cash drawer).
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#pulse
		 */
		pulse(device?: number, on?: number, off?: number): this;
		/**
		 * Sends raw printer commands.
		 * @see https://github.com/NielsLeenheer/ReceiptPrinterEncoder/blob/main/documentation/commands.md#raw
		 */
		raw(data: number[]): this;
		/**
		 * Encodes all queued commands into a byte array.
		 */
		encode(): Uint8Array;
	}
}
