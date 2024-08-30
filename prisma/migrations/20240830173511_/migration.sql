-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('JUNIOR', 'MID', 'SENIOR');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "SalaryRange" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobListingId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobListing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT,
    "salaryRange" "SalaryRange" NOT NULL,
    "experience" "Experience" NOT NULL,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobListingId_fkey" FOREIGN KEY ("jobListingId") REFERENCES "JobListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
