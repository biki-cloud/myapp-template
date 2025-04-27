import "reflect-metadata";
import "../_init";
import { container } from "tsyringe";
import { IAuthService } from "@/lib/core/services/interface/auth.service.interface";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = signUpSchema.parse(body);

    const authService = container.resolve<IAuthService>("AuthService");
    const user = await authService.signUp(
      validatedData.email,
      validatedData.password,
      validatedData.name
    );

    if (!user) {
      return NextResponse.json(
        { error: "このメールアドレスは既に使用されています" },
        { status: 400 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "入力データが不正です" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "アカウントの作成に失敗しました" },
      { status: 500 }
    );
  }
}
