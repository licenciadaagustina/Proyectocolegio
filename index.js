const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
    user: 'tu_usuario',
    host: 'localhost',
    database: 'tu_base_de_datos',
    password: 'tu_contraseña',
    port: 5432,
});

const secretKey = 'tu_secreto_jwt';

// Ruta de registro
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO usuarios (username, password) VALUES ($1, $2)',
            [username, hashedPassword]
        );
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Ruta protegida para agregar matriculados
app.post('/matriculados', authenticateToken, async (req, res) => {
    const { apellido, nombre, dni, titulo_universitario, instituto_universidad, matricula_profesional, correo_electronico, domicilio_consultorio, observaciones } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO Matriculados (apellido, nombre, dni, titulo_universitario, instituto_universidad, matricula_profesional, correo_electronico, domicilio_consultorio, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [apellido, nombre, dni, titulo_universitario, instituto_universidad, matricula_profesional, correo_electronico, domicilio_consultorio, observaciones]
        );
        res.status(201).json({ message: 'Matriculado agregado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar matriculado' });
    }
});

// Middleware para autenticar token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});
