export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
}

export interface IRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IToken {
  id: string;
  email: string;
}
