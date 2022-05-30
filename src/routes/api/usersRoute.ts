import express from "express";
import { User } from "../../models/users";
import { UserStore } from "../../handlers/usersHandler";

const usersRoute = express.Router();
const store = new UserStore();

usersRoute.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    console.log("all");
    const users = await store.index();
    res.json(users);
  }
);

usersRoute.post(
  "/create/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    console.log("here");
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    res.json(user);
  }
);

usersRoute.get(
  "/show/:id",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const userID: string = req.params.id;

    const user = await store.show(userID);
    if (user) {
      res.json(user);
    } else {
      res.send(`Failed to find user with id: ${userID}`);
    }
  }
);

usersRoute.delete(
  "/delete/:id",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const userID: string = req.params.id;

    const user = await store.delete(userID);
    res.send("user deleted");
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

export default usersRoute;
