import userReducer from './user-reducer';
import { setAuthorizationStatus, setUser } from './action';
import { AuthorizationStatus } from '../const';
import type { AppAction } from './action';

describe('userReducer', () => {
  it('returns initial state', () => {
    const initAction = { type: 'UNKNOWN' } as unknown as AppAction;

    expect(userReducer(undefined, initAction)).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    });
  });

  it('sets authorization status', () => {
    const state = userReducer(
      undefined,
      setAuthorizationStatus(AuthorizationStatus.Auth)
    );

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('sets user', () => {
    const user = {
      name: 'John Doe',
      avatarUrl: 'img/avatar.svg',
      isPro: false,
      email: 'john@example.com',
    };
    const state = userReducer(undefined, setUser(user));

    expect(state.user).toEqual(user);
  });
});
