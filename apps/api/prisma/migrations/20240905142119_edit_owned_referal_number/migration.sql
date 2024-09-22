/*
  Warnings:

  - A unique constraint covering the columns `[ownedReferalNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_ownedReferalNumber_key` ON `user`;

-- CreateIndex
CREATE UNIQUE INDEX `User_ownedReferalNumber_key` ON `User`(`ownedReferalNumber`);
