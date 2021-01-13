-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "rating" DECIMAL(65,30) DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT DEFAULT E'user',
ALTER COLUMN "avatar" DROP NOT NULL;
