import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AppService} from '../../../app.service';
import { MatTableDataSource } from '@angular/material';
import { Order } from '../../orders/orders';
import { User } from '../users';

@Component({
    selector: 'order-details',
    templateUrl: './order-details.html',
    styleUrls: ['../users.css']
})
export class OrderDetails implements OnInit{

    private user_id: number;
    private user: User;
    private dataSource: MatTableDataSource<Order>;
    private orderList: Array<Order>;
    displayedColumns = ['id', 'username', 'productname', 'orderdate', 'newOrSent'];

    constructor(
        public _router: ActivatedRoute,
        public router : Router,
        public appService: AppService
    ){}

    ngOnInit(){
        this.user_id = this._router.snapshot.params['id'];
        this.dataSource = null;
        this.appService.getOrderHistory(this.user_id).then(result => {
            this.orderList = JSON.parse(result['_body'])['data'];
            this.user = (this.orderList[0] !== undefined) ? this.orderList[0]['customer'] : '';
            Promise.resolve(this.orderList).then((value => {
                this.dataSource = new MatTableDataSource<Order>(value);
            }));
        });
    }

    goBack(): void{
        this.router.navigateByUrl('/home/users');
    }
    
}
