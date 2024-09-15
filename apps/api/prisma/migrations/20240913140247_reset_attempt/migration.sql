/*
  Warnings:

  - You are about to drop the `bonus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bonus` DROP FOREIGN KEY `Bonus_bonusId_fkey`;

-- DropTable
DROP TABLE `bonus`;
