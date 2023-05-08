import axios, { type AxiosResponse } from 'axios';

import { type QueryParamsObj } from '@components/ProductsTable/types';
import { type ProductType, type Product } from '@common/sharedTypes';
import { type ProductStats } from './type';

const BE_URL = import.meta.env.VITE_INVENTORY_URL;

class Gateway {
  static async get<T>(path: string): Promise<AxiosResponse<T>> {
    const res = await axios.get<T>(`${BE_URL}/${path}`);
    return res;
  }

  static async getProductStats(): Promise<AxiosResponse<ProductStats[]>> {
    const res = await Gateway.get<ProductStats[]>('products/stats');
    return res;
  }

  static async getProductsByType(type: ProductType, queryParams: QueryParamsObj = {}): Promise<AxiosResponse<Product[]>> {
    const queryString = new URLSearchParams(queryParams).toString();
    const res = await Gateway.get<Product[]>(`products/${type}?${queryString}`);
    return res;
  }

  static async getProductsFilterValuesByType(type: ProductType): Promise<AxiosResponse<Record<keyof Product, any>>> {
    const res = await Gateway.get<Record<keyof Product, any>>(`/products/fields/${type}`);
    return res;
  }
}

export default Gateway;
