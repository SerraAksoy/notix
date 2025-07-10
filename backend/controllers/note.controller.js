const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Note oluştur
exports.createNote = async (req, res) => {
    const { title, content, access, notebookId } = req.body;
    const userId = req.user.userId;

    try {
        const notebook = await prisma.notebook.findUnique({
            where: { id: notebookId }
        });

        if (!notebook || notebook.userId !== userId) {
            return res.status(404).json({ message: 'Notebook bulunamadı veya yetkiniz yok.' });
        }

        const note = await prisma.note.create({
            data: {
                title,
                content,
                access,
                notebookId
            }
        });

        // İlk revision kaydı
        await prisma.revision.create({
            data: {
                noteId: note.id,
                content
            }
        });

        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Note oluşturulurken hata oluştu.' });
    }
};

// Kullanıcının tüm notlarını getir
exports.getNotes = async (req, res) => {
    const userId = req.user.userId;
    try {
        const notes = await prisma.note.findMany({
            where: {
                notebook: {
                    userId
                }
            }
        });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Notlar alınırken hata oluştu.' });
    }
};

// Note güncelle (ve revision ekle)
exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, access } = req.body;
    const userId = req.user.userId;

    try {
        const note = await prisma.note.findUnique({
            where: { id: Number(id) },
            include: { notebook: true }
        });

        if (!note || note.notebook.userId !== userId) {
            return res.status(404).json({ message: 'Note bulunamadı veya yetkiniz yok.' });
        }

        const updatedNote = await prisma.note.update({
            where: { id: Number(id) },
            data: { title, content, access }
        });

        // Revision ekle
        await prisma.revision.create({
            data: {
                noteId: updatedNote.id,
                content
            }
        });

        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Note güncellenirken hata oluştu.' });
    }
};

// Note sil
exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const note = await prisma.note.findUnique({
            where: { id: Number(id) },
            include: { notebook: true }
        });

        if (!note || note.notebook.userId !== userId) {
            return res.status(404).json({ message: 'Note bulunamadı veya yetkiniz yok.' });
        }

        await prisma.note.delete({
            where: { id: Number(id) }
        });

        res.json({ message: 'Note silindi.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Note silinirken hata oluştu.' });
    }
};

// Note'u eski bir revision'a geri al
exports.rollbackNote = async (req, res) => {
    const { id } = req.params;
    const { revisionId } = req.body;
    const userId = req.user.userId;

    try {
        const note = await prisma.note.findUnique({
            where: { id: Number(id) },
            include: { notebook: true }
        });

        if (!note || note.notebook.userId !== userId) {
            return res.status(404).json({ message: 'Note bulunamadı veya yetkiniz yok.' });
        }

        const revision = await prisma.revision.findUnique({
            where: { id: Number(revisionId) }
        });

        if (!revision || revision.noteId !== note.id) {
            return res.status(404).json({ message: 'Revision bulunamadı veya yetkiniz yok.' });
        }

        const updatedNote = await prisma.note.update({
            where: { id: note.id },
            data: { content: revision.content }
        });

        // Yeni bir revision kaydı ekle (geri alınan hali de revision olarak tutulsun)
        await prisma.revision.create({
            data: {
                noteId: updatedNote.id,
                content: revision.content
            }
        });

        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Geri alma işlemi sırasında hata oluştu.' });
    }
};
