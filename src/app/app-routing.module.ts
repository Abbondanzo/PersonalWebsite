import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { App, About, Projects }  from './app.component';
import { PageNotFoundComponent } from './404/not-found.component';

/* States */
const appRoutes: Routes = [
    { path: 'about',  component: About },
    { path: 'projects', component: Projects },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
