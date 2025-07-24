const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserStats = async (req, res) => {
    const userId = req.user.userId;

    try {
        const notebookCount = await prisma.notebook.count({
            where: { userId },
        });

        const notes = await prisma.note.findMany({
            where: {
                notebook: { userId },
            },
            include: {
                revisions: {
                    orderBy: {
                        createdAt: "desc", // çünkü only this exists
                    },
                    take: 1,
                },
            },
        });

        const totalNotes = notes.length;
        const sharedNotes = notes.filter((n) => n.access !== "PRIVATE").length;

        // en güncel revision'ı bul
        const lastEditDate = notes.length > 0
            ? notes[0].revisions[0]?.createdAt ?? null
            : null;

        const recentNotes = notes.slice(0, 5).map((note) => ({
            id: note.id,
            title: note.title,
            lastEditedAt: note.revisions[0]?.createdAt ?? null,
        }));

        res.json({
            notebookCount,
            totalNotes,
            sharedNotes,
            lastEditDate,
            recentNotes,
        });
    } catch (err) {
        console.error("İstatistik hatası:", err);
        res.status(500).json({ message: "İstatistikler alınamadı." });
    }
};