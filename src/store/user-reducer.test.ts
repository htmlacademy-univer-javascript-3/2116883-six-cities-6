import userReducer from './user-reducer';
import { setAuthorizationStatus, setUser } from './action';
import { AuthorizationStatus } from '../const';

describe('userReducer', () => {
  it('returns initial state', () => {
    expect(userReducer(undefined, { type: 'UNKNOWN' })).toEqual({
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
