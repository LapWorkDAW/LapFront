import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scrollTop',
    templateUrl: './scrollTop.component.html',
    styleUrls: [],
    styles: [`
  #arriba {  
    display: none;
    background: #009999;
    border: none;
    border-radius: 20px;
    position: fixed;
    right: 55px;
    bottom:30px;
    z-index: 9;
    text-align: center;
}  
#arriba:hover {
    background-color: #ff9585;    
} 
  `],
})

export class ScrollTopComponent implements OnInit {    

    ngOnInit(): void {
        window.addEventListener("scroll", this.scrollFunction);
    }

    scrollFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("arriba").style.display = "block";
        } else {
            document.getElementById("arriba").style.display = "none";
        }
    }

    topFunction() {        
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

}