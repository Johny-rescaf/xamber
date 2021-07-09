-- CreateTable
CREATE TABLE "Redirect" (
    "id" SERIAL NOT NULL,
    "ip" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "device" VARCHAR(150) NOT NULL,
    "browser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Redirect.ip_unique" ON "Redirect"("ip");
