import { Component, NgZone, OnInit } from '@angular/core';
import { User } from 'src/assets/models/User';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../home/home.component.css', './register.component.css']
})

export class RegisterComponent implements OnInit {
  public addrKeys: string[];
  public addr: object;
  newUser: User = new User();
  registerForm: FormGroup;
  submitted = false;

  constructor(private zone: NgZone, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      country: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      privacy: ['', Validators.requiredTrue],
      saveName: [''],
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

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

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  sendForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log("no valid");
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    this.newUser=this.registerForm.value;
    console.log(this.newUser);
    this.registerForm.reset();
  }

}