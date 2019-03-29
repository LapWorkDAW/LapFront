import { Component, NgZone, OnInit } from '@angular/core';
import { User } from 'src/assets/models/User';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { _getComponentHostLElementNode } from '@angular/core/src/render3/instructions';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { RegisterService } from '../services/register.service';

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
  isEmailExist: boolean = false;
  returnUrl: string;
  googleOK = false;

  constructor(private zone: NgZone, private userService: UserService, private formBuilder: FormBuilder, private router: Router,
    private authenticationService: AuthenticationService, private alertService: AlertService, private route: ActivatedRoute,
    private registerService: RegisterService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    window.setInterval(() => { this.googleOK = true; }, 100);
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      country: [''],
      privacy: ['', Validators.requiredTrue],
      saveName: [''],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('pass', 'confirmPassword')
      });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

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

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  //M�todo de submit del formulario
  sendForm() {
    this.submitted = true;
    // stop here if form is invalid
    //Cogemos el campo de country para ver si ha puesto algo
    //Devuelve un true o un false que directamente le pasamos a la vista
    //para controlar con un ngIF si mostraremos el div del error o no
    this.isSelectCountry = <String>this.registerForm.get('country').value == "";
    if (this.registerForm.invalid || this.isSelectCountry || this.isEmailExist) {
      return;
    }

    this.newUser = this.registerForm.value;
    //remove key from object
    delete this.newUser['country'];
    delete this.newUser['privacy'];
    delete this.newUser['confirmPassword'];
    //add key to object
    let userLocation = this.addr["city"] + ", " + this.addr["country"];
    this.newUser.location = userLocation;
    console.log("los ants de ingresar a bb");

    console.log(this.newUser.location);

    //save userName and pass for login
    let username = this.newUser.userName;
    let password = this.newUser.pass;

    //register
    this.userService.register(this.registerForm.value)
      .subscribe(
        resul => {
          //login
          this.authenticationService.login(username, password, null)
            .subscribe(
              resul => {
                this.router.navigate(['/profile']);
              },
              error => {
                this.alertService.error(error);
              });
        },
        error => {
          console.log("error");
          this.alertService.error(error);
        });
    this.newUser = new User();
    this.registerForm.reset();
  }

  checkEmail() {
    this.registerService.checkUserEmail(this.f.email.value).subscribe(
      resul => {
        this.isEmailExist = true;
      },
      error => {
        this.isEmailExist = false;
      });
  }
}

