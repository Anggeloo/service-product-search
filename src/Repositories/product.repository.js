const Product = require("../models/product.model");

const ProductRepository = {
    async findAll() {
        return await Product.find();
    },
    async findById(id) {
        return await Product.findById(id);
    },
    async create(productData) {
        return await Product.create(productData);
    },
    async update(id, productData) {
        return await Product.findByIdAndUpdate(id, productData, { new: true });
    },
    async delete(id) {
        return await Product.findByIdAndDelete(id);
    },
};

module.exports = ProductRepository;

