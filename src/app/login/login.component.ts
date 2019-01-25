import { Component } from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['../home/home.component.css', './login.component.css']
})

export class LogInComponent {
    password = "password";
    changeTypeToText() {
        this.password = "text";
    }
    changeTypeToPass() {
        this.password = "password";
    }

}