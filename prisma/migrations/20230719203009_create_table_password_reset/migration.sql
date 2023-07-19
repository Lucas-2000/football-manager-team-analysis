-- CreateTable
CREATE TABLE "passwordReset" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passwordReset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "passwordReset" ADD CONSTRAINT "passwordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
