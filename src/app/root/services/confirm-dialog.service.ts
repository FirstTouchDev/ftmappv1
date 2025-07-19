// confirm-dialog.service.ts
import { Injectable } from '@angular/core';
import { ConfirmDialogConfig, PrimeNgDialogComponent } from '../shared-components/prime-ng-dialog/prime-ng-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
     private dialogRef!: PrimeNgDialogComponent;

     public register(dialog: PrimeNgDialogComponent) {
          this.dialogRef = dialog;
     }

     public show(config: ConfirmDialogConfig) {
          this.dialogRef?.show(config);
     }

     public dismiss() {
          this.dialogRef?.dismissDialog();
     }
}
