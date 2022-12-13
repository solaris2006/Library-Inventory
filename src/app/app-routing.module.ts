import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {path:'customers', component:CustomerComponent},
  {path:'books', component:BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
