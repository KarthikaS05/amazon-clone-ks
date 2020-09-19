export const initialState = {
    basket: [],
    user: null
};

//Selector - to get the total price of basket items
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);
//iterates thrg basket, get the price add it to amount and return

const reducer = (state, action) => {
  console.log(action);
    switch (action.type) {
      
        case "SET_USER":
            return {
                ...state,
                user: action.user
        }
      case "EMPTY_BASKET":
        return {
          ...state,
          basket: []
        }
            
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
          };
      
      case "REMOVE_FROM_BASKET":
      
          //get the index find the 1st item and return it to u
          const index = state.basket.findIndex(
              (basketItem) => basketItem.id === action.id
          );
          let newBasket = [...state.basket];

          if (index >= 0) {
              newBasket.splice(index, 1);
          } else {
              console.warn('Cant remove product (id: ${action.id}) as it is not in basket!')
          }

          return {
              ...state,
              basket: newBasket
          }
      
    default:
      return state;
  }
};

export default reducer;
