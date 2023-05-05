import { Schema } from 'mongoose';
import { type BaseProduct } from '../product-model';

export interface ILaptop extends BaseProduct {
  brand: string;
  color: string;
  memory: string;
}

export const LaptopProductSchema = new Schema<ILaptop>({
  brand: {
    type: String,
  },
  memory: {
    type: String,
  },
  color: {
    type: String,
  },
});

