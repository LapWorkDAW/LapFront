
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../home/home.component.css', './login.component.css']
})

export class LogInComponent implements OnInit {
  constructor(private socialAuthService: AuthService, public router: Router) { }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      //Redirect a otra pagina
      this.router.navigate(['/privacyPolicy'])
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        console.log(userData.idToken);

        localStorage.setItem('token',userData.idToken);
        
        // Now sign-in with userData
        // ...

      }
    );
  }

  ngOnInit(): void {

  }

}