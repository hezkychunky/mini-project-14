-- CreateTable
CREATE TABLE `Bonus` (
    `amount` INTEGER NOT NULL DEFAULT 10000,
    `ownerId` INTEGER NOT NULL,
    `validUntil` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ownerId`, `amount`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bonus` ADD CONSTRAINT `Bonus_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
