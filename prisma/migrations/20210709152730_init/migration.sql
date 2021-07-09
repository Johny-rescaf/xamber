/*
  Warnings:

  - Made the column `longUrl` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "longUrl" SET NOT NULL;
