import ProductModel, { type Product } from '../models/product-model';

import { ProductCreationException, ProductStatsException } from '../../common/errors';

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
};

export default productRepo;
