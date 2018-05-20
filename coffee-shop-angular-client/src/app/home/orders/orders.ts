import {Component} from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AppService } from '../../app.service';
import { CookieService } from 'ngx-cookie-service';
import { Toast } from '../../utils/toast/toast';

@Component({
    selector: 'orders',
    templateUrl: './orders.html',
    styleUrls: ['./orders.css']
})

export class OrderScreen{
    displayedColumns = ['id', 'productname', 'status', 'operations'];
    dataSource: MatTableDataSource<Order>;
    productList: Array<Order>;
    displayType: Boolean;

    constructor(
        public appService: AppService,
        public cookieService: CookieService,
        public dialog: MatDialog,
        public a : Toast
    ){}

    ngOnInit(){
        let cookieValue = this.cookieService.get('user');
        if(JSON.parse(cookieValue)['type'] == 'customer'){
            this.displayType = false;
        }
        else{
            this.displayType = true;
        }
        this.initialize();
    }

    initialize(): void{
        this.dataSource = null;
        this.appService.getOrderList().then(result => {
            this.productList = JSON.parse(result['_body'])['data'];
            Promise.resolve(this.productList).then((value => {
                this.dataSource = new MatTableDataSource(value);
            }));
        });
    }

    changeOrderStatus(id: number, status: string): void {
        this.appService.changeOrderStatus(id, status).then(result => {
            this.a.makeToast('The order has successfully updated!');
            this.initialize();
        });
    }

}

export interface Order {
    id: number;
    productname: string;
}
