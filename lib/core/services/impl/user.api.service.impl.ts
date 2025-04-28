import type { IUserApiService } from "../interface/user.api.service.interface";
import { injectable } from "tsyringe";

@injectable()
export class UserApiService implements IUserApiService {
  async signUp(name: string, email: string, password: string) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return await response.json();
  }
}
