import axios, { type AxiosResponse } from 'axios';

import { ProductStats } from './type';

const BE_URL = import.meta.env.VITE_INVENTORY_URL;

class Gateway {
  static async get(path: string): Promise<AxiosResponse<ProductStats[]>> {
    const res = await axios.get<ProductStats[]>(`${BE_URL}/${path}`);
    return res;
  }
}

export default Gateway;
