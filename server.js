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
    const result = await pool.query('SELECT * FROM products WHERE status = true');
    res.json(ApiResponse('success', result.rows, 'Product list'));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/products/search', async (req, res) => {
  const { search } = req.query;
  if (!search) {
    return res.status(400).json(ApiResponse('error', null, 'You must provide a search parameter.'));
  }
  try {
    const query = `
      SELECT * FROM products
      WHERE status = true AND (name ILIKE $1 OR product_code ILIKE $1)
    `;
    const result = await pool.query(query, [`%${search}%`]);
    res.json(ApiResponse('success', result.rows, 'Products found'));
  } catch (err) {
    res.status(500).json(ApiResponse('error', null, 'Error retrieving products'));
  }
});

app.get('/products/byProductCode/code', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json(ApiResponse('error', null, 'You must provide a search parameter.'));
  }
  try {
    const query = `
      SELECT * FROM products WHERE status = true and product_code = $1
    `;
    const result = await pool.query(query, [code]); 
    if (result.rows.length === 0) {
      return res.json(ApiResponse('empty', {}, 'No product found with that code.'));
    }
    res.json(ApiResponse('success', result.rows, 'Product found'));
  } catch (err) {
    console.error(err); // For debugging
    res.status(500).json(ApiResponse('error', null, 'Error retrieving products'));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
