import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './abc-cafe/counter/counter.component';
import { OrderListComponent } from './abc-cafe/order-list/order-list.component';
import { PerformanceComponent } from './abc-cafe/performance/performance.component';
import { AbcCafeComponent } from './abc-cafe/abc-cafe.component';

/**
 * Routes defining navigation for the main ABC Cafe components:
 * - Home -> CounterComponent
 * - Order List -> OrderListComponent
 * - Performance -> PerformanceComponent
 */
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: CounterComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'cafe', component: AbcCafeComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
