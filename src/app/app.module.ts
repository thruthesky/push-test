import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { PushModule } from '../pages/push/push.module';

import { AppComponent } from './app.component';

import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';
import { PushTestPage } from '../pages/push/pages/test/push-test';

const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'push', component: PushTestPage},  
  { path: 'help', component: HelpPage}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HelpPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PushModule,
    RouterModule.forRoot( appRoutes )
  ],
  bootstrap: [ AppComponent ],
  providers: [ ]
})
export class AppModule {}


