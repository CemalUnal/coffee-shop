import { HttpModule, Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

    private serviceTag = 'http://localhost:32080/BBM488Odev4';
    //localhost:32080/BBM488Odev4

    constructor(
        private http: Http
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg); //throw?
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
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
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
                    }
                );
        });
    }

    makeOrder(
        userID: number,
        productID: number
    ): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            'customer_id': userID,
            'product_id': productID,
            'orderdate': (new Date()).toDateString()
        };

        return new Promise<any>(resolve => {
            this.http.post(this.serviceTag + '/orders/makeorder', body, options)
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        alert(errMsg);
                    }
                );
        });
    }


}
