const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.createNotebook = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.userId;

    try {
        const notebook = await prisma.notebook.create({
            data: {
                name,
                description,
                userId
            }
        });
        res.status(201).json(notebook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Notebook oluşturulurken hata oluştu.' });
    }
};
exports.getNotebooks = async (req, res) => {
    const userId = req.user.userId;
    try {
        const notebooks = await prisma.notebook.findMany({
            where: { userId }
        });
        res.json(notebooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Notebooklar alınırken hata oluştu.' });
    }
};
exports.updateNotebook = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user.userId;

    try {
        const notebook = await prisma.notebook.findUnique({
            where: { id: Number(id) }
        });

        if (!notebook || notebook.userId !== userId) {
            return res.status(404).json({ message: 'Notebook bulunamadı veya yetkiniz yok.' });
        }

        const updatedNotebook = await prisma.notebook.update({
            where: { id: Number(id) },
            data: { name, description }
        });

        res.json(updatedNotebook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Notebook güncellenirken hata oluştu.' });
    }
};
exports.deleteNotebook = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const notebook = await prisma.notebook.findUnique({
            where: { id: Number(id) }
        });

        if (!notebook || notebook.userId !== userId) {
            return res.status(404).json({ message: 'Notebook bulunamadı veya yetkiniz yok.' });
        }

        await prisma.notebook.delete({
            where: { id: Number(id) }
        });

        res.json({ message: 'Notebook silindi.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Notebook silinirken hata oluştu.' });
    }
};
