import supertest from "supertest";
import app from "../../server";
import { Product } from "../../models/product";
import { User } from "../../models/users";
const route = supertest(app);
let token: string;

describe("Testing product endpoints", () => {
  describe("testing for  /products", () => {
    const testUser: User = {
      firstName: "Test",
      lastName: "Test",
      password: "password123",
    };

    const testProduct: Product = {
      name: "test",
      price: 10,
    };
    const testProduct2: Product = {
      name: "test2",
      price: 20,
    };

    beforeAll(async () => {
      const response = await route.post("/users/create").send(testUser);
      token = response.body.token;
    });
    it("should create new product", async () => {
      await route
        .post("/products/create")
        .set("Authorization", "bearer " + token)
        .send(testProduct)
        .expect(200);
    });

    it("should list products", async () => {
      await route
        .get("/products")
        .set("Authorization", "Bearer " + token)
        .expect(200);
    });

    it("/id : should respond with 200", async () => {
      await route
        .get("/products/show/2")
        .set("Authorization", "Bearer " + token)
        .expect(200);
    });
  });
});
