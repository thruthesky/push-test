import { Component } from '@angular/core';
import { PushTestPage } from '../push/pages/test/push-test';

@Component( {
    selector: 'home-page',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor ( private pushTest: PushTestPage ) {

        //Receive push notification
        this.pushTest.receivedPushNotification();

    }

}