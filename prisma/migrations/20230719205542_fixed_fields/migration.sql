-- AlterTable
ALTER TABLE "passwordReset" ALTER COLUMN "token" DROP NOT NULL,
ALTER COLUMN "expiresDate" DROP NOT NULL;
