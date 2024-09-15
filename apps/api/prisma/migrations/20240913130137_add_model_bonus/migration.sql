-- CreateTable
CREATE TABLE `Bonus` (
    `amount` INTEGER NOT NULL DEFAULT 10000,
    `bonusId` INTEGER NOT NULL,
    `validUntil` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Bonus_bonusId_key`(`bonusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bonus` ADD CONSTRAINT `Bonus_bonusId_fkey` FOREIGN KEY (`bonusId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
