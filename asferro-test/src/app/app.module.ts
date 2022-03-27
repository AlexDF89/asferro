import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteUserDialogComponent } from './list/delete-user-dialog/delete-user-dialog.component';
import { ListComponent } from './list/list.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditUserDialogComponent } from './list/edit-user-dialog/edit-user-dialog.component';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

const MATERIAL = [
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatSnackBarModule,
  MatButtonModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DeleteUserDialogComponent,
    EditUserDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ...MATERIAL
  ],
  providers: [
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        floatLabel: 'auto',
        appearance: 'fill'
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
