import { type BaseProduct } from '../backend/src/products/models/product-model';

export interface IBike extends BaseProduct {
  wheelSize: number;
  color: string;
  frameMaterial: string;
}

export interface ILaptop extends BaseProduct {
  brand: string;
  color: string;
  memory: string;
}

export interface ISpeaker extends BaseProduct {
  brand: string;
  color: string;
  wireless: boolean;
}

export type Product = IBike | ISpeaker | ILaptop;

export type SortOrder = 'asc' | 'desc';


export type ProductType = 'bike' | 'speaker' | 'laptop';

