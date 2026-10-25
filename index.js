const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Requerido por plataformas PaaS
});

// Ruta principal para verificar que la API funciona
app.get('/', (req, res) => {
    res.json({ message: 'API Node.js funcionando correctamente', status: 'Activa' });
});

// Ruta GET para obtener datos de la base de datos
app.get('/api/datos', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Conexión a PostgreSQL exitosa', tiempo: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error conectando a la base de datos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});