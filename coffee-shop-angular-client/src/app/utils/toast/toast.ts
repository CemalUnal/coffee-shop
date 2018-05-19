import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
    selector: 'toast',
    templateUrl: './toast.html'
})
export class Toast {

    constructor(public toaster: MatSnackBar){}

    makeToast(message: string) {
        this.toaster.open(message,null, {
            duration: 1000,
            extraClasses : 'custom-toast'
          });
    }
    
    makeToastErr(message: string){
        this.toaster.open(message,null, {
            duration: 1000,
            extraClasses : 'custom-toast-err'
          });
    }

}