import express from 'express';
import * as ProductCtrl from '../src/products/controllers/product-controller';


export default function configureRoutes(app: express.Application) {
  app.get('/api/health', (req, res) => res.send('Hello'));

  app.get('/products/stats', ProductCtrl.getProducts);
  app.post('/products', ProductCtrl.createProduct);
}
