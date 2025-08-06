# SariPOS

**Complete Sari-Sari Store Management System**

A comprehensive Point-of-Sale and business management solution designed specifically for sari-sari stores and small retail businesses in the Philippines.

## 🚀 Core Features

### 💰 Point of Sale System

- Complete POS interface with barcode scanning
- Inventory management with low-stock alerts
- Sales tracking and reporting
- Multi-payment method support (Cash, GCash, PayMaya)
- Customer management and loyalty programs

### 🖨️ Thermal Receipt Printing

- Bluetooth ESC/POS thermal printer integration
- Custom receipt templates with logo support
- Print receipts, invoices, and product labels
- Image printing capabilities for promotional materials
- Queue number printing for customer management

### 📋 Inventory & Stock Management

- Real-time inventory tracking
- Product categorization and pricing
- Supplier management
- Purchase order generation
- Expiry date tracking for perishables
- Barcode generation and management

### ⚡ Utility Bill Lookup & Payment

- Casureco electric bill lookup with API integration
- Other utility bill payment processing
- Commission tracking for bill payments
- Receipt generation for utility transactions

### 💬 Live Chat & Communication

- Firebase-powered real-time chat system
- Customer support integration
- Store-to-customer messaging
- Notification system for orders and updates

### 🔐 Authentication & User Management

- Firebase Authentication integration
- Role-based access control (Owner, Cashier, Staff)
- User activity logging
- Secure data synchronization

### 📊 Analytics & Reporting

- Daily sales reports
- Inventory movement tracking
- Profit margin analysis
- Customer purchase patterns
- Tax reporting and compliance

## 🛠️ Technology Stack

### Frontend

- **SvelteKit** (Svelte 5) - Modern reactive framework
- **DaisyUI + TailwindCSS v4** - Beautiful, responsive UI
- **TypeScript** - Type-safe development
- **@iconify/svelte** - Comprehensive icon library

### Backend & Database

- **Firebase Firestore** - Real-time NoSQL database
- **Firebase Auth** - Authentication and user management
- **Firebase Storage** - File and image storage
- **SvelteKit API Routes** - Server-side functionality

### Hardware Integration

- **Web Bluetooth API** - Thermal printer connectivity
- **@point-of-sale/receipt-printer-encoder** - Receipt formatting
- **Camera API** - Barcode scanning capabilities

### Development Tools

- **Bun** - Fast package manager and runtime
- **Vite** - Lightning-fast build tool
- **ESLint + Prettier** - Code quality and formatting

## 📱 Planned Features

### Phase 1 (Current)

- ✅ Basic POS interface
- ✅ Thermal printer integration
- ✅ Utility bill lookup
- ✅ Modern responsive UI

### Phase 2 (Next)

- 🔄 Firebase integration
- 🔄 Inventory management system
- 🔄 User authentication
- 🔄 Basic reporting

### Phase 3 (Future)

- 📋 Advanced analytics
- 💬 Live chat system
- 📱 Mobile app companion
- 🌐 Multi-store management
- 🤖 AI-powered insights

## 🚀 Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Type checking
bun run check

# Code formatting
bun run format

# Preview production build
bun run preview
```

## 📦 Installation

1. Clone the repository
2. Install dependencies with `bun install`
3. Set up Firebase configuration
4. Configure thermal printer settings
5. Run development server with `bun run dev`

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

---

**SariPOS** - Empowering Filipino sari-sari stores with modern technology 🇵🇭
