"use client";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="p-8">Loading...</div>;
  if (!session)
    return <div className="p-8 text-center">ログインが必要です</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ユーザ情報の設定</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">名前</div>
              <div className="text-lg font-medium">
                {session.user.name ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                メールアドレス
              </div>
              <div className="text-lg font-medium">{session.user.email}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
