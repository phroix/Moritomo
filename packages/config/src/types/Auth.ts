export type User = {
  id: string;
  email: string;
  name: string;
};

export type Session = {
  access_token: string;
  refresh_token: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  session: {
    access_token: string;
    refresh_token: string;
  };
  user: User;
};

export type LogoutResponse = {
  message: string;
};

export type AuthStatus = "nonAuthenticated" | "authenticated" | "admin" | null;

export interface AuthState {
  session: any | null;
  authStatus: AuthStatus;
}
