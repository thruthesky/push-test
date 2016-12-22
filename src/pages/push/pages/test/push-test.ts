import { Component, OnInit } from '@angular/core';
import { Push, PushToken } from '@ionic/cloud-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'push-test-page',
    templateUrl : 'push-test.html'
    })
    
export class PushTestPage implements OnInit {

    isChecked: boolean;
    pushTitle: string;    
    pushMessage: string;
    pushValidate: string;
    devices;
    deviceTokens;
    token;
    pushToken: PushToken
    container = [];

    url = "https://api.ionic.io/"
    API_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMWVkNmNiZC0yNTk5LTQxNTctYWU5OC0wNWFiZTAwMDM1ZDgifQ.-FZ9f9BnG_da2AP-mxZhF4Ff4qmj-kotuNv7GyonAtc";

    headers: Headers = new Headers({
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + this.API_Token
    });
    options = new RequestOptions({ "headers" : this.headers });

    constructor( private push: Push,
                 private http: Http ){ }

    ngOnInit(){
        this.getTokens(); //Gets all valid tokens on initialize
       
    }

    //Received push notification
    receivedPushNotification(){
        this.push.rx.notification()
            .subscribe( msg => {
                alert( msg.title + ': ' + msg.text );
                console.log( "Push notification received." );
            } );
    }

    //Get the list of tokens of devices that are registered to push service
    getTokens(){
        this.container = [];
        this.http.request( this.url + "push/tokens" , this.options )
            .subscribe( res => {
                this.deviceTokens = JSON.parse( res['_body'] ).data;
                console.log( "No. of Tokens: " + this.deviceTokens.length );
                this.deviceTokens.forEach( devToken => {
                    // console.log( "Token: " , devToken);
                    if( devToken.valid )
                        this.container.push( devToken );
                        // console.log('Container : ', this.container );
                });
            }, err => console.log( "Cannot get list of tokens. Error:  ", err ));
    }

    // Validates user input and selection
    validatePushInput(){
        if( this.pushTitle == null || this.pushTitle == '' ){
            this.pushValidate = "No push title provided."
            return false;
        } 
        if( this.pushMessage == null || this.pushMessage == '' ){
            this.pushValidate = "No push message provided."
            return false;            
        }
        if( this.devices == null || this.devices == '' ){
            this.pushValidate = "No device(s) selected."
            return false;
        }
        this.pushValidate = '';
        return true;
    }

    //Clears all field
    clearAll(){
        this.pushTitle = ""
        this.pushMessage = ""
        this.devices = [];
        this.isChecked = false;
    }

    //Register for push notification
    onClickRegisterPushNotification(){
        if( !this.pushToken ){
            this.push.register()
                .then( pushToken => {
                    alert( "Registration successful" );
                    console.log( "Registration success" );
                    return  this.push.saveToken( pushToken );
                } ).then( ( pushToken ) => {
                    this.pushToken = pushToken;
                    this.token = pushToken.token;
                    this.getTokens(); // Update list of registered tokens
                    console.log("Token saved", pushToken.token);
                },  err => alert( "Registration failed. Error:  " + err ));
            return;
        }
            this.push.unregister() 
                .then( pushToken => {
                    alert( "Successfully unregistered from push service." );
                    console.log( "Successfully unregistered device. Deleting this device token: ", this.pushToken );
                    this.http.delete( this.url + "push/tokens/" + this.pushToken.id , this.options )
                        .subscribe( () => console.log( "Token deleted" ),
                         err => console.log( "Cannot delete this device token. Error: " + err ) );
                            this.token = "";
                            this.pushToken = null;
                            this.getTokens(); // Update list of registered tokens
                }, err => alert( "Unregistered failed! Error:  " + err ));
        
    }

    
    selectAllToggle(){
        if( this.devices.length == this.container.length) this.isChecked = true;
        else this.isChecked = false;
    }
    
    //Check if all items are selected
    onClickSelectAll( isChecked ){
        // console.log( "Selected: ", pushSelectAll );
        console.log('trigger check ' + isChecked)
        if( isChecked == true ){
            this.devices = [];
            this.container.forEach( c => this.devices.push( c.token ));
            return;
        }
            this.devices = [];
    }

    //Send push notification
    onClickSendPushNotification( devices ){
        
        let data = {
        "tokens": devices,
        "profile": "ionichack", // Change profile with your app's profile in Ionic Cloud
        "notification": {
            "title" : this.pushTitle,
            "message": this.pushMessage
            }
        }
        if( this.validatePushInput() == false) return;
        console.log( "Selected devices: " , devices );
        this.http.post( this.url + "push/notifications" , data , this.options)
            .subscribe( ( ) => {
                console.log( "Push successfully send" );
                this.clearAll();
            }, err  =>  console.log( "Push failed to send. Error:  " , err ));
    }


}