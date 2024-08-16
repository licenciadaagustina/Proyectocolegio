const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Usuario por defecto de MySQL en XAMPP
    password: '', // Contraseña por defecto de MySQL en XAMPP
    database: 'matriculados_db'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Middleware para parsear el cuerpo de las solicitudes en JSON
app.use(express.json());

// Ruta para registrar un nuevo matriculado
app.post('/matriculados', (req, res) => {
    const { apellido, nombre, dni, titulo, instituto, matricula, correo, domicilio, observaciones } = req.body;
    const sql = 'INSERT INTO matriculados (apellido, nombre, dni, titulo, instituto, matricula, correo, domicilio, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [apellido, nombre, dni, titulo, instituto, matricula, correo, domicilio, observaciones];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar el matriculado' });
        }
        res.status(201).json({ id: result.insertId, ...req.body });
    });
});

// Ruta para obtener todos los matriculados
app.get('/matriculados', (req, res) => {
    const sql = 'SELECT * FROM matriculados';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los matriculados' });
        }
        res.status(200).json(results);
    });
});

// Ruta para servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
