import { createContext, useContext, useReducer } from "react";
import API from '../api/product.api'
import ProductReducer from "../reducer/Products.Reducer";
import { ProductAdd, ProductRemove } from "../action/Product.Actions";

const ProductsContext = createContext();
// action tiene dos valores type y payload


export function ProductsProvider(props) {
    const [state, dispatch] = useReducer(ProductReducer, []);

    const remove =  async (product) => {
        dispatch(ProductRemove(product));
                
        return API.deleteProduct(product.id)
        .catch(() => {  
            dispatch(ProductAdd(product));
            throw new Error('Error al eliminar el producto');
        });
    }

    return (
        <ProductsContext.Provider value={{ state, dispatch, remove }}>
            {props.children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context;
}

