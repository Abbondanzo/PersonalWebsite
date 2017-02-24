import { Component } from '@angular/core';

export class Hero {
    id: number;
    name: string;
}

@Component({
  selector: 'my-app',
  template:`
  <h1>{{title}}</h1>
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name">
  </div>
  <a routerLink="/about" routerLinkActive="active">
      <button class="btn btn-white">About</button>
  </a>
  <router-outlet></router-outlet>
  `
})
export class App  {
    title = 'Angular Demo';
    hero: Hero = {
      id: 1,
      name: 'Windstorm'
    };
}

@Component({
  template: '<h3>Its the UI-Router hello world app!</h3>'
})
export class About { }

@Component({
  template: '<h3>Hello world!</h3>'
})
export class Projects { }
