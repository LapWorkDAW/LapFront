import { Component } from '@angular/core';
/* import './app.js';
 */@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']

  /* TODO --> add app.js */
})
export class AppComponent {
  projects = [{
    idProject: "1",
    creator: "Mireia Colomer",
    name: "Marver Character Creation",
    desc: "This project consists in the creation for a movie.",
    type: "Tech",
    dateStart: "10/12/2018",
    dateFinish: "29/06/2018",
    img: "",
    projectStatus: "0"
    /* likes:"" projectstatus 1 acabat 0no acabat */
  }, {
    idProject: "2",
    creator: "Mireia Colomer",
    name: "Framework Creation",
    desc: "This project consists in the creation for our webpage framework",
    type: "Tech",
    dateStart: "10/12/2018",
    dateFinish: "29/06/2018",
    img: "",
    projectStatus: "1"
    /* likes:"" */
  }];
  project = {
    idProject: "",
    creator: "",
    name: "",
    desc: "",
    type: "",
    dateStart: "",
    dateFinish: "",
    img: "",
    projectStatus: ""
    /* likes:"" */
  };


}
