import { User } from "../../models/users";
import { Order } from "../../models/orders";
import { OrdersStore } from "../orderHandler";
import { UserStore } from "../usersHandler";

const orderStore = new OrdersStore()
const userStore = new UserStore()

let testOrder: Order;
let testUser: User

describe("Order Model", ()=>{

    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(orderStore.create).toBeDefined();
      });
    

    beforeAll(async () => {
        const result: User = await userStore.create({
          firstName: 'test',
          lastName: 'test',
          password: 'password'
        })
        testUser = result
      })
    afterAll(async () => {
        await userStore.delete((testUser.id as unknown) as string)
    })
 
    //should create an order
    it('should create an order : create method', async () => {
        const result = await orderStore.create({
            user_id: (testUser.id as unknown) as string,
            status: "Open"
        })
        testOrder = result
        expect(result).toEqual(jasmine.objectContaining({
            id: testOrder.id,
            user_id: testUser.id, 
            status: "Open"
        })
        );
    })


});   