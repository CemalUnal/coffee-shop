import {Component, Input} from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent {

  @Input() displayType: Boolean;

}
