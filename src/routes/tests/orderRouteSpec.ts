import supertest from 'supertest'
import app from '../../server'
import { Order } from '../../models/orders'
import { User } from '../../models/users'

const route = supertest(app)
let order: Order
let token: String
let result: supertest.Response

describe('testing for  /orders', () => {
    const testUser: User = {
        firstName: 'Test',
        lastName:'Test',
        password: 'password123'
    }
    
    const testOrder:Order = {
        status:'active',
        user_id: (testUser.id as unknown) as string
    }
    

    beforeAll(async() =>{
        const response = await route.post('/users/create').send(testUser)
        token = response.body.token
    })

    it('should create new order', async () => {
        await route
          .post('/orders/create')
          .send(testOrder)
          .set('Authorization', 'bearer ' + token)
          .expect(200);
      });

    it ('should list orders' ,async() =>{
        await route
        .get('/orders')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
    })

    it ('/orders/user/:id : should respond with 200' ,async() =>{
        await route
        .get(`/orders/user/1`)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
    })
    



})