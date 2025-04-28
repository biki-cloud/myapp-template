/**
 * 現在の環境に応じたベースURLを取得します
 * - 本番環境: https://your-project.vercel.app
 * - プレビュー環境: https://your-project-preview.vercel.app
 * - 開発環境: http://localhost:3000
 */
export function getBaseUrl(): string {
  // Vercel本番/プレビュー環境の場合
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 開発環境の場合
  return "http://localhost:3000";
}
