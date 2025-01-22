const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db/db');
const ApiResponse = require('./models/ApiResponse');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos WHERE estado = true');
    res.json(ApiResponse('success', result.rows, 'Lista de productos'));
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

app.get('/products/search', async (req, res) => {
  const { search } = req.query;
  if (!search) {
    return res.status(400).json(ApiResponse('error', null, 'Debe proporcionar un parámetro de búsqueda.'));
  }
  try {
    const query = `
      SELECT * FROM productos
      WHERE estado = true AND (nombre ILIKE $1 OR codigo_producto ILIKE $1)
    `;
    const result = await pool.query(query, [`%${search}%`]);
    res.json(ApiResponse('success', result.rows, 'Productos encontrados'));
  } catch (err) {
    res.status(500).json(ApiResponse('error', null, 'Error al obtener productos'));
  }
});

app.get('/products/byCodiceProducto/codice', async (req, res) => {
  const { codice } = req.query;
  if (!codice) {
    return res.status(400).json(ApiResponse('error', null, 'Debe proporcionar un parámetro de búsqueda.'));
  }
  try {
    const query = `
      SELECT * FROM productos WHERE estado = true and codigo_producto = $1
    `;
    const result = await pool.query(query, [codice]); 
    if (result.rows.length === 0) {
      return res.json(ApiResponse('empty', {}, 'No se encontró ningún producto con ese código.'));
    }
    res.json(ApiResponse('success', result.rows, 'Producto encontrado'));
  } catch (err) {
    console.error(err); // Para depuración
    res.status(500).json(ApiResponse('error', null, 'Error al obtener productos'));
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
