import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject();
  public searchControl = new FormControl();

  constructor(private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(takeUntil(this._unsubscribe$)).subscribe((searchValue: string) => {
      this.toolbarService.searchValue$.next(searchValue);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onAdd(): void {
    this.toolbarService.addUser$.next();
  }
}
