import express from "express";
import jwt from "jsonwebtoken";
import validateJWT from "../../middleware/validateJWT";
import { User } from "../../models/users";
import { UserStore } from "../../handlers/usersHandler";

const usersRoute = express.Router();
const store = new UserStore();

usersRoute.get(
  "/",
  validateJWT,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const users = await store.index();
      res.json(users);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

usersRoute.post(
  "/create/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };
    try {
      const newUser = await store.create(user);
      const token = jwt.sign(
        { user: newUser },
        process.env.TOKEN_SECRET as string
      );
      res.send({ token });
    } catch (e) {
      res.send("Failed to create user");
    }
  }
);

usersRoute.get("/auth", async (req: express.Request, res: express.Response) => {
  try {
    const user: User = await store.authenticateUser(
      req.body.firsName,
      req.body.lastName,
      req.body.password_digest
    );
    if (user !== null) {
      res.send(user);
    }
  } catch (err) {
    res.status(400);
    res.json(err as string);
  }
});

usersRoute.get(
  "/show/:id",
  validateJWT,
  async (req: express.Request, res: express.Response): Promise<void> => {
    const userID: string = req.params.id;

    try {
      const user = await store.show(userID);
      if (user) {
        res.json(user);
      } else {
        res.send(`Failed to find user with id: ${userID}`);
      }
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

usersRoute.delete(
  "/delete/:id",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const userID: string = req.params.id;
    try {
      const user = await store.delete(userID);
      res.send("user deleted");
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

export default usersRoute;
