import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './server-error-messages/server-error-messages.component';

@NgModule({
  declarations: [BreadCrumbComponent, PageHeaderComponent, FormFieldErrorComponent, ServerErrorMessagesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // Shared Components
    FormFieldErrorComponent,
    BreadCrumbComponent,
    PageHeaderComponent,
    ServerErrorMessagesComponent
  ]
})
export class SharedModule { }
