const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

io.on("connection", (socket) => {
    console.log("🟢 Yeni socket bağlantısı:", socket.id);

    socket.on("join-note", (noteId) => {
        socket.join(noteId);
        console.log(`📄 ${socket.id} not ${noteId} odasına katıldı`);
    });

    socket.on("edit-note", ({ noteId, content }) => {
        socket.to(noteId).emit("note-updated", content);
    });

    socket.on("disconnect", () => {
        console.log("🔴 Bağlantı koptu:", socket.id);
    });
});

const authRoutes = require('./routes/auth.routes');
const notebookRoutes = require('./routes/notebook.routes');
const noteRoutes = require('./routes/note.routes');
const userRoutes = require('./routes/user.routes');

app.use("/api/auth", authRoutes);
app.use("/api/notebooks", notebookRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send(" Notix API çalışıyor.");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(` Sunucu çalışıyor: http://localhost:${PORT}`);
});