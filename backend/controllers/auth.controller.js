const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user.id, email: user.email },
        process.env.REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "Email zaten kayıtlı." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        res.status(201).json({ message: "Kayıt başarılı.", user: { id: user.id, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Sunucu hatası." });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "Kullanıcı bulunamadı." });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Şifre hatalı." });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({
            message: "Giriş başarılı.",
            accessToken,
            refreshToken,
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Sunucu hatası." });
    }
};

exports.refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "Token gerekli." });

    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Geçersiz token." });
        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    });
};
