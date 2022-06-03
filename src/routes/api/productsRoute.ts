import express from "express";
import validateJWT from "../../middleware/validateJWT";
import { Product } from "../../models/product";
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
productsRoute.post(
  "/create/",
  validateJWT,
  async (req: express.Request, res: express.Response) => {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    try {
      const newProduct = await store.create(product);
      console.log(newProduct)
      res.send(newProduct);
    } catch (e) {
      res.send("Failed to create product");
    }
  }
);

export default productsRoute;
