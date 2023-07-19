/*
  Warnings:

  - Made the column `token` on table `passwordReset` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expiresDate` on table `passwordReset` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "passwordReset" ALTER COLUMN "token" SET NOT NULL,
ALTER COLUMN "expiresDate" SET NOT NULL;
