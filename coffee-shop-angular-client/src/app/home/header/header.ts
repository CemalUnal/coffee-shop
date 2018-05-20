import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Popup } from '../../utils/popup/popup';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Toast } from '../../utils/toast/toast';
import { LocalStorageService } from 'ngx-webstorage';

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
        public _route: Router,
        public appService: AppService,
        private toast: Toast,
        private storage: LocalStorageService
    ) { }

    ngOnInit() {
        let cookieValue = this.storage.retrieve('user');
        console.log(cookieValue);
        if (JSON.parse(cookieValue)['type'] == 'customer') {
            this.displayType = false;
        }
        else {
            this.displayType = true;
        }
        this.username = JSON.parse(cookieValue)['data']['username'];
    }

    openPreferences(): void {
        let cookieValue = this.storage.retrieve('user');
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
                    this.toast.makeToast('The user has successfully updated');
                }));
            }
        });


    }

    logout(): void {
        this.storage.clear('user');
        this._route.navigateByUrl('/login');
    }

}
