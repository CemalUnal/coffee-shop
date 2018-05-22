import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  customerList: Array<User>;
  productList: Array<Product>;
  quantity: number;
  data: {
    customer: User,
    producId: number,
    quantity: number
  };

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    public appService: AppService, 
    public dialog: MatDialog
  ){ }

  ngOnInit() {
    this.appService.getUserList().then(result => {
      this.customerList = JSON.parse(result['_body'])['data']; 
    });

    this.appService.getProductList().then(result => {
      this.productList = JSON.parse(result['_body'])['data']; 
    });
  }

  chosenCustomer: User;
  chosenProduct: Product;

  confirmSelection() {
    let quantity = this.quantity;

    let data = {
      customer: this.chosenCustomer,
      product: this.chosenProduct,
      quantity: quantity
    }

    this.dialogRef.close(data);
  }

  onKeyStroke(event: any) {
    this.quantity = event.target.value;
  }

}

export interface User {
  buildingno: number;
  floorno: number;
  id: number;
  new: boolean;
  password: string;
  realname: string;
  roomno: number;
  surname: string;
  username: string;
}

export interface Product {
  id: number;
  productname: string;
}