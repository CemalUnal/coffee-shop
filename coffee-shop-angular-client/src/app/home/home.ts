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
    let storedUser = JSON.parse(this.cookieService.get('user'));
    if(storedUser['type'] == 'customer')
      this.displayType = false;
    else if(storedUser['type'] == 'owner')
      this.displayType = true;

  }
}
