import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, HomeModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
