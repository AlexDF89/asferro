import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  addUser$ = new Subject();
  searchValue$ = new Subject<string>();
}
