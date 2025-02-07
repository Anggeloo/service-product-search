const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get the list of active products
 *     tags: [Product search]
 *     description: Returns a list of active products in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved product list
 *       500:
 *         description: Internal server error
 */
router.get('/products', productController.getAllProducts);

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products by name or code
 *     tags: [Product search]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: Text to search in the product name or code
 *     responses:
 *       200:
 *         description: List of found products
 *       400:
 *         description: Missing search parameter
 */
router.get('/products/search', productController.getProductSearch);

/**
 * @swagger
 * /products/byCodiceProducto:
 *   get:
 *     summary: Search product by exact code
 *     tags: [Product search]
 *     parameters:
 *       - in: query
 *         name: codice
 *         schema:
 *           type: string
 *         required: true
 *         description: Product code to search
 *     responses:
 *       200:
 *         description: Product found
 *       400:
 *         description: Missing codice parameter
 */
router.get('/products/byCodiceProducto', productController.getByCodice);

module.exports = router;
