const ApiResponse = require('../models/ApiResponse');
const productService = require('../services/productService');

exports.getAllProducts = async (req, res) => {
    try {
        const result = await productService.getAll();
        res.json(ApiResponse('success', result, 'Product list'));
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getProductSearch = async (req, res) => {
    try {
        const { search } = req.query;
        const result = await productService.getSearch(search);
        res.json(ApiResponse('success', result, 'Product list'));
    } catch (err) {
        res.status(500).json(ApiResponse('error', null, 'Error retrieving products'));
    }
};

exports.getByCodice = async (req, res) => {
    try {
        const { codice } = req.query;
        if (!codice) {
            return res.status(400).json(ApiResponse('error', null, 'Codice parameter is required.'));
        }
        const result = await productService.getByCodice(codice);
        if (result.length === 0) {
            return res.json(ApiResponse('empty', {}, 'No product found with that code.'));
        }
        res.json(ApiResponse('success', result, 'Product found'));
    } catch (err) {
        console.error(err);
        res.status(500).json(ApiResponse('error', null, 'Error retrieving product'));
    }
};
