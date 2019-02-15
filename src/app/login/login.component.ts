
import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { User } from 'dist/LapFront/assets/models/User';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../home/home.component.css', './login.component.css']
})

export class LogInComponent implements OnInit, OnDestroy {
  password = "password";
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  changeTypeToText() {
    this.password = "text";
  }
  changeTypeToPass() {
    this.password = "password";
  }
  constructor(private socialAuthService: AuthService, public router: Router, private authenticationService: AuthenticationService,
    private userService: UserService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  public socialSignIn(socialPlatform: string) {

    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        console.log(userData.idToken);
        localStorage.setItem('token', userData.idToken);
        //Redirect to profile
        this.router.navigate(['/profile'])
      }
    );
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    /*  this.userService.delete(id).pipe(first()).subscribe(() => {
         this.loadAllUsers()
     }); */
  }

  private loadAllUsers() {
    /* this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;
    }); */
  }
}