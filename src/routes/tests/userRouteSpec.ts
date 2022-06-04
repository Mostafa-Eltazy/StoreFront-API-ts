import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/users";
import { Response } from 'express';

const route = supertest(app)

let result: supertest.Response


describe('Testing /user endpoints', () =>{
    let token: string

    const testUser: User = {
        firstName: 'Mostafa',
        lastName: 'Eltazy',
        password: 'password123'
      };
      
    it('should create new user', async () => {
        const response = await route.post('/users/create/').send(testUser);
        expect(200);
        token = response.body.token;
      });

    it('Should respond with status 200', async () =>{
        result = await route.get(`/users/`).set('Authorization', 'bearer ' + token)
        token = result.body.accessToken; 
        expect(result.status).toEqual(200)

    })

    it('users/show/id : should respond with unauthorized', async () => {
      const Response = await route
        .get(`/users/show/${testUser.id}`)
        .expect(401);
    })

}) 