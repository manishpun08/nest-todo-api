-- Enable UUID generation for Postgres
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Rebuild the primary key with UUID values for existing rows
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_pkey";
ALTER TABLE "Todo" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE "Todo" ALTER COLUMN "id" TYPE UUID USING gen_random_uuid();
ALTER TABLE "Todo" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_pkey" PRIMARY KEY ("id");