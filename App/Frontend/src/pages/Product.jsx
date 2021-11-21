import {useParams} from 'react-router-dom'

function Product(props) {
    const {id} = useParams();
  return (
      <div>
          <h1>Producto #{id}</h1>
      </div>
  )
}

export default Product;