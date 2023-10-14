import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import styled from "styled-components";
import safepay from "../pictures/safepay.png";
import { useNavigate } from "react-router-dom";
import { HiChevronDoubleLeft } from "react-icons/hi";

// Function to render the cart page.
const Cart = () => {
  const { state, dispatch } = useContext(MyContext);
  const navigate = useNavigate();

  // Mapping through to parseFloat the prices because they are strings
  const updatedCartContent = Object.values(state.cartItems).map((item) => {
    const priceWithoutCurrencySymbol = item.price.replace("$", "");
    const priceAsNumber = parseFloat(priceWithoutCurrencySymbol);
    return {
      ...item,
      price: priceAsNumber,
    };
  });

  // Calculate the total price of all the items
  const total = Object.values(updatedCartContent)
    .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  // Filter to make sure we only display items with quantities that are > 0
  const cartItemsArray = Object.values(state.cartItems);
  const cartItemsWithQuantity = cartItemsArray.filter(
    (item) => item.quantity > 0
  );

  // Function to add to cart in the state and also POST in mongoDB
  const addToCart = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      item,
      price: item.price,
      payload: 1,
    });

    fetch("/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: item._id,
        name: item.name,
        price: item.price,
        imageSrc: item.imageSrc,
        quantity: 1,
      }),
    })
      .then((res) => {})
      .catch((error) => {
        console.error("Error adding item to cart in the database:", error);
      });
  };

  // Function to remove to cart in the state and also update it in mongoDB
  const removeFromCart = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      item,
      price: item.price,
      payload: 1,
    });
    fetch(`/cart/remove/${item._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {})
      .catch((error) => {
        console.error("Error adding item to cart in the database:", error);
      });
  };

  // Function to handle checkout,update the DB and clear the cart and navigate back to landing page with a success window.
  const handleCheckout = () => {
    const productsToUpdate = cartItemsArray.map((item) => ({
      id: item._id,
      numInStock: item.numInStock - item.quantity,
    }));

    fetch("/products/stock", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: productsToUpdate }),
    })
      .then((res) => {
        window.alert("Purchase Successful!");
      })
      .catch((error) => {
        console.error("Error updating cart in the database:", error);
      });

    dispatch({
      type: "HANDLE_CHECKOUT",
    });

    fetch("/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {})
      .catch((error) => {
        console.error("No cart found!");
      });
    navigate(`/`);
  };

  return (
    <div>
      <Header>Your Cart</Header>
      <BackButton onClick={() => navigate("/products")}>
        <BiggerIcon />
      </BackButton>
      {state.numOfItems === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <CartItemsMainWrapper>
          <ListOfProducts>
            {cartItemsWithQuantity.map((item) => (
              <CartItem key={item._id} item={item}>
                <ItemsNamePriceQauntDiv>
                  {item.name} - {item.price} qty:&nbsp;{" "}
                  <ItemQuanityBolded> {item.quantity}</ItemQuanityBolded>
                </ItemsNamePriceQauntDiv>
                <ItemImage src={item.imageSrc} alt={item.name} />
                <CartButtonWrapper>
                  <CartButton onClick={() => addToCart(item)}>+</CartButton>
                  <CartButton onClick={() => removeFromCart(item)}>
                    -
                  </CartButton>
                </CartButtonWrapper>
              </CartItem>
            ))}
          </ListOfProducts>
          <CheckoutDetailsDiv>
            <h4>Order Summary</h4>

            <PriceTotal>Price Total:&nbsp;${total}</PriceTotal>

            <ButtonWrapper>
              <Button onClick={handleCheckout}>Proceed To Checkout</Button>
            </ButtonWrapper>
            <CheckoutDetailsText>
              ⌽ Taxes and delivery fees are calculated on the next page.
            </CheckoutDetailsText>
            <CheckoutDetailsText>
              📦 You will not be charged until you review this order on the next
              page
            </CheckoutDetailsText>
            <h4>Safe Payment Options</h4>
            <img src={safepay} alt="minture credit cards" />
          </CheckoutDetailsDiv>
        </CartItemsMainWrapper>
      )}
    </div>
  );
};

const ListOfProducts = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 8px;
  margin: 16px;
  color: black;
  width: 50%;
`;

const CartItem = styled.li`
  border: 1px solid #ccc;
  padding: 18px;
`;

const CartButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
const ItemImage = styled.img`
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;
`;

const Header = styled.h2`
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  padding: 8px;
`;

const CheckoutDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 590px;
  color: black;
  border: solid 1px black;
  padding: 18px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background: #1db954;
  color: white;
  padding: 17px;
  width: 50%;
  border-radius: 8px;
  font-size: 15px;
  border-style: none;
  cursor: pointer;

  &:hover {
    background-color: #179346;
  }
`;

const CartButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const ItemsNamePriceQauntDiv = styled.div`
  display: flex;
  margin: 5px;
  padding: 12px;
`;

const ItemQuanityBolded = styled.span`
  font-weight: bold;
`;

const CartItemsMainWrapper = styled.div`
  display: flex;
`;

const PriceTotal = styled.p`
  border-bottom: solid lightgray 1px;
  margin-bottom: 26px;
`;

const CheckoutDetailsText = styled.p`
  color: lightgray;
`;

const BackButton = styled.button`
  height: 50px;
  width: 50px;
  border-style: none;
  background-color: white;
  position: absolute;
  left: 24px;
  margin: -32px;
  padding: 12px;
  cursor: pointer;
`;

const BiggerIcon = styled(HiChevronDoubleLeft)`
  font-size: 36px;
`;
export default Cart;
