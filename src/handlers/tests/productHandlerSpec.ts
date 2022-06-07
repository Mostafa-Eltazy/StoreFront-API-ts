import { Product } from "../../models/product";
import { ProductStore } from "../productsHandler";

const store = new ProductStore()


let testProduct : Product;

describe("Product Model", ()=>{
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });

    it('should diplay a list of products', async () => {
        const newProduct = await store.create({
            name: 'new product',
            price: 0,
        });
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    })
    
    it('should show a single product', async () => {
      const newProduct = await store.create({
          name: 'new product',
          price: 0,
      });
      const result = await store.show("2");
      expect(result).toEqual({
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
    })
  })

    it('should create a product', async () => {
        const result = await store.create({
            name: 'new product',
            price: 0,
        });
        testProduct = result;
        expect(result).toEqual({
            id: testProduct.id,
            name: testProduct.name,
            price: testProduct.price,
        })
        testProduct = result
    })


});