import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  surname: string;
  dateOfBirthday: Date;
  phone: string;
  email: string;
  createUpdateUserDate: Date;
}

export interface ListState {
  loading: boolean;
  users: User[];
}

const initialState: ListState = {
  loading: false,
  users: [],
};

@Injectable()
export class ListStore extends ComponentStore<ListState> {

  public readonly loading$ = this.select((state) => state.loading);
  public readonly users$ = this.select((state) => state.users);

  readonly setLoading = this.updater((state, loading: boolean) => ({ ...state, loading }));
  readonly setUsers = this.updater((state, users: User[]) => ({ ...state, users }));

  readonly delUser = this.updater((state, id: number) =>
    ({ ...state, users: state.users.filter(u => u.id !== id) }));

  readonly updtUser = this.updater((state, user: User) =>
    ({ ...state, users: state.users.map(u => u.id === user.id ? user : u) }));

  readonly appendUser = this.updater((state, user: User) =>
    ({ ...state, users: [user].concat(state.users) }));

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    super(initialState);
  }

  private error (e: { message: string }): ListStore {
    this._snackBar.open('Error: ' + e.message, undefined, { duration: 25 * 1e3 });
    return this;
  };
  
  readonly fetchUsers = this.effect(($event) =>
    $event.pipe(
      switchMap(() => {
        this.setLoading(true);
        return this.http.get<User[]>('user/list').pipe(
          tap({
            next: (users: User[]) => {
              this.setLoading(false);
              this.setUsers(users);
            },
            error: (e) => {
              this.setLoading(false);
              this.error(e) && console.error(e)
            },
          }),
          catchError((e) => this.error(e) && EMPTY)
        );
      })
    )
  );

  readonly deleteUser = this.effect(($id: Observable<number>) =>
    $id.pipe(
      switchMap((id) => {
        this.setLoading(true);
        return this.http.delete<{data: number}>('user/delete/' + id).pipe(
          tap({
            next: ({data}) => {
              this.setLoading(false);
              this.delUser(data);
              this._snackBar.open('Deleted!', undefined, {duration: 3000});
            },
            error: (e) => {
              this.setLoading(false);
              this.error(e) && console.error(e)
            },
          }),
          catchError((e) => this.error(e) && EMPTY)
        );
      })
    )
  );

  readonly updateUser = this.effect(($user: Observable<User>) =>
    $user.pipe(
      switchMap((user) => {
        this.setLoading(true);
        return this.http.patch<{data: User}>('user/update/' + user.id, user).pipe(
          tap({
            next: ({data}) => {
              this.setLoading(false);
              this.updtUser(data);
              this._snackBar.open('Saved!', undefined, {duration: 3000});
            },
            error: (e) => {
              this.setLoading(false);
              this.error(e) && console.error(e)
            },
          }),
          catchError((e) => this.error(e) && EMPTY)
        );
      })
    )
  );

  readonly addUser = this.effect(($user: Observable<User>) =>
    $user.pipe(
      switchMap((user) => {
        this.setLoading(true);
        return this.http.post<{data: User}>('user/add/', user).pipe(
          tap({
            next: ({data}) => {
              this.setLoading(false);
              this.appendUser(data);
              this._snackBar.open('Saved!', undefined, {duration: 3000});
            },
            error: (e) => {
              this.setLoading(false);
              this.error(e) && console.error(e)
            },
          }),
          catchError((e) => this.error(e) && EMPTY)
        );
      })
    )
  );
}
