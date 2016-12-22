import { Component } from '@angular/core';
@Component({
  selector: `app-component`,
  template: `
    <header>
      <nav>
          <span routerLink="/">Home</span>        
          <span routerLink="/push">Push</span>        
          <span routerLink="/help">Help</span>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {
  
  constructor() {
    document.addEventListener("deviceready", () => this.onDevinceReady(), false);
  }
  onDevinceReady() {
    console.log("yes, I am running in cordova.");
  }
  
}
