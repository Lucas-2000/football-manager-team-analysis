/*
  Warnings:

  - Added the required column `positionId` to the `players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN     "positionId" TEXT NOT NULL,
ADD COLUMN     "teamId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
