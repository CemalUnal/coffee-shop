import {Component} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {AppService} from '../../app.service';
import {Popup} from '../../utils/popup/popup';
import { Toast } from '../../utils/toast/toast';
import { Router } from '@angular/router';

@Component({
    selector: 'users',
    templateUrl: './users.html',
    styleUrls: ['./users.css']
})

export class UserScreen{

    displayedColumns = ['id', 'username', 'realname', 'surname', 'buildingno', 'roomno', 'floorno', 'operations'];
    dataSource: MatTableDataSource<User>;
    userList: Array<User>;

    constructor(
        public appService: AppService, 
        public dialog: MatDialog,
        private toast: Toast,
        private _route : Router
    ){}

    ngOnInit(){

        this.initialize();
    }

    initialize(){
        this.dataSource = null;
        this.appService.getUserList().then(result => {
            this.userList = JSON.parse(result['_body'])['data'];
            Promise.resolve(this.userList).then((value => {
                this.dataSource = new MatTableDataSource<User>(value);
            }));
        });
    }

    add(): void {
        let dialogRef = this.dialog.open(Popup, {
            data: {
                header: 'Add User',
                fields: [
                    {name: 'Username', value: ''},
                    {name: 'Password', value: '', type:'password'},
                    {name: 'Realname', value: ''},
                    {name: 'Surname', value: ''},
                    {name: 'Floorno', value: '', type: 'number'},
                    {name: 'Buildingno', value: '', type: 'number'},
                    {name: 'Roomno', value: '', type: 'number'}
                ]
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined){
                this.appService.addUser(
                    result['fields'][0]['value'],
                    result['fields'][1]['value'],
                    result['fields'][2]['value'],
                    result['fields'][3]['value'],
                    result['fields'][4]['value'],
                    result['fields'][5]['value'],
                    result['fields'][6]['value']
                ).then((value => {
                    this.toast.makeToast('The user has successfully added');
                    this.initialize();
                }));
            }
        });

    }

    edit(id: number,
        username: string,
        password: string,
        realname: string,
        surname: string,
        buildingno: number,
        roomno: number,
        floorno: number): void {

        let dialogRef = this.dialog.open(Popup, {
            data: {
                header: 'Edit User',
                fields: [
                    {name: 'Username', value: username},
                    {name: 'Password', value: password, type: 'password'},
                    {name: 'Realname', value: realname},
                    {name: 'Surname', value: surname},
                    {name: 'Floorno', value: floorno, type: 'number'},
                    {name: 'Buildingno', value: buildingno, type: 'number'},
                    {name: 'Roomno', value: roomno, type: 'number'}
                ]
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined){
                this.appService.setCustomer(
                    id,
                    result['fields'][0]['value'],
                    result['fields'][1]['value'],
                    result['fields'][2]['value'],
                    result['fields'][3]['value'],
                    result['fields'][4]['value'],
                    result['fields'][5]['value'],
                    result['fields'][6]['value']
                ).then((value => {
                    this.toast.makeToast('The user has successfully updated');
                    this.initialize();
                }));
            }
        });


    }

    delete(id: number): void{
        this.appService.deleteUser(id).then((value => {
            this.toast.makeToast('The user has successfully deleted');
            this.initialize();
        }));
    }

    showOrderHistory(row: any): void{
        this._route.navigateByUrl('/home/users/detail/'+row['id']);
    }

}

export interface User {
    id: number;
    username: string;
    realname: string;
    surname: string;
    floorno: number;
    buildingno: number;
    roomno: number;
}