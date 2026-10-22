# ABC Cafe - Angular Ordering System

A responsive, accessible, and interactive cafe ordering system built with **Angular (Standalone Architecture)**, simulating a dynamic beverage order-taking workflow.

---

## 📌 Project Overview
ABC Cafe allows counter staff or customers to enter their name, choose from a selection of beverages (Coffee, Tea, Juice, Soda), place an order, and dynamically view an accumulated order summary list formatted with serial numbers.

---

## 📖 Code Explanation & Implementation Details

### 1. Component State & Data Flow (`abc-cafe.component.ts`)
- **`customerName` (string):** Tracks the customer's name input using two-way data binding (`[(ngModel)]`).
- **`orderInquiryActive` (boolean):** A state flag that remains `false` until the user enters a valid customer name and clicks the **"Ask Order"** button, triggering the beverage selection UI.
- **`selectedBeverage` (string):** Holds the currently selected radio button value from the beverage menu.
- **`beverages` (string array):** Contains the available beverage choices (`['Coffee', 'Tea', 'Juice', 'Soda']`), acting as the single source of truth for menu items.
- **`customerOrders` (array):** Stores order objects containing `{ customerName, name, beverage }`.
- **`askOrder()`:** Validates that the input is non-empty (`this.customerName.trim()`) and toggles `orderInquiryActive = true`.
- **`placeOrder()`:** Validates both the customer name and selected beverage, creates an order entry, appends it to `customerOrders`, and resets the form state for the next customer.

---

## 🛠️ Appropriate Use of `*ngIf` and `*ngFor` Directives

### `*ngIf` (Conditional DOM Rendering)
1. **Dynamic Order Inquiry:**
   ```html
   <div *ngIf="orderInquiryActive" class="card-section order-inquiry animate-fade-in">
   ```
   The beverage selection card is conditionally mounted to the DOM only after the user enters their name and triggers the inquiry process.
2. **Order Summary Rendering:**
   ```html
   <div *ngIf="customerOrders.length > 0" class="card-section order-summary animate-fade-in">
   ```
   The order summary container remains unmounted until at least one order has been placed (`customerOrders.length > 0`), maintaining a clean, uncluttered interface.

### `*ngFor` (Dynamic List Iteration)
1. **Beverage Menu Options:**
   ```html
   <label *ngFor="let bev of beverages" class="beverage-card" [class.selected]="selectedBeverage === bev">
     <input type="radio" name="beverage" [value]="bev" [(ngModel)]="selectedBeverage" />
     <span class="bev-name">{{ bev }}</span>
   </label>
   ```
   Iterates through the `beverages` array dynamically. New beverages can be added to the TypeScript array without modifying the HTML template.
2. **Order Summary History with Serial Numbers:**
   ```html
   <li *ngFor="let order of customerOrders; let i = index" class="order-item">
     <span class="order-badge">#{{ i + 1 }}</span>
     <div class="order-info">
       {{ i + 1 }}. <span class="order-customer">{{ order.customerName }}</span> ordered <span class="order-drink">{{ order.beverage }}</span>
     </div>
   </li>
   ```
   Iterates over the accumulated orders, utilizing Angular's `let i = index` to render serial numbers formatted cleanly as `[sl.no] [customerName] ordered [beverage]`.

---

## ⚡ Challenges Faced & Solutions

| Challenge | Cause / Context | Solution Implemented |
| :--- | :--- | :--- |
| **Zone.js Dependency Error (`NG0908`)** | Modern Angular 19+ standalone setups no longer bundle `zone.js` by default, but standard starters might try calling `provideZoneChangeDetection()`. | Replaced the legacy provider in `app.config.ts` with `provideZonelessChangeDetection()`, allowing Angular to operate natively in high-performance zoneless mode. |
| **Preventing Empty / Whitespace Orders** | Users could accidentally click "Ask Order" with empty or space-only input. | Added trimming validation `[disabled]="!customerName.trim()"` to disable the button and checked `.trim()` in `askOrder()` and `placeOrder()`. |
| **Radio Grouping Across Iterations** | Dynamic radio inputs created with `*ngFor` need unified grouping. | Unified the inputs under a shared `name="beverage"` attribute and bound `[(ngModel)]="selectedBeverage"` with `[value]="bev"`. |
| **Port Conflict during Local Serve** | Development port `4200` was occupied by an existing local process. | Implemented flexible port forwarding using `npm start -- --port 4201` to enable simultaneous local execution without interrupting other projects. |

---

## 🎯 Clean Code & Angular Best Practices

- **Standalone Components:** Used Angular's modern standalone architecture (`standalone: true`) without requiring NgModule ceremony.
- **Explicit Imports:** Each component explicitly imports only the modules it requires (`CommonModule`, `FormsModule`).
- **Strong Typing:** Defined a clear `CustomerOrder` interface for typed state management.
- **Scoped Styles:** Kept styling modular and encapsulated inside `abc-cafe.component.css`, avoiding global style pollution.
- **User Experience (UX):** Added smooth CSS micro-interactions, responsive grid layouts, and keyboard accessibility (`Enter` key triggers order inquiry).

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/AiswaryaManoj06/ABC-cafe.git
cd ABC-cafe
npm install
```

### 2. Development Server
Run the local dev server:
```bash
npm start
```
Navigate to `http://localhost:4200/` (or `http://localhost:4201/`).

### 3. Build for Production
To generate an optimized production build:
```bash
npm run build
```
Output files will be saved in `dist/cafe/`.

---

## 📂 Project Structure
```
src/
├── app/
│   ├── app.component.ts         # Root component mounting ABC Cafe
│   ├── app.component.html       # Contains <app-abc-cafe />
│   ├── app.component.css        # Root layout styles
│   ├── app.config.ts            # Zoneless application configuration
│   └── abc-cafe/
│       ├── abc-cafe.component.ts   # Ordering logic and component state
│       ├── abc-cafe.component.html # Interactive order counter UI
│       └── abc-cafe.component.css  # Scoped component styling
├── index.html
├── main.ts
└── styles.css
```
