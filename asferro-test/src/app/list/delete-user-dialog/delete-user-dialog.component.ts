import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../list.store';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styles: [
    `
      mat-dialog-actions {
        padding-bottom: 24px;
      }
    `
  ]
})
export class DeleteUserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>
  ) { }
}
