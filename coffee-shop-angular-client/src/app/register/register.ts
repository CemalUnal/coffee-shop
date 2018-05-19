import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Toast } from '../utils/toast/toast';

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

  ownUsername: string;
  ownPassword: string;
  ownName: string;
  ownSurname: string;

  constructor(
    public service: AppService,
    public _router: Router,
    private toast: Toast
  ) { }

  public signUpForCustomer() {
    if (this.cusUsername == null && this.cusPassword == null)
      return this.toast.makeToastErr('Both username and password are empty');
    else if (this.cusUsername == null)
      return this.toast.makeToastErr('Username is empty');
    else if (this.cusPassword == null)
      return this.toast.makeToastErr('Password is empty');

    this.service.signUpForCustomer(
      this.cusUsername,
      this.cusPassword,
      this.cusName,
      this.cusSurname,
      this.cusFloorno,
      this.cusBuildingno,
      this.cusRoomno,
    ).then(result => {
      alert(JSON.parse(result['_body'])['message']);
      this._router.navigateByUrl('/login');
    }).catch(err => {
      this.toast.makeToastErr(err);
    });
  }

  public signUpForOwner() {

    if ((this.ownUsername == null && this.ownPassword == null) || (this.ownUsername == '' && this.ownPassword == ''))
      return this.toast.makeToastErr('Both username and password are empty');
    else if (this.ownUsername == null || this.ownUsername == '')
      return this.toast.makeToastErr('Username is empty');
    else if (this.ownPassword == null || this.ownPassword == '')
      return this.toast.makeToastErr('Password is empty');
    else
      this.service.signUpForOwner(
        this.ownUsername,
        this.ownPassword,
        this.ownName,
        this.ownSurname
      ).then(result => {
        alert(JSON.parse(result['_body'])['message']);
        this._router.navigateByUrl('/login');
      }).catch(err => {
        this.toast.makeToastErr(err);
      });

  }

}
