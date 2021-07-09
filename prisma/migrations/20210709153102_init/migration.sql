/*
  Warnings:

  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[urlCode]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Link" DROP CONSTRAINT "Link_pkey",
ADD PRIMARY KEY ("longUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Link.urlCode_unique" ON "Link"("urlCode");
