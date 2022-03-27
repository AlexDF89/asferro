import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToolbarService } from 'app/toolbar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { ListStore, User } from './list.store';
import omit from 'lodash-es/omit';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListStore]
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  private _unsubscribe$ = new Subject();
  public displayedColumns: string[] = ['name', 'surname', 'dateOfBirthday', 'phone', 'email', 'createUpdateUserDate', 'more'];
  public dataSource = new MatTableDataSource<User>([]);
  public loading$ = this.store.loading$;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;

  constructor(private store: ListStore, private dialog: MatDialog, private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.store.fetchUsers();
    this.subscribeOnUsers();
    this.subscribeOnAddUser();
    this.setFilterPredicate();
    this.subscribeOnSearching();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  private subscribeOnUsers(): void {
    this.store.users$.pipe(takeUntil(this._unsubscribe$)).subscribe((users: User[]) => {
      this.dataSource.data = users;
    });
  }

  private subscribeOnAddUser(): void {
    this.toolbarService.addUser$.pipe(takeUntil(this._unsubscribe$)).subscribe(() => this.onAdd());
  }

  private setFilterPredicate(): void {
    this.dataSource.filterPredicate = (user: User, filterStr: string) => {
      filterStr = filterStr.toLowerCase();
      return user.name.toLowerCase().includes(filterStr) ||
              user.surname.toLowerCase().includes(filterStr) ||
              user.email.toLowerCase().includes(filterStr);
     };
  }

  private subscribeOnSearching(): void {
    this.toolbarService.searchValue$.pipe(takeUntil(this._unsubscribe$)).subscribe((str) => {
      this.dataSource.filter = str;
    });
  }

  private onAdd(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {autoFocus: false});
    dialogRef.afterClosed().subscribe((user: User) => {
      if (user) {
        this.store.addUser(user);
      }
    });
  }

  onEdit(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {data: omit(user, 'id', 'createUpdateUserDate'), autoFocus: false});
    dialogRef.afterClosed().subscribe((updatedUser: User) => {
      if (updatedUser) {
        this.store.updateUser({...updatedUser, id: user.id});
      }
    });
  }

  onDelete(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {data: user, autoFocus: false});
    dialogRef.afterClosed().subscribe((id: number) => {
      if (id) {
        this.store.deleteUser(id);
      }
    });
  }
}
