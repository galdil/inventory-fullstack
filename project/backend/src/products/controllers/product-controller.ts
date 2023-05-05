import ProductRepo from '../repo/product-repo';

export const createProduct = async (req, res) => {
  try {
    const productDoc = await ProductRepo.createProduct(req.body);
    res.json(productDoc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductRepo.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
