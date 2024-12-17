import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
  declarations: [CreateCustomerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSelectModule],
  exports: [CreateCustomerComponent],
})
export class CustomerModule {}
