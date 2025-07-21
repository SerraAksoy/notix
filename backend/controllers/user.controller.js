const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserStats = async (req, res) => {
    const userId = req.user.userId;

    try {
        const notebookCount = await prisma.notebook.count({ where: { userId } });

        const notes = await prisma.note.findMany({
            where: {
                notebook: { userId },
            },
            orderBy: { id: "desc" },
        });

        const totalNotes = notes.length;
        const sharedNotes = notes.filter((n) => n.access !== "PRIVATE").length;
        const lastEditDate = notes.length > 0 ? notes[0].updatedAt || notes[0].createdAt : null;

        res.json({ notebookCount, totalNotes, sharedNotes, lastEditDate });
    } catch (err) {
        console.error("İstatistik hatası:", err);
        res.status(500).json({ message: "İstatistikler alınamadı." });
    }
};