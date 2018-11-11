import { Action } from '@ngrx/store';
import { User } from '../../model/user.model';

export enum AuthActionTypes {
  LoginAuths = '[Login] Load Auths',
  LogoutAuths = '[Logout] Load Auths'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAuths;
  constructor(public payload: { user: User }) {}
}

export type AuthActions = Login;
