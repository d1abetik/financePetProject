-- CreateTable
CREATE TABLE "user_registartion" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_registartion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_registartion_email_key" ON "user_registartion"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_registartion_name_key" ON "user_registartion"("name");
