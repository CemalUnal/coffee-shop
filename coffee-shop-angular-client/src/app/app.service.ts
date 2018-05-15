import {HttpModule, Http, Headers, RequestOptions, Response} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AppService {

  private serviceTag = 'http://10.100.34.96:8080';
  //localhost:32080/BBM488Odev4

  constructor(
    private http: Http
  ){}

  signIn(username: string, password: string): Promise<any>{

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
      'username' : username,
      'password' : password
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
                  alert(errMsg);
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
      'username' : username,
      'password' : password,
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
            'username' : username,
            'password' : password,
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


}
