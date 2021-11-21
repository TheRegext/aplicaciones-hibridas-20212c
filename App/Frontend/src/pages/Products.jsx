import { Link } from 'react-router-dom';

function Products(props) {
    return (
        <div>
            <h1>Products</h1>
            <ul>
                <li><Link to="/products/1" >Producto 1</Link></li>
                <li><Link to="/products/2" >Producto 2</Link></li>
                <li><Link to="/products/3" >Producto 3</Link></li>
            </ul>
        </div>
    )
}
export default Products;