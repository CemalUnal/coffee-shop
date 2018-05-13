import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'home',
  templateUrl: './home.html'
})

export class HomeScreen {

  displayType : boolean;

  constructor(private cookieService: CookieService){

  }

  ngOnInit(){
    let storedUser = this.cookieService.get('user');
    let userType = storedUser.split(':')[0];
    this.displayType = (userType == 'false');
  }
}
