import { type BaseProduct } from '../backend/src/products/models/product-model';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ProductType {
  BIKE = 'bike',
  SPEAKER = 'speaker',
  LAPTOP = 'laptop',
}

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
