
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

  changeTypeToText() {
    this.password = "text";
  }
  changeTypeToPass() {
    this.password = "password";
  }
  constructor(private socialAuthService: AuthService, public router: Router, private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private alertService: AlertService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.authenticationService.login(userData.email, null, userData.idToken)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.alertService.error(error);
            });

         //Redirect to profile
        /*  this.router.navigate(['/profile']) */
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

    this.authenticationService.login(this.f.username.value, this.f.password.value, null)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
        });
  }

}