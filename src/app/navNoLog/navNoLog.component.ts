import { Component} from '@angular/core';
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';

@Component({
    selector: 'navNoLog',
    templateUrl: './navNoLog.component.html',
    styleUrls: ['../home/home.component.css', './navNoLog.component.css']
})

export class NavNoLogComponent {
    
    constructor(private socialAuthService: AuthService, public router: Router) { }
    public signOut() {
        this.socialAuthService.signOut();
        this.router.navigate(['/']);
        console.log("user logOut");
        localStorage.setItem('token',"null");

    }

    ngOnInit() {}
}