import { Schema, Document, model, Model } from 'mongoose';

type ProductType = 'bike' | 'speaker' | 'chair';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  type: ProductType;
  properties?: Record<string, unknown>;
}

export interface IProductModel extends Model<IProduct> {
  getProductsStats(): Promise<IProduct>
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

Product.statics.getProductsStats = async function getProductsStats() {
  const productsByType = await this.aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } },
    { $project: { _id: 0, type: '$_id', count: 1 } },
  ]);
  return productsByType;
};


export default model<IProduct, IProductModel>('Product', Product);
