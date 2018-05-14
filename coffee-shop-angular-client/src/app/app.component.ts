import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public cookieService: CookieService, public _router: Router){}

  ngOnInit(){
    if(this.cookieService.get('user') == null || this.cookieService.get('user') == '')
      this._router.navigateByUrl('/login');
    else
      this._router.navigateByUrl('/home');
  }

}