import { Request, Response } from 'express';
import ProductRepo from '../repo/product-repo';

import { getFilterParams } from '../../common/utils';

import { type ProductType, type Product as ProductProps, type SortOrder } from '../../../../common/sharedTypes';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productDoc = await ProductRepo.createProduct(req.body);
    res.json(productDoc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductRepo.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByType = async (req: Request, res: Response) => {
  try {
    const { type }: { type: ProductType } = req.params;
    const { 
      sortBy, sortOrder, page, items,
    }: { sortBy: keyof ProductProps, sortOrder: SortOrder, page: number, items: number } = req.query;

    const filters = getFilterParams(req);
    const products = await ProductRepo.getProductsByType(type, filters, sortBy, sortOrder, page, items);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductFieldsValuesByType = async (req: Request, res: Response) => {
  try {
    const { type }: { type: ProductType } = req.params;
    const fields = await ProductRepo.getProductsFieldsByType(type);
    res.json(fields);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
