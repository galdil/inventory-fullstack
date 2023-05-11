import ProductModel from '../models/product-model';
import { type ProductType, type Product, SortOrder, type ProductsFields } from '../../../../common/sharedTypes';

import {
  ProductCreationException, ProductStatsException, ProductByTypeException, ProductsFieldsByTypeException,
} from '../../common/errors';

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
  getProductsByType: async (type: ProductType, filters: ProductsFields[], sortBy: ProductsFields, sortOrder: SortOrder, page: number, items: number) => {
    try {
      const query = { type, ...filters };
      let sortQuery;
      if (sortBy) {
        sortQuery = {};
        sortQuery[sortBy] = sortOrder === SortOrder.DESC ? -1 : 1;
      }
      const productStats = await ProductModel.getProductsByType(query, sortQuery, items, page);
      return productStats;
    } catch (err) {
      throw new ProductByTypeException(err?.message);
    }
  },
  getProductsFieldsByType: async (type: ProductType): Promise<Product> => {
    try {
      const products = await ProductModel.find({ type }).select('-_id -__v').lean();
      const fields = Object.keys(products?.[0]);
      const filters = {} as Product;
      for (const field of fields) {
        const values = new Set(products.map(product => product[field]));
        filters[field] = [...values];
      }
      return filters;
    } catch (err) {
      throw new ProductsFieldsByTypeException(err?.message);
    }
  },
};

export default productRepo;
