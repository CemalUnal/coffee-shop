import {Component} from '@angular/core';
import {AppService} from '../app.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})

export class RegisterScreen {

  cusUsername: string;
  cusPassword: string;
  cusName: string;
  cusSurname: string;
  cusFloorno: number;
  cusBuildingno: number;
  cusRoomno: number;

  constructor(public service: AppService, public _router: Router){}

  public signUpForCustomer(){
      if(this.cusUsername == null && this.cusPassword == null)
        return alert('Both username and password are empty');
      else if(this.cusUsername == null)
        return alert('Username is empty');
      else if(this.cusPassword == null)
        return alert('Password is empty');

      this.service.signUpForCustomer(
        this.cusUsername,
        this.cusPassword,
        this.cusName,
        this.cusSurname,
        this.cusFloorno,
        this.cusBuildingno,
        this.cusRoomno,
      ).then(result => {
        if(result["username"] != null || result["password"] != null) {
          alert('The user has been successfully registered!');
          this._router.navigateByUrl('/login');
        }
        else
          return alert('The user with these username and password is not exist');
      });
  }

  public signUpForOwner(){

  }
  // public signIn(){
  //
  //   if(this.username == null && this.password == null)
  //     return alert('Both username and password are empty');
  //   else if(this.username == null)
  //     return alert('Username is empty');
  //   else if(this.password == null)
  //     return alert('Password is empty');
  //
  //   this.service.signIn(
  //     this.username,
  //     this.password
  //   ).then(result => {
  //     if(result["username"] != null || result["password"] != null)
  //       Route.navigateByUrl('/');
  //     else
  //       return alert('The user with these username and password is not exist');
  //   });
  //
  //
  // }

}
