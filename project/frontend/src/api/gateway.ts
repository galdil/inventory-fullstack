import axios, { type AxiosResponse } from 'axios';

import { type QueryParamsObj } from '@components/ProductsTable/types';
import type { ProductType, Product, ProductsFields } from '@common/sharedTypes';
import { type ProductStats } from './type';

const BE_URL = import.meta.env.VITE_INVENTORY_URL;

class Gateway {
  static async get<T>(path: string): Promise<AxiosResponse<T>> {
    const res = await axios.get<T>(`${BE_URL}/${path}`);
    return res;
  }

  static async getProductStats(): Promise<AxiosResponse<ProductStats[]>> {
    const productStats = await Gateway.get<ProductStats[]>('products/stats');
    return productStats;
  }

  static async getProductsByType(type: ProductType, queryParams: QueryParamsObj = {}, filtersString = ''): Promise<AxiosResponse<Product[]>> {
    const queryString = new URLSearchParams(queryParams).toString();
    const products = await Gateway.get<Product[]>(`products/${type}?${queryString}&${filtersString}`);
    return products;
  }

  static async getProductsFiltersValuesByType(type: ProductType): Promise<AxiosResponse<Record<ProductsFields, any>>> {
    const filtersValues = await Gateway.get<Record<ProductsFields, any>>(`products/fields/${type}`);
    return filtersValues;
  }
}

export default Gateway;
