import React, { createContext, useState, useReducer, useEffect } from "react";
const MyContext = createContext();

// Create a reducer function, at the moment just some basic functions for testing
const myReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemId = action.item._id; ////item._id to add
      let existingItem = state.cartItems[itemId];
      if (existingItem) {
        //if the cart contains one of this item, add 1 to qty
        return {
          ...state,
          total: state.total + Number(action.price.replace("$", "")),
          numOfItems: state.numOfItems + action.payload,
          cartItems: {
            ...state.cartItems,
            [itemId]: { ...existingItem, quantity: existingItem.quantity + 1 },
          },
        };
      } else {
        return {
          //if the cart doesnt contain one of this item, add the item and assign 1 into qty
          ...state,
          total: state.total + Number(action.price.replace("$", "")),
          numOfItems: state.numOfItems + action.payload,
          cartItems: {
            ...state.cartItems,
            [itemId]: { ...action.item, quantity: 1 },
          },
        };
      }

    case "REMOVE_FROM_CART":
      const itemIdRemove = action.item._id; //item._id to remove/substract
      const existingItemRemove = state.cartItems[itemIdRemove];
      // If the item doesn't exist in the cart, do nothing
      if (!existingItemRemove || state.numOfItems === 0) {
        return state;
      }
      let newCartItems;
      if (state.cartItems[action.item._id].quantity === 1) {
        //if the cart contains one of this item, assign 0 to qty and remove the item from cart
        state.cartItems[action.item._id].quantity = 0;
        newCartItems = { ...state.cartItems };
        delete newCartItems[action.item.itemIdRemove];
      } else {
        newCartItems = {
          ...state.cartItems,
          [itemIdRemove]: {
            ...action.item,
            quantity: state.cartItems[itemIdRemove].quantity - 1,
          },
        };
      }
      return {
        //if the cart contains more than one of this item, substract 1 from qty
        ...state,
        total: state.total - Number(action.price.replace("$", "")),
        numOfItems: state.numOfItems - action.payload,
        cartItems: newCartItems,
      };

    case "SET_CART":
      // Convert the array of cart items into an object with item IDs as keys
      const cartItemsObject = action.cartItems.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
      }, {});

      return {
        ...state,
        numOfItems: Object.keys(cartItemsObject).length,
        cartItems: cartItemsObject,
      };
    case "HANDLE_CHECKOUT":
      // Clear carts after purchase
      return {
        ...state,
        cartItems: {},
        numOfItems: 0,
      };
    default:
      return state;
  }
};

// Create a provider component
const MyContextProvider = ({ children }) => {
  const initialState = {
    numOfItems: 0,
    cartItems: {},
    total: 0,
  };

  const [state, dispatch] = useReducer(myReducer, initialState);
  const [myCart, setMyCart] = useState(initialState);

  // Fetch cart data and set it in the state when the context is initialized
  useEffect(() => {
    fetch(`/cart`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        } else {
          return res.json();
        }
      })
      .then((data) => {
        dispatch({ type: "SET_CART", cartItems: data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const contextValue = {
    myCart,
    setMyCart,
    state,
    dispatch,
  };

  // Render the context provider with the shared states
  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
