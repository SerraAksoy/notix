const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const authRoutes = require('./routes/auth.routes');
const notebookRoutes = require('./routes/notebook.routes');
const noteRoutes = require('./routes/note.routes');
const userRoutes = require("./routes/user.routes");

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json()); // <-- önce middleware'ler

app.use('/api/auth', authRoutes); // <-- sonra router
app.use('/api/notebooks', notebookRoutes);
app.use('/api/notes', noteRoutes);
app.use("/users", userRoutes);

app.get('/', (req, res) => {
    res.send('Notix API Çalışıyor 🚀');
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor 🚀`);
});
