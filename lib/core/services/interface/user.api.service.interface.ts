export interface IUserApiService {
  signUp(name: string, email: string, password: string): Promise<any>;
}
