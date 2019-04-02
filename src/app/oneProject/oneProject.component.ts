import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: 'oneProject',
    templateUrl: './oneProject.component.html',
    styleUrls: ['./oneProject.component.css']
})
export class OneProjectComponent {
    id: number;
    constructor(private _router: Router,
        private _activRoute: ActivatedRoute) { }
    ngOnInit() {
        this._activRoute.params.forEach(
            (arrayParams: Params) => {
                console.dir(arrayParams);
                this.id = arrayParams["id"];
            });
    }
}