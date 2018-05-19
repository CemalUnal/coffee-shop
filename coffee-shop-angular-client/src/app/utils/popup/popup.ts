import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'popup',
    templateUrl: './popup.html',
})
export class Popup {

    constructor(
        public dialogRef: MatDialogRef<Popup>,
        @Inject(MAT_DIALOG_DATA) public data: any)
    {
        this.dialogRef.disableClose = true;
    }

    onSaveClick(data?: any): any {

        if(data)
            this.dialogRef.close(this.data);
        else
            this.dialogRef.close();
    }

}