import { Schema, Document, model, Model } from 'mongoose';
import { BikeProductSchema, type IBike } from './products-adapters/bike-model';
import { SpeakerProductSchema, type ISpeaker } from './products-adapters/speaker-model';
import { LaptopProductSchema, type ILaptop } from './products-adapters/laptop-model';

export type ProductType = 'bike' | 'speaker' | 'laptop';

const baseOptions = {
  discriminatorKey: 'type',
  collection: 'products',
};

interface ProductStats {
  count: number,
  type: ProductType,
}

export interface BaseProduct extends Document {
  name: string;
  description: string;
  price: number;
  type: ProductType;
}

export type Product = IBike | ISpeaker | ILaptop;

export interface IProductModel extends Model<BaseProduct> {
  getProductsStats(): Promise<ProductStats[]>
}

const ProductSchema = new Schema<BaseProduct>(
  {
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
  },
  baseOptions,
);

ProductSchema.statics.getProductsStats = async function getProductsStats() {
  const productsByType = await this.aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } },
    { $project: { _id: 0, type: '$_id', count: 1 } },
  ]);
  return productsByType;
};

const ProductModel = model<Product, IProductModel>('Product', ProductSchema);

ProductModel.discriminator<IBike>('bike', BikeProductSchema);
ProductModel.discriminator<ISpeaker>('speaker', SpeakerProductSchema);
ProductModel.discriminator<ILaptop>('laptop', LaptopProductSchema);


export default ProductModel;
