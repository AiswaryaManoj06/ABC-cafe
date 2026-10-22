# ABC Cafe - Angular Ordering System

A responsive and interactive cafe order counter built with **Angular (Standalone Architecture)**, simulating a dynamic beverage ordering system.

## 📌 Project Overview
ABC Cafe allows counter staff or customers to enter their name, choose from a selection of beverages (Coffee, Tea, Juice, Soda), place an order, and dynamically maintain an accumulated order summary list.

---

## ✨ Features
- **Customer Name Entry:** Validates customer name and unlocks the order inquiry process.
- **Dynamic Order Inquiry:** Inquires *"What would [customerName] like to have?"* dynamically with two-way data binding.
- **Beverage Selection:** Interactive beverage cards with emoji indicators and radio selections.
- **Live Order History:** Pushes completed orders into an order summary with serial numbers and customer details.
- **Clean UI & Responsive Design:** Polished cafe card layout with smooth transitions, hover effects, and mobile-friendly styling.

---

## 🛠️ Angular Directives & Concepts Used
- `*ngIf`:
  - Conditionally displays the beverage list only after "Ask Order" is clicked.
  - Conditionally displays the Order Summary section only when orders exist (`customerOrders.length > 0`).
- `*ngFor`:
  - Iterates through the `beverages` array to render menu options.
  - Iterates through `customerOrders` with `let i = index` to render serial numbers formatted as `[sl.no] [customerName] ordered [beverage]`.
- `[(ngModel)]`: Two-way data binding for the customer name and beverage radio inputs.
- **Standalone Components & Zoneless Detection:** Built using Angular's modern standalone architecture and zoneless change detection.

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/YOUR_USERNAME/abc-cafe.git
cd abc-cafe
npm install
```

### 2. Development Server
Run the local dev server:
```bash
npm start
```
Navigate to `http://localhost:4200/` (or specify `--port <PORT>` if 4200 is occupied).

### 3. Build for Production
To generate a production build:
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
│   ├── app.component.css
│   ├── app.config.ts            # Application configuration
│   └── abc-cafe/
│       ├── abc-cafe.component.ts   # Ordering logic and component state
│       ├── abc-cafe.component.html # Interactive order counter UI
│       └── abc-cafe.component.css  # Scoped component styles
├── index.html
├── main.ts
└── styles.css
```
