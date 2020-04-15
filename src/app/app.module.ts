import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ShowCitiesComponent } from './components/show-cities/show-cities.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    ShowCitiesComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));