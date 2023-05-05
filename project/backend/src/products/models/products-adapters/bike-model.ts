import { Schema } from 'mongoose';
import { type BaseProduct } from '../product-model';

export interface IBike extends BaseProduct {
  wheelSize: number;
  color: string;
  frameMaterial: string;
}

export const BikeProductSchema = new Schema<IBike>({
  frameMaterial: {
    type: String,
  },
  wheelSize: {
    type: Number,
  },
  color: {
    type: String,
  },
});

