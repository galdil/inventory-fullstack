import express, { Request, Response } from 'express';
import * as ProductCtrl from '../src/products/controllers/product-controller';
import Product, { type ProductType, type BaseProduct } from '../src/products/models/product-model';

import { getFilterParams } from '../src/common/utils';

export default function configureRoutes(app: express.Application) {
  app.get('/api/health', (req, res) => res.send('Hello'));

  app.get('/products/stats', ProductCtrl.getProducts);
  // [{ type: 'bike', count: 4 }, { type: 'speaker', count: 2 }]

  app.post('/products', ProductCtrl.createProduct);
  
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
        properties: {
          color: red,
          wheelSize: 12,
        }
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

  
  
  // todo fix types
  app.get('/products/:type', async (req: Request, res: Response) => {
    try {
      const { type }: { type: ProductType } = req.params;
      const { sortBy, sortOrder }: { sortBy: keyof BaseProduct, sortOrder: 'asc' | 'desc' } = req.query;
      const filters = getFilterParams(req);
      const query = Product.find({ type, ...filters });
      if (sortBy) {
        const sortQuery = {};
        sortQuery[sortBy] = sortOrder === 'desc' ? -1 : 1;
        query.sort(sortQuery);
      }
      const products = await query.exec();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}


