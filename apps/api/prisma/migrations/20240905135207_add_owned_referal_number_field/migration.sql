/*
  Warnings:

  - A unique constraint covering the columns `[ownedReferalNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `ownedReferalNumber` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_ownedReferalNumber_key` ON `User`(`ownedReferalNumber`(4));
