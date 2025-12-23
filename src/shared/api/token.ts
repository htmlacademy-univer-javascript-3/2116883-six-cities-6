const TOKEN_KEY_NAME = 'six-cities-token';

export const getToken = (): string => {
  const token = localStorage.getItem(TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_KEY_NAME);
};
