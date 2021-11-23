import { Link } from 'react-router-dom';
import { useProducts, ProductsProvider } from '../context/Products.Context';

function ProductListItem(props) {
    const { products, remove } = useProducts();

    return (
        <li>
            <Link to={`/products/${props.product.id}`}>{props.product.id}/{products.length} - {props.product.name}</Link>
            <button onClick={() => { remove(props.product) }}>Eliminar</button>
        </li>
    )
}

function ProductList() {
    const { products } = useProducts();

    return (
        <ul>
            {products.map(product => (
                <ProductListItem key={product.id} product={product} />
            ))}
        </ul>
    )
}


function ProductsPage(props) {
    return (
        <div>
            <h1>Products</h1>
            <ProductsProvider >
                <ProductList />
            </ProductsProvider>
        </div>
    )
}
export default ProductsPage;