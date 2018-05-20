import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'home',
  templateUrl: './home.html'
})

export class HomeScreen {

  displayType : boolean;

  constructor(
    private storage: LocalStorageService
  ){

  }

  ngOnInit(){
    let storedUser = JSON.parse(this.storage.retrieve('user'));
    if(storedUser['type'] == 'customer')
      this.displayType = false;
    else if(storedUser['type'] == 'owner')
      this.displayType = true;

  }
}
