/*
  Warnings:

  - The `roleType` column on the `positions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `basePosition` on the `positions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `positionRole` on the `positions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `teamGrade` on the `teams` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EnumTeamGrade" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- CreateEnum
CREATE TYPE "EnumPlayerPositionBase" AS ENUM ('Goalkeeper', 'Defenser', 'Midfielder', 'Winger', 'Striker');

-- CreateEnum
CREATE TYPE "EnumPlayerPositionRole" AS ENUM ('Goalkeeper', 'SweeperKeeper', 'WideCentreBack', 'CentralDefender', 'Libero', 'BallPlayingDefender', 'NoNonsenseCentreBack', 'DefensiveMidfielder', 'DeepLyingPlaymaker', 'BallWinningMidfielder', 'AnchorMan', 'HalfBack', 'Regista', 'RoamingPlaymaker', 'SegundoVolante', 'CentralMidfielder', 'BoxToBoxMidfielder', 'AdvancedPlaymaker', 'Mezzala', 'Carrilero', 'FullBack', 'WingBack', 'NoNonsenseFullBack', 'CompleteWingBack', 'InvertedWingBack', 'WideMidfielder', 'Winger', 'DefensiveWinger', 'WidePlaymaker', 'InvertedWinger', 'InsideForward', 'WideTargetMan', 'Raumdeuter', 'AttackingMidfielder', 'Trequartista', 'Enganche', 'ShadowStriker', 'DeepLyingForward', 'AdvancedForward', 'TargetMan', 'Poacher', 'CompleteForward', 'PressingForward', 'FalseNine');

-- CreateEnum
CREATE TYPE "EnumRoleType" AS ENUM ('Attack', 'Support', 'Defend', 'Stopper', 'Cover', 'Automatic');

-- AlterTable
ALTER TABLE "positions" DROP COLUMN "basePosition",
ADD COLUMN     "basePosition" "EnumPlayerPositionBase" NOT NULL,
DROP COLUMN "positionRole",
ADD COLUMN     "positionRole" "EnumPlayerPositionRole" NOT NULL,
DROP COLUMN "roleType",
ADD COLUMN     "roleType" "EnumRoleType"[];

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "teamGrade",
ADD COLUMN     "teamGrade" "EnumTeamGrade" NOT NULL;

-- DropEnum
DROP TYPE "PlayerPositionBase";

-- DropEnum
DROP TYPE "PlayerPositionRole";

-- DropEnum
DROP TYPE "RoleType";

-- DropEnum
DROP TYPE "TeamGrade";
