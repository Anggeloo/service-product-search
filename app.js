const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Search API',
      version: '1.0.0',
      description: 'Product API documentation',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger-product-search', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/swagger.json', (req, res) => {
  res.json(swaggerDocs);
});

app.use('/', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger on http://localhost:${PORT}/swagger-product-search`);
  console.log(`Swagger JSON on http://localhost:${PORT}/swagger.json`);
});
