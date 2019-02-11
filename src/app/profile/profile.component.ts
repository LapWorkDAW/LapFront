import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../home/home.component.css', './profile.component.css']
})
export class ProfileComponent implements OnInit {

    token = '';
    ngOnInit(): void {
        this.token = localStorage.getItem('token');
        if (this.token != "null") {
            console.log('token: ', this.token);
        } else {
            console.log("Usuario no logeado");
        }
    }

}