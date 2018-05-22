import {Component} from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { AppService } from '../../app.service';
import {Popup} from '../../utils/popup/popup';
import { Toast } from '../../utils/toast/toast';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    selector: 'orders',
    templateUrl: './orders.html',
    styleUrls: ['./orders.css']
})

export class OrderScreen{
    displayedColumns = ['id', 'username', 'productname', 'status', 'orderDate', 'operations'];
    dataSource: MatTableDataSource<Order>;
    productList: Array<Order>;
    displayType: Boolean;
    id: number;
    selectedCustomer: User;
    selectedProduct: Product;    

    constructor(
        public appService: AppService,
        public dialog: MatDialog,
        public toast : Toast,
        private storage: LocalStorageService
    ){}

    ngOnInit(){
        let cookieValue = this.storage.retrieve('user');
        this.id = JSON.parse(cookieValue)['data']['id'];
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
        if(this.displayType){
            this.appService.getOrderList().then(result => {
                this.productList = JSON.parse(result['_body'])['data'];
                Promise.resolve(this.productList).then((value => {
                    this.dataSource = new MatTableDataSource(value);
                }));
            });
        }
        else{
            this.appService.getOrderHistory(this.id).then(result => {
                this.productList = JSON.parse(result['_body'])['data'];
                Promise.resolve(this.productList).then((value => {
                    this.dataSource = new MatTableDataSource(value);
                }));
            });
        }
    }

    changeOrderStatus(id: number, status: string): void {
        this.appService.changeOrderStatus(id, status).then(result => {
            this.toast.makeToast('The order has successfully updated!');
            this.initialize();
        });
    }

    add(){
        let dialog = this.dialog.open(OrderDialogComponent);

        dialog.afterClosed()
            .subscribe(selection => {
                if (selection) {
                    for(let i = 0; i < selection.quantity; i++){
                        this.appService.makeOrder(selection.customer,
                                                  selection.product.id,
                                                  selection.product.productname).then(result => {
                            this.toast.makeToast('The order has successfully created!');
                            this.initialize();
                        });
                    }
                    this.initialize();
                }
            });
    }

}

export interface Order {
    id: number;
    productname: string;
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

export interface Product {
    id: number;
    productname: string;
}
