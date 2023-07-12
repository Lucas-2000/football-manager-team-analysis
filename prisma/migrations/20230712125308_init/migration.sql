-- CreateTable
CREATE TABLE "teams" (
    "teamId" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "teamLocalization" TEXT NOT NULL,
    "teamCountry" TEXT NOT NULL,
    "teamLeague" TEXT NOT NULL,
    "teamGrade" INTEGER NOT NULL,
    "teamLogo" TEXT NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("teamId")
);
