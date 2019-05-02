import { Component } from "@angular/core";
import { User } from "src/assets/models/User";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ProjectService } from "../services/project.service";

@Component({
    selector: 'publicProfile',
    templateUrl: './publicProfile.component.html'
})
export class PublicProfileComponent {
    currentUser: User;
    user: User = new User();
    currentUserSubscription: Subscription;
    typesProject: Array<String>;
    allProjects: Array<String>;
    id: number;

    constructor(private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router,        
        private _activRoute: ActivatedRoute
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
        if (this.currentUser.photo == null || this.currentUser.photo == "") {
            this.currentUser.photo = 'assets/userAssets/photos/girl.jpg';
        } 
        this._activRoute.params.forEach(
            (arrayParams: Params) => {
                this.id = arrayParams["id"];
            });

            this.userService.getUserById(this.id).subscribe(
                result => {
                    this.user = result["data"];
                    if (this.user.photo == null || this.user.photo == "") {
                        this.user.photo = 'assets/userAssets/photos/girl.jpg';
                    } 
                    console.log(result["data"]);
                },
                error => {
                    console.log(error);
                }
            )

    }
    
      
   
}