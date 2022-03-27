import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../list.store';
import isEqual from 'lodash-es/isEqual';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject();
  public today = new Date();
  public formIsChanged = false;

  public formGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(60)]],
    surname: [null, [Validators.required, Validators.maxLength(60)]],
    phone: [null, [Validators.required, Validators.pattern('[- +()0-9]+')]],
    email: [null, [Validators.required, Validators.email]],
    dateOfBirthday: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public user: User,
    public dialogRef: MatDialogRef<EditUserDialogComponent>
  ) { }

  ngOnInit(): void {
    if (this.user) {
      this.formGroup.patchValue({...this.user, dateOfBirthday: new Date(this.user.dateOfBirthday)});
    }

    this.formGroup.valueChanges.pipe(takeUntil(this._unsubscribe$)).subscribe(changes => {
      if (changes.dateOfBirthday) {
        this.formIsChanged = !isEqual({...changes, dateOfBirthday: changes.dateOfBirthday.getTime()}, this.user);
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.getRawValue();
      this.dialogRef.close({...formValue, dateOfBirthday: formValue.dateOfBirthday?.getTime()});
    }
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if (control.hasError('maxlength')) {
      return 'Maximum is 60 characters';
    }
    if (control.hasError('pattern')) {
      return 'Wrong format';
    }
    if (control.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }
}
