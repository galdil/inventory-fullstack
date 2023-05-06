import express from 'express';
import * as ProductCtrl from '../src/products/controllers/product-controller';

export default function configureRoutes(app: express.Application) {
  app.get('/api/health', (req, res) => res.send('Hello'));

  app.get('/products/stats', ProductCtrl.getProducts);
  // [{ type: 'bike', count: 4 }, { type: 'speaker', count: 2 }]

  app.post('/products', ProductCtrl.createProduct);

  app.get('/products/:type', ProductCtrl.getProductsByType);

  
  app.get('/products/fields/:type', ProductCtrl.getProductFieldsValuesByType);

  
  /*
   /products/bike?filters[price]=2&filters[name]=avi&sortBy=name&sortOrder=asc&page=5&items=10
  {
    items: [
      {
        _id: 23231,
        name: bike smike,
        description: nandnas,
        price: 2,
        type: bike,
        color: red,
        wheelSize: 12,
      }
    ],
    totalItems: 59,
  }

  /products/filters/bike

  /schema

  [
    {
      type: "bike"
      fields: [
        {
          name: "name",
          type: "string"
        },
        {
          name: "description",
          type: "string"
        },
        {
          name: "price",
          type: "float"
        },
      ]
    }
  ]



  
  **/
}


