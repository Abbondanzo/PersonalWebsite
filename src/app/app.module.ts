import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";

import { App, About, Projects }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent } from './404/not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [ App, About, Projects, PageNotFoundComponent ],
  bootstrap: [ App ]
})
export class AppModule { }
