import { Schema, Document, model } from 'mongoose';

type ProductType = 'bike' | 'speaker' | 'chair';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  type: ProductType;
  properties?: Record<string, unknown>;
}

const Product = new Schema<IProduct>({
  name: { 
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  properties: { 
    type: Schema.Types.Mixed,
  },
});


export default model<IProduct>('Product', Product);
