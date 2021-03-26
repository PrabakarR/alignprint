import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {

    let wrapBar = document.querySelector('.wrap-bar');
    let sidemenuHide = document.querySelector('.sidemenu-width');
    let sidemenuFule = document.querySelector('.side-menu-right');
    wrapBar.addEventListener('click',function(){
      sidemenuHide.classList.toggle('hides');
      sidemenuFule.classList.toggle('shows');
    });
  }

}
