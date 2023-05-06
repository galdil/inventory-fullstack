import { Schema } from 'mongoose';
import { type IBike } from '../../../../../common/sharedTypes';

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
