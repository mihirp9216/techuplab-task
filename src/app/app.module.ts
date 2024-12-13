import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PinsListComponent } from './pins/pins-list/pins-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerModule } from './customers/customers.module';
import { PinsModule } from './pins/pins.module';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name'
};

@NgModule({
  declarations: [
    AppComponent,
    PinsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CustomerModule,
    PinsModule,
    NgxSelectModule.forRoot(CustomSelectOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
