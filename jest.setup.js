require("reflect-metadata");
require("@testing-library/jest-dom");
const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// テスト用の環境変数を設定
process.env.AUTH_SECRET = "test-auth-secret-key-for-testing-purposes-only";
process.env.POSTGRES_URL =
  "postgresql://postgres:postgres@localhost:5432/test_database";
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    set: jest.fn(),
  }),
  usePathname: () => "",
}));

// Mock next/headers
jest.mock("next/headers", () => ({
  cookies: () => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  }),
  headers: () => ({
    get: jest.fn(),
    set: jest.fn(),
  }),
}));
