/*
  Warnings:

  - Added the required column `type` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dates_available` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "dates_available" JSONB NOT NULL,
ADD COLUMN     "images" TEXT[];
