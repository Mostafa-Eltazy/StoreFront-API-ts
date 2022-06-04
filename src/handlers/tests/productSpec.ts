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