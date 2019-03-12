import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { User } from 'src/assets/models/User';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ConditionalExpr } from '@angular/compiler';
import { Router } from '@angular/router';
import { GooglePlacesDirective } from '../google-places.directive';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../home/home.component.css', './profile.component.css']
    ,providers:[GooglePlacesDirective]
})
export class ProfileComponent implements OnInit, OnDestroy {

    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    userLocation: String;


    ngOnDestroy(): void { }

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService, private router: Router,
         private googlePlacesDirective: GooglePlacesDirective
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        if (this.currentUser == null) {
            this.router.navigate(['']);
        }
    }


    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log(this.currentUser);
        //Retrieve address in string format
      this.googlePlacesDirective.getAddress(this.currentUser.latitude, this.currentUser.longitude);
      this.userLocation =localStorage.getItem("city");  
      console.log(this.googlePlacesDirective.getAddress(this.currentUser.latitude, this.currentUser.longitude));
        console.log(this.userLocation);
        
    }

    deleteUser(id: number) {
        /* this.userService.delete(id).pipe(first()).subscribe(() => {
          this.loadAllUsers()
        }); */
    }

}