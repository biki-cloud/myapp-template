import { signIn, signOut } from "next-auth/react";
import type { IAuthClientService } from "../interface/auth.client.service.interface";
import { injectable } from "tsyringe";

@injectable()
export class AuthClientService implements IAuthClientService {
  async signIn(email: string, password: string) {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return res ? { error: res.error ?? undefined } : undefined;
  }
  async signOut() {
    await signOut({ callbackUrl: "/" });
  }
}
