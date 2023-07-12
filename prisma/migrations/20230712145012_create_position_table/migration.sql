-- CreateEnum
CREATE TYPE "PlayerPositionBase" AS ENUM ('Goalkeeper', 'Defenser', 'Midfielder', 'Winger', 'Striker');

-- CreateEnum
CREATE TYPE "PlayerPositionRole" AS ENUM ('Goalkeeper', 'SweeperKeeper', 'WideCentreBack', 'CentralDefender', 'Libero', 'BallPlayingDefender', 'NoNonsenseCentreBack', 'DefensiveMidfielder', 'DeepLyingPlaymaker', 'BallWinningMidfielder', 'AnchorMan', 'HalfBack', 'Regista', 'RoamingPlaymaker', 'SegundoVolante', 'CentralMidfielder', 'BoxToBoxMidfielder', 'AdvancedPlaymaker', 'Mezzala', 'Carrilero', 'FullBack', 'WingBack', 'NoNonsenseFullBack', 'CompleteWingBack', 'InvertedWingBack', 'WideMidfielder', 'Winger', 'DefensiveWinger', 'WidePlaymaker', 'InvertedWinger', 'InsideForward', 'WideTargetMan', 'Raumdeuter', 'AttackingMidfielder', 'Trequartista', 'Enganche', 'ShadowStriker', 'DeepLyingForward', 'AdvancedForward', 'TargetMan', 'Poacher', 'CompleteForward', 'PressingForward', 'FalseNine');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('Attack', 'Support', 'Defend', 'Stopper', 'Cover', 'Automatic');

-- CreateTable
CREATE TABLE "positions" (
    "id" TEXT NOT NULL,
    "basePosition" "PlayerPositionBase" NOT NULL,
    "positionRole" "PlayerPositionRole" NOT NULL,
    "roleType" "RoleType"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);
