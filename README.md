# ABC Cafe - Angular Ordering & Performance System

A modern, responsive, and accessible cafe management application built with **Angular (Standalone Architecture)** featuring modular components, dynamic pipes, customer feedback tracking, performance analytics, and stack bar routing navigation.

---

## 📌 Project Overview

ABC Cafe simulates a full-cycle beverage ordering counter and customer satisfaction system:
1. **Counter Order Taking:** Counter staff enter customer names and take beverage orders (Coffee, Tea, Juice, Soda).
2. **Dynamic Order Summaries:** Live order listing formatted with serial numbers, customer names, and beverage choices formatted with Angular pipes.
3. **Customer Feedback:** Customers review their drinks as **Good**, **Average**, or **Poor** via an interactive review component upon consumption.
4. **Performance Analytics:** Real-time analytics engine calculating review statistics and evaluating overall cafe service performance.
5. **Menu Stack Bar Routing:** Navigation bar powered by Angular's Router to switch between the **Home (Counter)**, **Order List**, and **Performance** views.

---

## 🏗️ Architecture & Component Hierarchy

The application has been modularized into distinct, single-responsibility components and shared singleton services:

```
src/
├── app/
│   ├── app-routing.module.ts              # Dedicated routing module configuration
│   ├── app.config.ts                      # Zoneless change detection & router providers
│   ├── app.component.ts                   # Main application shell with MenuStackBar & RouterOutlet
│   ├── app.component.html                 # Top layout with <app-menu-stack-bar> & <router-outlet>
│   ├── app.component.css                  # Centered layout frame styling
│   │
│   ├── menu-stack-bar/                    # Top navigation stack bar
│   │   ├── menu-stack-bar.component.ts    # RouterLink & RouterLinkActive integration
│   │   ├── menu-stack-bar.component.html  # Links for Home, Order List, and Performance
│   │   └── menu-stack-bar.component.css   # Active item highlight and responsive styling
│   │
│   ├── services/
│   │   ├── order.service.ts               # Shared service preserving orders across routes
│   │   └── feedback.service.ts            # Shared review logging & performance calculation
│   │
│   ├── models/
│   │   └── customer-order.model.ts        # Typed interface for CustomerOrder
│   │
│   └── abc-cafe/
│       ├── counter/                       # Counter Component (Heading, DatePipe, Name Input)
│       ├── order-inquiry/                 # Order Inquiry Component (Dynamic [customerName])
│       ├── beverage-selection/            # Beverage Selection Component (*ngFor & radio choices)
│       ├── order-placement/               # Order Placement Component ("Place Order" action)
│       ├── order-summary/                 # Order Summary Component (UpperCasePipe & Consumed button)
│       ├── order-list/                    # Routed Order List View with Consumed reviews
│       ├── customer-review/               # Review Component (Good / Average / Poor buttons)
│       ├── performance/                   # Performance Component (Analytics & Status counts)
│       ├── abc-cafe.component.ts          # Main orchestrator component
│       ├── abc-cafe.component.html        # Composite template
│       └── abc-cafe.component.css         # Scoped styling
│
├── index.html
├── main.ts
└── styles.css
```

---

## 📖 Component Breakdown

### 1. Counter Component (`CounterComponent`)
- **Selector:** `app-counter`
- **Heading & Date:** Displays the counter heading alongside the current date formatted using Angular's **`DatePipe`** (`{{ currentDate | date:'fullDate' }}`).
- **Customer Name Input:** Two-way bound name entry (`[(ngModel)]="customerName"`).
- **"Ask Order" Action:** Validates non-empty input and triggers the inquiry workflow.
- **Dual Mode:** Functions as both an embedded child component and a standalone route component for `/home`.

### 2. Order Inquiry Component (`OrderInquiryComponent`)
- **Selector:** `app-order-inquiry`
- **Dynamic Prompt:** Interpolates and highlights the customer's name dynamically:
  ```html
  <p class="inquiry-prompt">
    What would <span class="highlight-name">{{ customerName }}</span> like to have?
  </p>
  ```

### 3. Beverage Selection Component (`BeverageSelectionComponent`)
- **Selector:** `app-beverage-selection`
- **Conditional Rendering:** Displayed conditionally via `*ngIf="orderInquiryActive"`.
- **Dynamic Options Grid:** Uses `*ngFor="let bev of beverages"` to render the beverage menu choices (`Coffee`, `Tea`, `Juice`, `Soda`).
- **Selection State:** Emits beverage selection changes back to the parent container.

### 4. Order Placement Component (`OrderPlacementComponent`)
- **Selector:** `app-order-placement`
- **Action:** Houses the **"Place Order"** button.
- **Order Dispatch:** Pushes the new order object into `OrderService` and `customerOrders`, resetting the inquiry state for subsequent customers.

### 5. Order Summary Component (`OrderSummaryComponent`)
- **Selector:** `app-order-summary`
- **Conditional Display:** Mounted only when orders exist (`*ngIf="customerOrders.length > 0"`).
- **Pipe Formatting:** Transforms drink names to uppercase using Angular's **`UpperCasePipe`**:
  `[sl.no]. [customerName] ordered [formattedBeverage].`
  ```html
  {{ i + 1 }}. {{ order.customerName }} ordered {{ order.beverage | uppercase }}.
  ```
