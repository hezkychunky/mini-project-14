-- CreateTable
CREATE TABLE `event_details` (
    `konserId` INTEGER NOT NULL,
    `harga` INTEGER NULL,
    `isPaidEvent` BOOLEAN NULL DEFAULT false,
    `availableSeats` INTEGER NOT NULL,
    `ticketType` VARCHAR(191) NULL,
    `referralCode` VARCHAR(191) NULL,
    `discount` DOUBLE NULL,
    `discountExpiry` DATETIME(0) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`konserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `konser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deskripsiKonser` VARCHAR(191) NOT NULL,
    `gambarKonser` VARCHAR(191) NULL,
    `lokasi` VARCHAR(191) NULL,
    `namaKonser` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(0) NOT NULL,
    `waktu` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `IdKonser` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event_details` ADD CONSTRAINT `event_details_ibfk_1` FOREIGN KEY (`konserId`) REFERENCES `konser`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_IdKonser_fkey` FOREIGN KEY (`IdKonser`) REFERENCES `konser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
