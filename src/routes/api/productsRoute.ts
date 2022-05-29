import express from "express";
import { ProductStore } from "../../handlers/productsHandler";

const productsRoute = express.Router();
const store = new ProductStore();

productsRoute.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const products = await store.index();
    res.json(products);
  }
);

productsRoute.get(
  "/show/:id",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const productID: string = req.params.id;

    const product = await store.show(productID);
    if (product) {
      res.json(product);
    } else {
      res.send(`Failed to find product with id: ${productID}`);
    }
  }
);

export default productsRoute;
