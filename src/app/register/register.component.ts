import { Component, NgZone, OnInit } from '@angular/core';
import { User } from 'src/assets/models/User';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../home/home.component.css', './register.component.css']
})

export class RegisterComponent implements OnInit {
  public addrKeys: string[];
  public addr: object;
  newUser: User = new User();

  constructor(private zone: NgZone, private userService: UserService) { }

  ngOnInit() { }

  //Method to be invoked everytime we receive a new instance 
  //of the address object from the onSelect event emitter.
  setAddress(addrObj) {
    //We are wrapping this in a zone method to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      //add new values to object User
      this.newUser.latitude = this.addr["lat"];
      this.newUser.longitude = this.addr["lng"];
      /* console.log(this.newUser); */
    });
  }

  sendForm() {
    console.log(this.newUser);
  }

}