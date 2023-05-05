import Product, { IProduct } from '../models/product-model';

import { ProductCreationException, ProductStatsException } from '../../common/errors';

const productRepo = {
  createProduct: async (productData: IProduct) => {
    try {
      const productDoc = await Product.create(productData);
      return productDoc;
    } catch (err) {
      throw new ProductCreationException(err?.message);
    }
  },
  getProducts: async () => {
    try {
      const productStats = await Product.getProductsStats();
      return productStats;
    } catch (err) {
      throw new ProductStatsException(err?.message);
    }
  },
};

export default productRepo;
