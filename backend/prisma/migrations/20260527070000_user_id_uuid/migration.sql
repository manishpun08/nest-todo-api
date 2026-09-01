-- Enable UUID generation for Postgres
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Rebuild the primary key with UUID values for existing rows
ALTER TABLE "User" DROP CONSTRAINT "User_pkey";
ALTER TABLE "User" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "id" TYPE UUID USING gen_random_uuid();
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");