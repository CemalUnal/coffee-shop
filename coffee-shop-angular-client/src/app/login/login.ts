import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})

export class LoginScreen {

    username: string;
    password: string;
    // customers: any;
    // owners: any;

    constructor(
        public service: AppService,
        public _router: Router,
        private cookieService: CookieService
    ) {

    }

    public signIn() {

        let isOwner = null;

        if ((this.username == null && this.password == null) || (this.username == '' && this.password == ''))
            return alert('Both username and password are empty');
        else if (this.username == null || this.username == '')
            return alert('Username is empty');
        else if (this.password == null || this.password == '')
            return alert('Password is empty');
        else {

            this.service.signIn(
                this.username,
                this.password
            ).then((result) => {
                let user = JSON.parse(result)['data'];
                if (user['floorno'] != undefined ||
                    user['roomno'] != undefined ||
                    user['buildingno'] != undefined) {
                    let cookieValue = JSON.stringify({
                        type: 'customer',
                        data: {
                            id: user['id'],
                            username: user['username'],
                            realname: user['realname'],
                            surname: user['surname'],
                            floorno: user['floorno'],
                            roomno: user['roomno'],
                            buildingno: user['buildingno']
                        }
                    });
                    this.cookieService.set('user', cookieValue);
                }
                else {
                    let cookieValue = JSON.stringify({
                        type: 'owner',
                        data: {
                            id: user['id'],
                            username: user['username'],
                            realname: user['realname'],
                            surname: user['surname']
                        }
                    });
                    this.cookieService.set('user', cookieValue);
                }

                this._router.navigateByUrl('/home');
            }).catch((err) => {
                alert('User can not be logged in');
            });



        }

    }


}
