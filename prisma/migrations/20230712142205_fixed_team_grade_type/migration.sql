/*
  Warnings:

  - Changed the type of `teamGrade` on the `teams` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TeamGrade" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "teamGrade",
ADD COLUMN     "teamGrade" "TeamGrade" NOT NULL;
