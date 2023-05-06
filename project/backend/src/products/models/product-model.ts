import { Schema, model, type Model, type Query } from 'mongoose';
import { BikeProductSchema } from './products-adapters/bike-model';
import { SpeakerProductSchema } from './products-adapters/speaker-model';
import { LaptopProductSchema } from './products-adapters/laptop-model';

import { 
  type ProductType, type Product, type IBike, type ISpeaker, type ILaptop,
} from '../../../../common/sharedTypes';

const baseOptions = {
  discriminatorKey: 'type',
  collection: 'products',
};

interface ProductStats {
  count: number,
  type: ProductType,
}

export interface BaseProduct {
  name: string;
  description: string;
  price: number;
  type: ProductType;
}

interface IProductModel extends Model<BaseProduct> {
  getProductsStats(): Promise<ProductStats[]>
  getProductsByType(query: Query<Product, IProductModel>, sortQuery?: Query<Product, IProductModel>): Promise<Product[]>
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
    { $project: { type: '$_id', count: 1, _id: 0 } },
    { $sort: { type: 1 } },
  ]);
  return productsByType;
};

ProductSchema.statics.getProductsByType = async function getProductsByType(query, sortQuery) {
  const productsByType = await this.find(query).sort(sortQuery).exec();
  return productsByType;
};

ProductSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const ProductModel = model<Product, IProductModel>('Product', ProductSchema);

ProductModel.discriminator<IBike>('bike', BikeProductSchema);
ProductModel.discriminator<ISpeaker>('speaker', SpeakerProductSchema);
ProductModel.discriminator<ILaptop>('laptop', LaptopProductSchema);


export default ProductModel;
