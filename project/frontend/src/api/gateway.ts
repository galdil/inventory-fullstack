import axios, { type AxiosResponse } from 'axios';

import { type ProductStats } from './type';
import { type ProductType, type Product } from '../../../common/sharedTypes';

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

  static async getProductsByType(type: ProductType): Promise<AxiosResponse<Product[]>> {
    const res = await Gateway.get<Product[]>(`products/${type}`);
    return res;
  }
}

export default Gateway;
