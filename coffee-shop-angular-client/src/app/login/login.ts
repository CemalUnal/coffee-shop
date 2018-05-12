import {Component} from '@angular/core';
import {AppService} from '../app.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class LoginScreen {

  username: string;
  password: string;

  constructor(public service: AppService, public _router: Router){}

  public signIn(){

    if(this.username == null && this.password == null)
      return alert('Both username and password are empty');
    else if(this.username == null)
      return alert('Username is empty');
    else if(this.password == null)
      return alert('Password is empty');

    this.service.signIn(
      this.username,
      this.password
    ).then(result => {
      if(result["_body"] != '') {
        this._router.navigateByUrl('/');
      }
      else
        return alert('The user with these username and password is not exist');
    });


  }

}
