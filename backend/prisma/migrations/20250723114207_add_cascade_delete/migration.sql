-- DropForeignKey
ALTER TABLE "Revision" DROP CONSTRAINT "Revision_noteId_fkey";

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
