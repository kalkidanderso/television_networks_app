-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_typeid_fkey" FOREIGN KEY ("typeid") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
