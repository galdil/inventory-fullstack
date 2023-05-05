import ProductRepo from '../repo/product-repo';

export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const productDoc = await ProductRepo.createProduct(req.body);
    res.json(productDoc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
