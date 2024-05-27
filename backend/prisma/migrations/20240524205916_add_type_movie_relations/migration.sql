-- CreateTable
CREATE TABLE "channels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "channelid" INTEGER NOT NULL,
    "typeid" INTEGER NOT NULL,
    "categoryid" INTEGER NOT NULL,
    "videourl" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
