import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { PushTestPage } from './pages/test/push-test';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { FormsModule } from '@angular/forms';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': 'fc18900f'
    },
    'push': {
        'sender_id': '162492874903',
        'pluginConfig': {
        'ios': {
            'badge': true,
            'sound': true
        },
        'android': {
            'iconColor': '#343434'
        }
        }   
    }
};

export let ROUTES: Routes = [
    { path: 'push-test', component: PushTestPage }
];


@NgModule({
    declarations: [
        PushTestPage
    ],
    imports: [
        BrowserModule,
        CloudModule.forRoot(cloudSettings),
        FormsModule
    ],
    providers: [ PushTestPage ],
    exports: [ PushTestPage ]
})
export class PushModule {}
