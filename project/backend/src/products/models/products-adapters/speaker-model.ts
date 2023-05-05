import { Schema } from 'mongoose';
import { type BaseProduct } from '../product-model';

export interface ISpeaker extends BaseProduct {
  brand: string;
  color: string;
  wireless: boolean;
}

export const SpeakerProductSchema = new Schema<ISpeaker>({
  brand: {
    type: String,
  },
  wireless: {
    type: Boolean,
  },
  color: {
    type: String,
  },
});

