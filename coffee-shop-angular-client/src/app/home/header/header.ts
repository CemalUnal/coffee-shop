import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Popup} from '../../utils/popup';

@Component({
  selector: 'header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent{

  @Input() displayType: Boolean;

  constructor(public dialog: MatDialog){}

  openPreferences(): void{
      let dialogRef = this.dialog.open(Popup, {
          data: {
              header: 'Change User Settings',
              fields: [
                  {name: 'Username', value: ''},
                  {name: 'Password', value: ''}
              ]
          }
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined){

          }
      });
  }

}
