import React, { useState, useContext } from "react";
import styled from "styled-components";
import { theme } from "../GlobalStyles";
import { MyContext } from "./MyContext";

// Function to render the product container. This is used to display each and every item in a container.
export const ProductContainer = ({ item, handleProductClick }) => {
  const { state, dispatch } = useContext(MyContext);
  const quantityInCart = state.cartItems[item._id]
    ? state.cartItems[item._id].quantity
    : 0;
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);

  // function to add to cart. It updates the reducer and also mongoDB
  const handleAddToCart = () => {
    if (quantityInCart >= item.numInStock) {
      // If the product is out of stock, show the modal and hide it after 1.5 seconds
      setShowOutOfStockModal(true);
      setTimeout(() => setShowOutOfStockModal(false), 1200);
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      item: item,
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

  // function to removeFromCart. Reduces item by 1, updates reducer and mongoDB
  const handleRemoveFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      item: item,
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

  return (
    <Wrapper>
      {" "}
      <div onClick={() => handleProductClick(item._id)}>
        <p>{item.name}</p>
      </div>
      <Price onClick={() => handleProductClick(item._id)}>{item.price}</Price>
      <ImgContainer onClick={() => handleProductClick(item._id)}>
        <Itemimg src={item.imageSrc} alt="Image" />
      </ImgContainer>
      <div style={{}}>
        <Abutton onClick={handleRemoveFromCart}> -</Abutton>
        {quantityInCart > 0 ? (
          <span>Qty. {quantityInCart}</span>
        ) : (
          <span>Qty. 0</span>
        )}
        <Abutton onClick={handleAddToCart}>+</Abutton>
        {showOutOfStockModal && <OutOfStockModal>Out of Stock</OutOfStockModal>}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 210px;
  border: 1px solid ${theme.textColors.primary};
  border-radius: 8px;
  padding: 9px;
  padding-top: 10px;
  text-align: center;
  margin: 15px 8px;
  cursor: pointer;
  min-height: 350px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.04);
  }

  & > div:first-child {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    white-space: normal;
    max-height: 4em;
    overflow: hidden;
    p {
      margin: 0;
    }
  }

  @media (max-width: 989px) {
    width: 265px;
    margin: 15px 1px;
  }
  @media (max-width: 789px) {
    width: 280px;
    margin: 15px 1px;
  }
  @media (max-width: 630px) {
    width: 80%;
    margin-left: 3%;
  }
`;
const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const ImgContainer = styled.div`
  min-height: 185px;
  margin-bottom: 10px;
`;

const Itemimg = styled.img`
  border-radius: 10px;

  &:hover {
    background-color: ${theme.colors.darkHighlight};
    color: ${theme.textColors.secondary};
  }
`;

const Abutton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  margin: 0px 8px;
  text-decoration: none;
  text-transform: uppercase;
  background-color: ${theme.colors.highlight};
  color: ${theme.textColors.primary};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.darkHighlight};
    color: ${theme.textColors.secondary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(29, 185, 84, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const OutOfStockModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 15px;
  background-color: #fff;
  color: red;
  border: 1px solid red;
  border-radius: 5px;
  z-index: 999;
`;

export default ProductContainer;
