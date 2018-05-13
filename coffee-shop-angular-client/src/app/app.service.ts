import {HttpModule, Http, Headers, RequestOptions, Response} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AppService {

  private serviceTag = 'http://localhost:32080/BBM488Odev4';

  constructor(
    private http: Http
  ){}

  signInForCustomer(username: string, password: string): Promise<any>{

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
      'username' : username,
      'password' : password
    };

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

    signInForOwners(username: string, password: string): Promise<any>{

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            'username' : username,
            'password' : password
        };

        return new Promise<any>(resolve => {
            this.http.get(this.serviceTag + '/owners', options)
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
      this.http.post(this.serviceTag + '/signupCustomer', body, options)
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
