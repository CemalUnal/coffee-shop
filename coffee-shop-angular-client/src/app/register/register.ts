import {Component} from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';

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
          alert(JSON.parse(result['_body'])['message']);
          this._router.navigateByUrl('/login');
      }).catch(err => {
          alert(err);
      });
  }

  public signUpForOwner(){

      if((this.ownUsername == null && this.ownPassword == null) || (this.ownUsername == '' && this.ownPassword == ''))
          return alert('Both username and password are empty');
      else if(this.ownUsername == null || this.ownUsername == '')
          return alert('Username is empty');
      else if(this.ownPassword == null || this.ownPassword == '')
          return alert('Password is empty');
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
              alert(err);
          });

  }

}
