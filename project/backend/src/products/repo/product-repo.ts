import ProductModel from '../models/product-model';
import { type Product } from '../../../../common/sharedTypes';

import { ProductCreationException, ProductStatsException, ProductByTypeException } from '../../common/errors';

const productRepo = {
  createProduct: async (productData: Product) => {
    try {
      const productDoc = await ProductModel.create(productData);
      return productDoc;
    } catch (err) {
      throw new ProductCreationException(err?.message);
    }
  },
  getProducts: async () => {
    try {
      const productStats = await ProductModel.getProductsStats();
      return productStats;
    } catch (err) {
      throw new ProductStatsException(err?.message);
    }
  },
  getProductsByType: async (type, filters, sortBy, sortOrder) => {
    try {
      const query = { type, ...filters };
      let sortQuery;
      if (sortBy) {
        sortQuery = {};
        sortQuery[sortBy] = sortOrder === 'desc' ? -1 : 1;
      }
      const productStats = await ProductModel.getProductsByType(query, sortQuery);
      return productStats;
    } catch (err) {
      throw new ProductByTypeException(err?.message);
    }
  },
};

export default productRepo;
