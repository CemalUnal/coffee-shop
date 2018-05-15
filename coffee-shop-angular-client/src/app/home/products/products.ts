import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AppService} from '../../app.service';
import {HeaderComponent} from '../header/header';

@Component({
    selector: 'products',
    templateUrl: './products.html',
    styleUrls: ['./products.css']
})

export class ProductScreen {

    displayedColumns = ['id', 'productname', 'operations'];
    dataSource: MatTableDataSource;
    productList: Array<Product>;

    constructor(public appService: AppService){}

    ngOnInit(){

        this.initialize();
    }

    initialize(){
        HeaderComponent.loading = true;
        this.dataSource = null;
        this.appService.getProductList().then(result => {
            this.productList = JSON.parse(result['_body'])['data'];
            Promise.resolve(this.productList).then((value => {
                this.dataSource = new MatTableDataSource(value);
            }));
        });
        // HeaderComponent.loading = false;
    }

    addEditPopUp(id?: number): void {
        if(id == undefined){
            let productName = '';
            let product = prompt('Enter a new product name', productName);
            if(product == null || product == '') return;
            this.appService.addProduct(product).then((value => {
                alert('The product has successfully added');
                this.initialize();
            }));
        }
        else{
            for(let i = 0; i < this.productList.length; i++)
                if(this.productList[i]['id'] == id){
                    let product = prompt('Enter a new product name', this.productList[i]['productname']);
                    if(product == null || product == '') return;
                    this.appService.setProduct(this.productList[i]['id'], product).then((value => {
                        alert('The product has successfully edited');
                        this.initialize();
                    }));
                }
        }
    }

    delete(id: number){
        this.appService.deleteProduct(id).then((value => {
            alert('The product has successfully deleted');
            this.initialize();
        }));
    }
}

export interface Product {
    id: number;
    productname: string;
}

const ELEMENT_DATA: Product[] = [
    {id: 1, productname: 'Hydrogen'}
];

