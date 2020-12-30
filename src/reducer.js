// Initial store
export const initialState = {
    basket: [],
    user: null
}

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            }

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                // this will find the first item, even if there are multiple items of same type
                (basketItem) => basketItem.id === action.id
            );

            let newBasket = [...state.basket];
            if (index >= 0) {
                const itemsToRemove = 1;
                newBasket.splice(index, itemsToRemove);
            } else {
                console.warn(`Cant remove product with id: ${action.id} because it is not in the basket!!`);
            }

            return { ...state, basket: newBasket };

            case 'SET_USER':
                return {
                    ...state,
                    user: action.user,
                }

            case 'EMPTY_BASKET':
                return {
                    ...state,
                    basket: []
                };

        default:
            return state;
    }
    
}

// selector
export const getBasketTotal = (basket) => {
    /*
    let totalPrice = 0;
    basket.map(item => {
        totalPrice += parseInt(item.price);
    });
    return totalPrice;
    */
    const initialAmount = 0;
    return basket?.reduce((amount, item) => parseInt(item.price) + amount, initialAmount);
}

export default reducer;