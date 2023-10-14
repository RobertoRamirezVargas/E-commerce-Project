import styled from "styled-components";
import React from "react";
import Carousel from "./Carousel";
import robot from "../pictures/robot.png";
import ProductPreview from "./ProductPreview";
import LandingFooter from "./LandingFooter";
import { useNavigate } from "react-router-dom";

// the main landing page, that renders when the website is loaded
const Landing = () => {
  const navigate = useNavigate();

  // function to navigate to products
  const handleClick = () => {
    navigate(`/products`);
  };
  return (
    <>
      <div>
        <Carousel />
        <ProductPreview />
      </div>
      <Wrapper>
        <SaleBanner>20% OFF Summer Sale!</SaleBanner>
        <Button onClick={handleClick}>Shop Our Collection </Button>
        <img src={robot} alt="robotlady" />
      </Wrapper>
      <LandingFooter />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #333333;
`;

const Button = styled.button`
  position: relative;
  right: 340px;
  height: 80px;
  top: 400px;
  color: #00ffff;
  border: 6px solid #00ffff;
  border-radius: 15px;

  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 5px;
  cursor: pointer;
  font-weight: bold;
  filter: drop-shadow(0 0 15px #00ffff) drop-shadow(0 0 50px #00ffff)
    contrast(2) brightness(2);
  transition: 0.5s;

  &:hover {
    color: black;
    background-color: #00ffff;
    filter: drop-shadow(0 0 20px #00ffff) contrast(2) brightness(2);
  }
`;

const SaleBanner = styled.h1`
  position: relative;
  left: 120px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 80px;
  color: white;
`;
export default Landing;
