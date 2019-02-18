import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/assets/models/User';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../home/home.component.css', './profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {

    }

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    token = '';
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    ngOnInit(): void {
        this.token = localStorage.getItem('token');
        if (this.token != "null") {
            console.log('token: ', this.token);
        } else {
            console.log("Usuario no logeado");
        }

        this.loadAllUsers();
    }

    deleteUser(id: number) {
        /* this.userService.delete(id).pipe(first()).subscribe(() => {
          this.loadAllUsers()
        }); */
      }
    
      private loadAllUsers() {
        /* this.userService.getAll().pipe(first()).subscribe(users => {
          this.users = users;
        }); */
      }

}