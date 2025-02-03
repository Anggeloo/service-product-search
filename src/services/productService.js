const productModel = require('../models/productModel');

exports.getAll = async () => {
    return await productModel.getAllProducts();
};

exports.getSearch = async (search) => {
    return await productModel.getProductSearch(search);
};

exports.getByCodice = async (codice) => {
    return await productModel.getProductByCodice(codice);
};

