import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListComponent } from './list.component';
import { ToolbarService } from 'app/toolbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ListStore, User } from './list.store';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  let store: ListStore;
  let dialog: MatDialog;
  let toolbarService: ToolbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserDynamicTestingModule, MatSnackBarModule, MatDialogModule],
      declarations: [ ListComponent ],
      providers: [ ListStore ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);

    store = TestBed.inject(ListStore);
    dialog = TestBed.inject(MatDialog);
    toolbarService = TestBed.inject(ToolbarService);
    component = new ListComponent(store, dialog, toolbarService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchUsers when ngOnInit', () => {
    const spy = spyOn(store, 'fetchUsers');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should update user list after ngOnInit', () => {
    const users = [{} as User, {} as User];
    spyOn(store, 'fetchUsers').and.callFake(() => {
      store.setUsers(users);
    });
    component.ngOnInit();
    expect(component.dataSource.data).toEqual(users);
  });
});
