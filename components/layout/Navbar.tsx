"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            MyApp
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {status === "loading" ? (
            <div>Loading...</div>
          ) : session ? (
            <>
              <span className="text-sm text-gray-700">
                {session.user.name || session.user.email}
              </span>
              <Button
                variant="outline"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                ログアウト
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="outline">ログイン</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>新規登録</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
