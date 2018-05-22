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
    displayedColumnsForOrderHistory = ['id', 'username', 'productname', 'status', 'orderdate'];
    dataSource: MatTableDataSource<User>;
    dataSourceOrderHistory: MatTableDataSource<Order>;
    userList: Array<User>;
    orderList: Array<Order>;
    displayOrderHistory: Boolean;

    constructor(
        public appService: AppService, 
        public dialog: MatDialog,
        private toast: Toast,
        private _route : Router
    ){}

    ngOnInit() {
        this.initialize();
    }

    initialize() {
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

    showOrderHistory(id: number): void{
        this.appService.getOrderHistory(id).then((value => {
            
            this.orderList = JSON.parse(value['_body'])['data'];

            Promise.resolve(this.orderList).then((value => {
                this.dataSourceOrderHistory = new MatTableDataSource<Order>(value);
                this.displayOrderHistory = true;
            }));
        }));
    }

    closeOrderHistory(): void {
        this.displayOrderHistory = false;
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

export interface Order {
    id: number;
    orderdate: string;
    customer: User;
    product: Product;
    newOrSent: string;
}

export interface Product {
    id: number;
    productname: string;
}