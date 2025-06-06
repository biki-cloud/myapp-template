import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { getPostgresUrl } from "./env";

// データベース接続用のクライアントを作成
const sql = postgres(getPostgresUrl(), { max: 1 });

// マイグレーションを実行
async function main() {
  try {
    const db = drizzle(sql);

    console.log("🔄 マイグレーションを実行中...");
    await migrate(db, { migrationsFolder: "lib/infrastructure/db/migrations" });
    console.log("✅ マイグレーションが完了しました");

    process.exit(0);
  } catch (error) {
    console.error("❌ マイグレーションでエラーが発生しました:", error);
    process.exit(1);
  }
}

main();
