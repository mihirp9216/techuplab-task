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
    PinsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
