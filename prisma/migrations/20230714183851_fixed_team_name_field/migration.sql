/*
  Warnings:

  - A unique constraint covering the columns `[teamName]` on the table `teams` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teams_teamName_key" ON "teams"("teamName");
