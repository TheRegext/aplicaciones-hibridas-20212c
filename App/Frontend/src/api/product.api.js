import config from '../config/config';

export async function deleteProduct(id) {
    return fetch(`${config.api.url}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
}

export default {
    deleteProduct
}