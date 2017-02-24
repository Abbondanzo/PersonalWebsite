import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent, About, Projects }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent } from './404/not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [ AppComponent, About, Projects, PageNotFoundComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
