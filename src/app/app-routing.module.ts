import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ReviewsComponent } from './products/reviews/reviews.component';
import { ProductComponent } from './products/product/product.component';

import { DashComponent } from './dash/dash.component';
import { ProductsTableComponent } from './products-table/products-table.component';

const routes: Routes = [
  { path: '', component: DashComponent },
  { path: 'prodotti', component: ProductsComponent },
  { path: 'dashboard', component: DashComponent },
  { path: 'tabella', component: ProductsTableComponent },
  { path: 'recensioni/:id', component: ReviewsComponent },
  { path: 'prodotto/:id', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
