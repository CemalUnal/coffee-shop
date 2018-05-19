import { HttpModule, Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from './home/users/users';
import { Product } from './home/products/products';
import { Toast } from './utils/toast/toast';

@Injectable()
export class AppService {

    private serviceTag = 'http://localhost:32080/BBM488Odev4';
    //localhost:32080/BBM488Odev4

    constructor(
        private http: Http,
        private toast : Toast
    ) { }

    signIn(username: string, password: string): Promise<any> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            'username': username,
            'password': password
        };

        return new Promise<any>(resolve => {
            this.http.post(this.serviceTag + '/signin', body, options)
                .subscribe(
                    (data) => {
                        resolve(data['_body']);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    signUpForCustomer(
        username: string,
        password: string,
        realname: string,
        surname: string,
        floorno?: number,
        buildingno?: number,
        roomno?: number
    ): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            'username': username,
            'password': password,
            'realname': realname,
            'surname': surname,
            'floorno': floorno,
            'buildingno': buildingno,
            'roomno': roomno
        };
        return new Promise<any>(resolve => {
            this.http.post(this.serviceTag + '/customers/savecustomer', body, options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    signUpForOwner(
        username: string,
        password: string,
        realname: string,
        surname: string
    ): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            'username': username,
            'password': password,
            'realname': realname,
            'surname': surname
        };
        return new Promise<any>(resolve => {
            this.http.post(this.serviceTag + '/owners/saveowner', body, options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    getProductList(): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return new Promise<any>(resolve => {
            this.http.get(this.serviceTag + '/products', options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    setProduct(id: number, productname: string): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            'id': id,
            'productname': productname
        };

        return new Promise<any>(resolve => {
            this.http.put(this.serviceTag + `/products/editproduct/${id}`, JSON.stringify(body), options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    addProduct(productname: string): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            'productname': productname
        };

        return new Promise<any>(resolve => {
            this.http.post(this.serviceTag + '/products/saveproduct', body, options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    deleteProduct(id: number): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return new Promise<any>(resolve => {
            this.http.delete(this.serviceTag + `/products/deleteproduct/${id}`, options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    getUserList(): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return new Promise<any>(resolve => {
            this.http.get(this.serviceTag + '/customers', options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    addUser(
        username: string,
        password: string,
        realname: string,
        surname: string,
        floorno: number,
        buildingno: number,
        roomno: number,
    ): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            'username': username,
            'password': password,
            'realname': realname,
            'surname': surname,
            'floorno': floorno,
            'buildingno': buildingno,
            'roomno': roomno
        };

        return new Promise<any>(resolve => {
            this.http.post(this.serviceTag + '/customers/savecustomer', body, options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    deleteUser(id: number): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return new Promise<any>(resolve => {
            this.http.delete(this.serviceTag + `/customers/deletecustomer/${id}`, options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    setCustomer(id: number,
        username: string,
        password: string,
        realname: string,
        surname: string,
        floorno: number,
        buildingno: number,
        roomno: number): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            'id': id,
            'username': username,
            'password': password,
            'realname': realname,
            'surname': surname,
            'floorno': floorno,
            'buildingno': buildingno,
            'roomno': roomno
        };

        return new Promise<any>(resolve => {
            this.http.put(this.serviceTag + `/customers/editcustomer/${id}`, JSON.stringify(body), options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    getOrderList(): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return new Promise<any>(resolve => {
            this.http.get(this.serviceTag + '/orders', options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    getOrderHistory(id: number): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return new Promise<any>(resolve => {
            this.http.get(this.serviceTag + `/orders/bycustomer/${id}`, options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    makeOrder(
        user: User,
        product_id: number,
        productname: string
    ): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            'newOrSent': 'New',
            'customer': {
                'id': user.id,
                'username': user.username,
                'realname': user.realname,
                'surname': user.surname,
                'floorno': user.floorno,
                'buildingno': user.buildingno,
                'roomno': user.roomno
            },
            'product': {
                'id': product_id,
                'productname': productname
            }
        };

        return new Promise<any>(resolve => {
            this.http.post(this.serviceTag + '/orders/makeorder', body, options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

    changeOrderStatus(id: number, currentStatus: string): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = null;
        if(currentStatus == 'New')
            body = {
                "newOrSent" : "Sent"
            }
        else if(currentStatus == 'Sent')
            body = {
                "newOrSent" : "New"
            }

        return new Promise<any>(resolve => {
            this.http.put(this.serviceTag + `/orders/editorder/${id}`, body, options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let message = JSON.parse(error['_body'])['message'];
                        this.toast.makeToastErr(message); 
                    }
                );
        });
    }

}
