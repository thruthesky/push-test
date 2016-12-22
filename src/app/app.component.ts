import { Component } from '@angular/core';

import { PushTestPage } from '../pages/push/pages/test/push-test';

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
  
  constructor( private pushtest: PushTestPage ) {
    document.addEventListener("deviceready", () => this.onDevinceReady(), false);
    this.pushtest.receivedPushNotification();
  }
  onDevinceReady() {
    console.log("yes, I am running in cordova.");
  }
  
}
