import { AuthActionTypes, Login, Logout } from './auth/auth.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action =>
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    )
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(action => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem('user');
    console.log(userData);
    if (userData) {
      // return of(new Login({ user: JSON.parse(userData) }));
      return of(new Login({ user: JSON.parse(userData) }));
    } else {
      return <any>of(new Logout());
    }
  });

  constructor(private actions$: Actions, private router: Router) {}
}
