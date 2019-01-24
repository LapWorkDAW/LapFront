import { Component, NgZone } from '@angular/core';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['../home/home.component.css', './register.component.css']
})

export class RegisterComponent {
    public addrKeys: string[];
    public addr: object;
  
    //Method to be invoked everytime we receive a new instance 
    //of the address object from the onSelect event emitter.
    setAddress(addrObj) {
      //We are wrapping this in a zone method to reflect the changes
      //to the object in the DOM.
      this.zone.run(() => {
        this.addr = addrObj;
        this.addrKeys = Object.keys(addrObj);
      });
    }
  
    constructor(private zone: NgZone) {}
 }