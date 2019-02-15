import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/assets/models/User';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    
  }

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  token = '';

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }


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