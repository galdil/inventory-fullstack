import ProductRepo from '../repo/product-repo';

export const createProduct = async (req, res) => {
  try {
    const productDoc = await ProductRepo.createProduct(req.body);
    res.ok(productDoc);
  } catch (error) {
    res.error();
  }
};
