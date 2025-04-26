import dotenv from "dotenv";

dotenv.config();

export function getPostgresUrl(): string {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    throw new Error("POSTGRES_URL environment variable is not set");
  }
  return url;
}

export function getSchema(): string {
  const schema = process.env.POSTGRES_SCHEMA;
  if (!schema) {
    throw new Error("POSTGRES_SCHEMA environment variable is not set");
  }
  return schema;
}