- **"Consumed" Action:** Displays a **"Consumed"** button next to each active order item.

---

## ⭐ Feedback System & Performance Analytics

### 1. Shared `FeedbackService`
Injected as a singleton service across the application providing:
- **`logFeedback(order: string, feedback: string)`**: Records a customer's review with timestamp and order context.
- **`getFeedbackData()`**: Returns the full list of logged reviews.
- **`getReviewStats()`**: Computes the distribution of **Good**, **Average**, and **Poor** ratings.
- **`getPerformanceMessage()`**: Determines service quality status based on feedback ratios (`Excellent`, `Good`, `Needs improvement`).

### 2. Customer Review Component (`CustomerReviewComponent`)
- **Selector:** `app-customer-review`
- **Review Buttons:** Quick-rating buttons for **Good** (😊), **Average** (😐), and **Poor** (😞).
- **Workflow:**
  1. User clicks **"Consumed"** next to an order in the order list.
  2. `CustomerReviewComponent` opens for that specific order.
  3. Clicking a rating logs feedback to `FeedbackService`.
  4. The review card hides automatically, and the order's **"Consumed"** button is replaced by a `✅ Reviewed` badge.

### 3. Performance Component (`PerformanceComponent`)
- **Selector:** `app-performance`
- **Performance Evaluation:** Displays the overall rating message (`Excellent`, `Good`, or `Needs improvement`) retrieved from `FeedbackService`.
- **Status Counts Toggle:** Includes a button (**"Show Review Counts"** / **"Hide Review Counts"**) that displays live counts of **Good**, **Average**, **Poor**, and **Total Reviews**.

---

## 🧭 Menu Stack Bar & Angular Routing

### 1. Routing Module (`AppRoutingModule`)
Configured in `app-routing.module.ts`:
```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: CounterComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: '**', redirectTo: 'home' }
];
```

### 2. Menu Stack Bar (`MenuStackBarComponent`)
- Embedded at the top of `app.component.html`.
- Uses Angular's **`RouterLink`** directive for instant client-side transitions.
- Employs **`routerLinkActive="active"`** to highlight the current navigation item with custom styles (`.active`).

---

## 🛠️ Directives & Pipes Summary

| Feature | Angular Utility | Purpose in ABC Cafe |
| :--- | :--- | :--- |
| **Current Date** | `DatePipe` | Formats current counter date: `{{ currentDate \| date:'fullDate' }}` |
| **Drink Formatting** | `UpperCasePipe` | Formats beverage names in order summary: `{{ order.beverage \| uppercase }}` |
| **Inquiry Display** | `*ngIf` | Conditionally mounts beverage selection only after name is entered |
| **Summary Display** | `*ngIf` | Displays order list only when `customerOrders.length > 0` |
| **Review Card** | `*ngIf` | Displays feedback dialog only when an order is marked consumed |
| **Menu Iteration** | `*ngFor` | Generates beverage choices dynamically from array |
| **Orders Iteration** | `*ngFor` | Iterates over placed orders and renders numbered badges (`let i = index`) |
| **Route Links** | `routerLink` | Client-side navigation between Home, Order List, and Performance |
| **Active Highlight** | `routerLinkActive` | Dynamically applies `.active` CSS class to the active menu link |

---

## ⚡ Challenges Faced & Solutions

| Challenge | Context | Solution |
| :--- | :--- | :--- |
| **State Persistence Across Routes** | Navigating between `/home` and `/order-list` in Angular creates new component instances, which would discard in-memory arrays. | Created a shared singleton `OrderService` (`providedIn: 'root'`) so orders placed at the Counter persist into the Order List across navigation. |
| **Consumed Button Visibility** | The requirement specifies that once a review is submitted, the "Consumed" button must no longer be visible. | Added `consumed?: boolean` to `CustomerOrder`. When review is submitted, `order.consumed = true` removes the button via `*ngIf="!order.consumed"` and shows `✅ Reviewed`. |
| **Zoneless Setup (`NG0908`)** | Standalone starter without Zone.js. | Configured `provideZonelessChangeDetection()` in `app.config.ts` for native zoneless rendering. |
| **Module & Standalone Compatibility** | Project required `app-routing.module.ts` while running standalone `bootstrapApplication`. | Exported `routes` and `AppRoutingModule` simultaneously, configuring both `provideRouter(routes)` and `importProvidersFrom(AppRoutingModule)` in `app.config.ts`. |

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/AiswaryaManoj06/ABC-cafe.git
cd ABC-cafe
npm install
```

### 2. Run Development Server
```bash
npm start
```
Open your browser and navigate to:
👉 **`http://localhost:4200/`** (or **`http://localhost:4201/`**)

### 3. Production Build
```bash
npm run build
```
Bundle artifacts will be compiled into `dist/cafe/`.

---

## 🔗 Live Repository
- **GitHub:** [https://github.com/AiswaryaManoj06/ABC-cafe](https://github.com/AiswaryaManoj06/ABC-cafe)
