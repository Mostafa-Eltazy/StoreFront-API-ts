import { User } from "../../models/users";
import { UserStore } from "../usersHandler";


const store = new UserStore()

let testUser : User


describe("User Model", ()=>{
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
      });
    
      it('should have an authenticate method', () => {
        expect(store.authenticateUser).toBeDefined();
      });
  
    //testing create method
  it('create method should add a user', async () => {
    const createdUser: User = await store.create({
      firstName: 'Mostafa',
      lastName: 'Eltazy',
      password: 'password123'
    })
    testUser = createdUser
    //console.log(testUser)

    expect(testUser).toEqual(
      jasmine.objectContaining({
        id: testUser.id,
        firstname: 'Mostafa',
        lastname: 'Eltazy'
      })
    )
  })
        //testing index method
    it('Should return a list of users : index method', async () => {
        const result = await store.index();
        expect(result).toContain(
            jasmine.objectContaining({
                id: testUser.id,
                firstname: 'Mostafa',
                lastname: 'Eltazy'
            })
        );
    });

    //testing show method
    it("Should return a user : show method", async () => {
        const result = await store.show((testUser.id as unknown) as string);
        expect(result).toEqual(
            jasmine.objectContaining({
                id: testUser.id,
                firstname: "Mostafa",
                lastname: "Eltazy"
            })
        )
    }); 

    //testing delete method
    it("Should delete a user : delete method", async () => {
        await store.delete((testUser.id as unknown) as string);
        const result = await store.index()
        expect(result).not.toContain(
            jasmine.objectContaining({
                id: testUser.id,
                firstName: 'Mostafa',
                lastName: 'Eltazy',
              })
        )
    }); 
    
});