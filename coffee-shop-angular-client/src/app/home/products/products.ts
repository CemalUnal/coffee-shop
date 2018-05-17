import {Component} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {AppService} from '../../app.service';
import {Popup} from '../../utils/popup';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'products',
    templateUrl: './products.html',
    styleUrls: ['./products.css']
})

export class ProductScreen {

    displayedColumns = ['id', 'productname', 'operations'];
    dataSource: MatTableDataSource<Product>;
    productList: Array<Product>;
    displayType: Boolean;

    constructor(
        public appService: AppService,
        public cookieService: CookieService,
        public dialog: MatDialog
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
        this.appService.getProductList().then(result => {
            this.productList = JSON.parse(result['_body'])['data'];
            Promise.resolve(this.productList).then((value => {
                this.dataSource = new MatTableDataSource(value);
            }));
        });
    }

    add(){
        let dialogRef = this.dialog.open(Popup, {
            data: {
                header: 'Enter a New Product',
                fields: [
                    {name: 'Product Name', value: ''}
                ]
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined){
                this.appService.addProduct(result['fields'][0]['value']).then((value => {
                    alert('The product has successfully added');
                    this.initialize();
                }));
            }
        });
    }

    edit(id: number, productname: string){
        let dialogRef = this.dialog.open(Popup, {
            data: {
                header: 'Enter a New Product',
                fields: [
                    {name: 'Product Name', value: productname}
                ]
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined){
                this.appService.setProduct(id, result['fields'][0]['value']).then((value => {
                    alert('The product has successfully edited');
                    this.initialize();
                }));
            }
        });
    }

    delete(id: number): void{
        this.appService.deleteProduct(id).then((value => {
            alert('The product has successfully deleted');
            this.initialize();
        }));
    }

    order(id: number, productname: string): void{
        let dialogRef = this.dialog.open(Popup, {
            data: {
                header: 'Order a Product',
                fields: [
                    {name: 'Product Name', value: productname, isDisabled: 'true'},
                    {name: 'Order Quantity', value: '', type: 'number'}
                ]
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined){
                let quantity = + result['fields'][1]['value'];
                for(let i = 0; i < quantity; i++){
                    this.appService.makeOrder(11,id);
                }
                this.initialize();
            }
        });
    }
}

export interface Product {
    id: number;
    productname: string;
}

