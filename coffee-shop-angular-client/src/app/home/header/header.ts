import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Popup } from '../../utils/popup/popup';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Toast } from '../../utils/toast/toast';

@Component({
    selector: 'header',
    templateUrl: './header.html',
    styleUrls: ['./header.css']
})

export class HeaderComponent implements OnInit {

    @Input() username: String;
    @Input() displayType: Boolean;

    constructor(
        public dialog: MatDialog,
        private cookieService: CookieService,
        public _route: Router,
        public appService: AppService,
        private toast: Toast
    ) { }

    ngOnInit() {
        let cookieValue = this.cookieService.get('user');
        if (JSON.parse(cookieValue)['type'] == 'customer') {
            this.displayType = false;
        }
        else {
            this.displayType = true;
        }
        this.username = JSON.parse(cookieValue)['data']['username'];
    }

    openPreferences(): void {
        let cookieValue = this.cookieService.get('user');
        let userInfo = JSON.parse(cookieValue)['data'];
        //owner ise düzeltme yapmayacak
        let dialogRef = this.dialog.open(Popup, {
            data: {
                header: 'Change User Settings',
                fields: [
                    { name: 'Password', value: userInfo['password'], type:'password' },
                    { name: 'Name', value: userInfo['realname'] },
                    { name: 'Surname', value: userInfo['surname'] },
                    { name: 'Floor No', value: userInfo['floorno'], type: 'number' },
                    { name: 'Building No', value: userInfo['buildingno'], type: 'number' },
                    { name: 'Room No', value: userInfo['roomno'], type: 'number' }
                ]
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                console.log(result);
                this.appService.setCustomer(
                    userInfo['id'],
                    userInfo['username'],
                    result['fields'][0]['value'],
                    result['fields'][1]['value'],
                    result['fields'][2]['value'],
                    result['fields'][3]['value'],
                    result['fields'][4]['value'],
                    result['fields'][5]['value']
                ).then((value => {
                    let cookieValue = JSON.stringify({
                        type: 'customer',
                        data: {
                            id: userInfo['id'],
                            username: userInfo['username'],
                            realname: result['fields'][1]['value'],
                            surname: result['fields'][2]['value'],
                            floorno: result['fields'][3]['value'],
                            roomno: result['fields'][4]['value'],
                            buildingno: result['fields'][5]['value']
                        }
                    });
                    this.cookieService.set('user', cookieValue);

                    this.toast.makeToast('The user has successfully updated');
                }));
            }
        });


    }

    logout(): void {
        this.cookieService.set('user',null);
        this._route.navigateByUrl('/login');
    }

}
