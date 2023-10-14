import React, { useContext } from "react"; //import React, { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import { theme } from "../GlobalStyles";
import { MyContext } from "./MyContext";
import { FaShoppingCart } from "react-icons/fa";
import IconGlobe from "../GlobeSvg";
import { Link } from "react-router-dom";

// This function renders the navbar component which contains buttons to navigate to products and cart.
const NavBar = () => {
  const { state } = useContext(MyContext);

  return (
    <Wrapper>
      <Aspans>
        <StyledLink to="/">
          <IconGlobe /> <LogoSpan>QW</LogoSpan>
        </StyledLink>
      </Aspans>
      <StyledLink to="/products">
        <Shopspan>Discover Our Latest Arrivals</Shopspan>
      </StyledLink>
      <Aspan>
        <StyledLink to="/cart">
          <FaShoppingCart /> {state.numOfItems}
        </StyledLink>
      </Aspan>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;

  background-color: ${theme.colors.secondary};
`;

const Aspan = styled.span`
  font-size: 22px;
  margin: 0px 20px;
`;

const Shopspan = styled.div`
  font-size: 22px;
`;
const Aspans = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const LogoSpan = styled.span`
  font-size: 28px;
  font-family: Arial, Helvetica, sans-serif;
`;
export default NavBar;
