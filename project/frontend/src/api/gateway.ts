import axios, { type AxiosResponse } from 'axios';

import { type QueryParamsObj } from '@src/pages/Inventory/types';
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
}

export default Gateway;
