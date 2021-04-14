-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DELETED', 'BANNED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT E'ACTIVE',
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "banReason" TEXT;
