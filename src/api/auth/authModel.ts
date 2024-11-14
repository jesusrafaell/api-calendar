export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IToken {
  id: string;
  email: string;
}
