const ProductRepository = require("../repositories/product.repository");

const ProductService = {
    async getAllProducts() {
        return await ProductRepository.findAll();
    },
    async getProductById(id) {
        return await ProductRepository.findById(id);
    },
    async createProduct(data) {
        return await ProductRepository.create(data);
    },
    async updateProduct(id, data) {
        return await ProductRepository.update(id, data);
    },
    async deleteProduct(id) {
        return await ProductRepository.delete(id);
    },
};

module.exports = ProductService;
