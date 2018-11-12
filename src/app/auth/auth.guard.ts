import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { isLoggedIn } from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
