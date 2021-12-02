
export default function ProductReducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, action.payload];
        case 'remove':
            return state.filter(product => product.id !== action.payload);
        case 'update':
            return state.map(product => {
                if (product.id === action.payload.id) {
                    return action.payload;
                }
                return product;
            });
        default:
            return state;
    }
}