import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinsListComponent } from './pins-list/pins-list.component';
import { AddPinComponent } from './add-pin/add-pin.component';



@NgModule({
  declarations: [
    AddPinComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PinsModule { }
