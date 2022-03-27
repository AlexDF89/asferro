import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { DeleteUserDialogComponent } from './delete-user-dialog.component';

describe('DeleteUserDialogComponent', () => {
  let component: DeleteUserDialogComponent;
  let fixture: ComponentFixture<DeleteUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserDynamicTestingModule, MatDialogModule],
      declarations: [ DeleteUserDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue:{} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
