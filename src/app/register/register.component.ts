import { Component, NgZone, OnInit } from '@angular/core';
import { User } from 'src/assets/models/User';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator';
import { _getComponentHostLElementNode } from '@angular/core/src/render3/instructions';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

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
  isSelectCountry: boolean = false;

  constructor(private zone: NgZone, private userService: UserService, private formBuilder: FormBuilder, private router: Router,
    private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      country: [''],
      privacy: ['', Validators.requiredTrue],
      saveName: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });

    console.log("lleno:" + this.isSelectCountry);
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

  //Método de submit del formulario
  sendForm() {
    this.submitted = true;
    // stop here if form is invalid
    //Cogemos el campo de country para ver si ha puesto algo
    //Devuelve un true o un false que directamente le pasamos a la vista
    //para controlar con un ngIF si mostraremos el div del error o no
    this.isSelectCountry = <String>this.registerForm.get('country').value == "";

    /*
    console.log("lleno dentro sendForm:" + this.lleno);
    console.log(<String>this.registerForm.get('country').value == "");*/
    if (this.registerForm.invalid) {
      console.log("no valid");
      return;
    }
    /* this.registerForm.removeControl('country');
    this.registerForm.removeControl('confirmPassword');
    this.registerForm.removeControl('privacy'); */
    this.newUser = this.registerForm.value;
    console.log("hola user");
    console.log(this.newUser);
    //remove key from object
    delete this.newUser['country'];
    delete this.newUser['privacy'];
    delete this.newUser['confirmPassword'];
    this.newUser.latitude = this.addr["lat"];
    this.newUser.longitude = this.addr["lng"];
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          /* this.alertService.success('Registration successful', true); */
          /* this.router.navigate(['/login']); */
        },
        error => {
          /* this.alertService.error(error);
          this.loading = false; */
        });
    this.newUser = new User();
    this.registerForm.reset();

  }

}

