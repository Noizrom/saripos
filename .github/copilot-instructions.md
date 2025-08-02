# GitHub Copilot Instructions for test-web-bluetooth

This is a **Svelte 5 + SvelteKit** project for **Web Bluetooth ESC/POS printer integration** with a mobile-first queue management system and utility bill lookup.

## Architecture Overview

The project has two main functional areas:

1. **Queue Management System** (`/` route) - Mobile queue system for departments (OB, PEDIATRICS, MEDICINE, SURGERY) with Bluetooth thermal printer integration
2. **Bill Lookup System** (`/casureco` route) - Utility bill search with API proxy to bypass CORS

### Key Components

- **`src/lib/bluetooth-printer.ts`** - Core Bluetooth wrapper with verbose logging and connection state management
- **`src/lib/receipt-builder.ts`** - Abstract builder pattern for thermal receipts using `@point-of-sale/receipt-printer-encoder`
- **`src/types/receipt-printer-encoder.d.ts`** - Comprehensive TypeScript definitions for the receipt encoder library

## Technology Stack & Conventions

### Svelte 5 Runes Mode (CRITICAL)

- **Always use Svelte 5 runes**: `$state()`, `$derived()`, `$effect()` instead of legacy reactive statements
- **State management**: `let myVar = $state(initialValue)`
- **Computed values**: `let computed = $derived(() => expression)`
- **Side effects**: `$effect(() => { /* side effect code */ })`

### Styling & UI

- **TailwindCSS v4** with **DaisyUI** components - use `data-theme="light|dark"` for theming
- **Mobile-first design** - all components should work on mobile devices
- **Animations**: Use Svelte transitions (`crossfade`, `fade`, `fly`) for smooth UX

### Bluetooth Integration Pattern

```typescript
// Standard pattern for Bluetooth printer usage:
const printer = new BluetoothPrinter({ namePrefix: 'VOZY' }, [
	/* service UUIDs */
]);
await printer.connect();
const builder = new QueueReceiptBuilder(dept, number, options);
await printer.write(builder.encode());
```

### API Routes (SvelteKit Convention)

- **Server endpoints**: Use `+server.ts` files (e.g., `/src/routes/casureco/+server.ts`)
- **CORS workaround**: Proxy external APIs through SvelteKit endpoints to avoid browser CORS restrictions

## Development Workflows

### Package Manager

- **Use Bun**: `bun install`, `bun run dev`, `bun run build` (lockfile: `bun.lockb`)

### Key Commands

```bash
bun run dev          # Development server
bun run build        # Production build
bun run check        # TypeScript check
bun run format       # Prettier formatting
```

### State Persistence

- **localStorage pattern**: Use `$effect()` to persist state changes and restore on mount
- **Queue counters**: Automatically persisted to localStorage as JSON

## Project-Specific Patterns

### Receipt Building

- **Extend `ReceiptBuilderBase`** for new receipt types
- **Use encoder options**: `{ printerModel: 'pos-5890', columns: 32 }`
- **Universal newlines**: Append `\r\n` for proper ESC/POS formatting

### PIN Input Components

- **Separate input boxes** for each digit with auto-focus navigation
- **Combine digits**: Use `$derived()` to join individual digits into final value

### Animation Patterns

- **Crossfade for focus transfer**: Use Svelte's `crossfade()` for smooth element transitions between states
- **DaisyUI + transitions**: Combine DaisyUI classes with Svelte transition directives

### Error Handling

- **Verbose logging**: All Bluetooth operations log to arrays for debugging
- **User feedback**: Show errors in DaisyUI alert components
- **Connection state**: Expose `ready` boolean for UI state management

## Integration Points

### External Dependencies

- **Web Bluetooth API** - Direct browser integration, requires HTTPS in production
- **@point-of-sale/receipt-printer-encoder** - ESC/POS command generation
- **External APIs** - Proxied through SvelteKit endpoints to handle CORS

### Cross-Component Communication

- **Shared state**: Use Svelte stores for complex cross-component state
- **Props down, events up**: Standard Svelte component communication
- **Bluetooth state**: Managed in page components, passed to child components as needed
