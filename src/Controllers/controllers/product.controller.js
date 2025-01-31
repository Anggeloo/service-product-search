const ProductService = require("../services/product.service");
const ApiResponse = require("../utils/ApiResponse");

const ProductController = {
    async getAll(req, res) {
        const products = await ProductService.getAllProducts();
        res.json(ApiResponse(200, products, "Productos obtenidos"));
    },
    async getById(req, res) {
        const product = await ProductService.getProductById(req.params.id);
        if (!product) return res.status(404).json(ApiResponse(404, null, "Producto no encontrado"));
        res.json(ApiResponse(200, product, "Producto obtenido"));
    },
    async create(req, res) {
        const newProduct = await ProductService.createProduct(req.body);
        res.status(201).json(ApiResponse(201, newProduct, "Producto creado"));
    },
    async update(req, res) {
        const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
        res.json(ApiResponse(200, updatedProduct, "Producto actualizado"));
    },
    async delete(req, res) {
        await ProductService.deleteProduct(req.params.id);
        res.json(ApiResponse(200, null, "Producto eliminado"));
    },
};

module.exports = ProductController;
