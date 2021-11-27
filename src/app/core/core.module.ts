import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDatabase } from '../in-memory-database';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //
    NavbarComponent

  ]
})
export class CoreModule { }
