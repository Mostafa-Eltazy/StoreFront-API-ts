import express from "express";
import validateJWT from "../../middleware/validateJWT";
import { Order } from "../../models/orders";
import { OrdersStore } from "../../handlers/orderHandler";

const ordersRoute = express.Router();
const store = new OrdersStore();

ordersRoute.get(
  "/",
  validateJWT,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const orders = await store.index();
      res.json(orders);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

ordersRoute.get(
  "/show/:id",
  validateJWT,
  async (req: express.Request, res: express.Response): Promise<void> => {
    const orderID: string = req.params.id;
    try {
      const order = await store.show(orderID);
      if (order) {
        res.json(order);
      } else {
        res.send(`Failed to find order with id: ${orderID}`);
      }
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

ordersRoute.get(
  "/user/:id",
  validateJWT,

  async (req: express.Request, res: express.Response) => {
    const userID: string = req.params.id;
    try {
      const userOrders = await store.getUserOrders(userID);
      res.json(userOrders);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

ordersRoute.post(
  "/create/",
  validateJWT,
  async (req: express.Request, res: express.Response) => {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    try {
      const newOrder = await store.create(order);
      console.log(newOrder);
      res.send(newOrder);
    } catch (e) {
      res.send("Failed to create Order");
    }
  }
);

export default ordersRoute;
