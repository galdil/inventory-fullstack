import { Schema, Document, model } from 'mongoose';

type ProductType = 'bike' | 'speaker' | 'chair';

interface Product extends Document {
  name: string;
  description: string;
  price: number;
  color: string;
  type: ProductType;
  properties: Record<string, unknown>;
}

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  properties: { type: Schema.Types.Mixed }, // any additional properties
});

const ProductModel = model<Product>('Product', ProductSchema);

export { Product, ProductModel };
