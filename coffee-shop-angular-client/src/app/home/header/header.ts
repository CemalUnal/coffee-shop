import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent {

  @Input() displayType: Boolean;

  constructor(public _router: Router){

  }

}
