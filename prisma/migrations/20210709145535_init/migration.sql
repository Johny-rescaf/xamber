-- CreateTable
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL,
    "shortUrl" VARCHAR(255) NOT NULL,
    "longUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
