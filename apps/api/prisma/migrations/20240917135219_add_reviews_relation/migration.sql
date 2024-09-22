-- AlterTable
ALTER TABLE `konser` MODIFY `tanggal` DATETIME(0) NULL;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `quality` VARCHAR(191) NOT NULL,
    `suggestions` VARCHAR(191) NULL,
    `ConcertId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_ConcertId_fkey` FOREIGN KEY (`ConcertId`) REFERENCES `konser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
