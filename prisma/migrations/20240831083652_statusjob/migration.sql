/*
  Warnings:

  - The `status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "status",
ADD COLUMN     "status" "Status";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "savedJobs" TEXT[];
