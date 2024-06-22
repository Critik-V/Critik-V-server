/*
  Warnings:

  - You are about to drop the column `posX` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `posY` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "posX",
DROP COLUMN "posY";
