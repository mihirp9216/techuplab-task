import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSelectModule } from 'ngx-select-ex';
import { AddPinComponent } from './add-pin/add-pin.component';
import { PinsListComponent } from './pins-list/pins-list.component';

@NgModule({
  declarations: [AddPinComponent, PinsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FileUploadModule,
  ],
  exports: [PinsListComponent, AddPinComponent],
})
export class PinsModule {}
