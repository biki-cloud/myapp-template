export interface IAuthClientService {
  signIn(
    email: string,
    password: string
  ): Promise<{ error?: string } | undefined>;
  signOut(): Promise<void>;
}
