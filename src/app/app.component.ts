import { AppState } from './reducers/index';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { Router } from '@angular/router';
import { Logout } from './auth/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router) {}

  isLoggedIn$: Observable<Boolean>;
  isLoggedOut$: Observable<Boolean>;

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  logout() {
    this.store.dispatch(new Logout());
    this.router.navigateByUrl('/');
  }
}
