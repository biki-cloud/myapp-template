// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export function middleware(request: NextRequest) {
  logger.debug(`request: ${request.nextUrl.pathname}`);

  // 他の共通処理やログ、認証の処理などを挟むこともできる
  return NextResponse.next();
}
