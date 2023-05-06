import { Schema } from 'mongoose';
import { type ILaptop } from '../../../../../common/sharedTypes';

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
