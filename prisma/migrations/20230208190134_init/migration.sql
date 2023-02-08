-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "post_code" TEXT NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);
