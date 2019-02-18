import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

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