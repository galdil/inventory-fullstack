import Product, { IProduct } from '../models/product-model';

import { ProductCreationException } from '../../common/errors';

const productRepo = {
  createProduct: async (productData: IProduct) => {
    try {
      const productDoc = Product.create(productData);
      return await productDoc;
    } catch (err) {
      throw new ProductCreationException(err?.message);
    }
  },
  getProducts: async () => {
    try {
      const productDoc = Product.getProductsStats();
      return await productDoc;
    } catch (err) {
      throw new ProductCreationException(err?.message);
    }
  },
};

export default productRepo;
