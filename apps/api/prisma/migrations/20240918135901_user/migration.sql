/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownedReferalNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    DROP COLUMN `name`,
    ADD COLUMN `balance` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `coupon` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `couponValidUntil` DATETIME(3) NULL,
    ADD COLUMN `ownedReferalNumber` VARCHAR(191) NULL,
    ADD COLUMN `referalNumber` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('User', 'Admin') NOT NULL DEFAULT 'User',
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Bonus` (
    `bonusId` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL DEFAULT 10000,
    `ownerId` INTEGER NOT NULL,
    `validUntil` DATETIME(3) NOT NULL,

    PRIMARY KEY (`bonusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `User_ownedReferalNumber_key` ON `User`(`ownedReferalNumber`);

-- AddForeignKey
ALTER TABLE `Bonus` ADD CONSTRAINT `Bonus_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
