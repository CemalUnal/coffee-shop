import {Component} from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class LoginScreen {

  username: string;
  password: string;
  customers: any;
  owners: any;

  constructor(
      public service: AppService,
      public _router: Router,
      private cookieService: CookieService
  ){

  }

  public signIn(){

      if((this.username == null && this.password == null) || (this.username == '' && this.password == ''))
          return alert('Both username and password are empty');
      else if(this.username == null || this.username == '')
          return alert('Username is empty');
      else if(this.password == null || this.password == '')
          return alert('Password is empty');
      else
          Promise.all([
              this.service.signInForCustomer(
                  this.username,
                  this.password
              ).then(result => {
                  this.customers = JSON.parse(result['_body'])['data'];
              }),
              this.service.signInForOwners(
                  this.username,
                  this.password
              ).then(result => {
                  this.owners = JSON.parse(result['_body'])['data'];
              })
          ])
          .then(resolve => {
              for(let i=0; i< this.customers.length; i++){
                  if(this.customers[i]['username'] == this.username){
                      this.cookieService.set('user','false:' + this.customers[i]['username']);
                      this._router.navigateByUrl('/');
                      return;
                  }
              }
              for(let i=0; i< this.owners.length; i++){
                  if(this.owners[i]['username'] == this.username){
                      this.cookieService.set('user','false:' + this.customers[i]['username']);
                      this._router.navigateByUrl('/');
                      return;
                  }
              }
              return alert('The user with these username and password is not exist');
          });

  }


}
