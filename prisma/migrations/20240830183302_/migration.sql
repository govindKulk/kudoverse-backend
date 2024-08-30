/*
  Warnings:

  - Added the required column `userId` to the `JobListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobListing" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "JobListing" ADD CONSTRAINT "JobListing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
