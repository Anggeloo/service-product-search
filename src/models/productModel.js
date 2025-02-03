const db = require('../db/db');

const getAllProducts = async () => {
    const query = `
        SELECT * FROM product WHERE status = true
    `;
    const result = await db.query(query);
    return result.rows;
};

const getProductSearch = async (search) => {
    const query = `
        SELECT * FROM product
        WHERE status = true AND (name ILIKE $1 OR product_code ILIKE $1)
    `;
    const result = await db.query(query, [`%${search}%`]);
    return result.rows;
};

const getProductByCodice = async (codice) => {
    const query = `SELECT * FROM product WHERE status = true AND product_code = $1`;
    const result = await db.query(query, [codice]);
    return result.rows;
};

module.exports = { getAllProducts, getProductSearch, getProductByCodice };
