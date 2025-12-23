import type { User } from '../entities/user/model/types';
import { AuthorizationStatus } from '../const';
import {
  setAuthorizationStatus,
  setUser,
  type AppAction,
} from './action';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const userReducer = (
  state: UserState = initialState,
  action: AppAction
): UserState => {
  switch (action.type) {
    case setAuthorizationStatus.type:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case setUser.type:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
