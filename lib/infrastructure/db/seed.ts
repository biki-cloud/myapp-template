import { db } from "./drizzle";
import { user, pushSubscriptions } from "./schema";
import { hash } from "bcryptjs";
import type { User } from "./schema";

async function clearTables() {
  console.log("🗑️ テーブルの内容を削除中...");

  // 外部キー制約があるため、削除順序が重要
  await db.delete(pushSubscriptions);
  await db.delete(user);

  console.log("✅ テーブルの内容をリセットしました");
}

async function seedUsers() {
  console.log("🌱 ユーザーデータを作成中...");

  const testUsers: (typeof user.$inferInsert)[] = [
    {
      name: "Test User",
      email: "email@example.com",
      password: await hash("password123", 10),
    },
  ];

  for (const testUser of testUsers) {
    await db.insert(user).values(testUser);
  }

  console.log("✅ ユーザーデータを作成しました");
}

async function main() {
  try {
    await clearTables();
    await seedUsers();

    console.log("🎉 データベースの初期化が完了しました");
    process.exit(0);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
    process.exit(1);
  }
}

main();
