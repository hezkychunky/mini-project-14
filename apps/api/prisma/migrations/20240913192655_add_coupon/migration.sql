-- AlterTable
ALTER TABLE `user` ADD COLUMN `coupon` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `couponValidUntil` DATETIME(3) NULL;
