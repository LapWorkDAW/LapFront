
import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { User } from 'src/assets/models/User';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../home/home.component.css', './login.component.css']
})

export class LogInComponent implements OnInit {
  password = "password";
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  isEmailExist: boolean;
  userExist: boolean;
  userGoogle: User = new User();

  //TODO: on key down apear img
  showEye() {

  }
  changeTypeToText() {
    this.password = "text";
  }
  changeTypeToPass() {
    this.password = "password";
  }

  constructor(private socialAuthService: AuthService, public router: Router, private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder, private registerService: RegisterService, private userService: UserService,
    private route: ActivatedRoute, private alertService: AlertService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/profile']);
    }
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData.token);
        let fullName = userData.name.split(" ");
        this.userGoogle.firstname = fullName[0];
        this.userGoogle.surname = fullName[1];
        this.userGoogle.email = userData.email;
        this.userGoogle.token = userData.token;
        this.userGoogle.photo = userData.image;
        this.checkEmail(userData.email);
      }
    );
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.login(this.f.username.value, this.f.password.value, null);
  }

  checkEmail(email: string) {
    this.registerService.checkUserEmail(email).subscribe(
      resul => {
        this.login(this.userGoogle.email, null, this.userGoogle.token);
      },
      error => {
        console.log("Mal");
        console.log(this.userGoogle);
        this.userService.register(this.userGoogle)
          .subscribe(
            resul => {
              console.log("bien");
              this.login(this.userGoogle.email, null, this.userGoogle.token);
            },
            error => {
              console.log("error");
              this.alertService.error(error);
            });
      });
  }

  login(email, password, token) {
    this.authenticationService.login(email, password, token)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/profile'])
        },
        error => {
          this.alertService.error(error);
          this.router.navigate([this.returnUrl]);
        });
  }

}