import styled from "styled-components";
import React from "react";

//labels that overlay on to the products preview component, which indicate what type of products are sold/available
const ProductsBanner = () => {
  return (
    <>
      <SiteDetailsWrapper>
        <Sitedetails>Fashion</Sitedetails>
        <Sitedetails>Accessories</Sitedetails>
        <Sitedetails>Hobbies</Sitedetails>
      </SiteDetailsWrapper>
    </>
  );
};

const Sitedetails = styled.h3`
  position: relative;
  bottom: 117px;
  margin: 0;
  padding: 15px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  justify-content: space-between;
  font-size: 30px;
  background-color: grey;
  opacity: 0.8;

  &:hover {
    background-color: #e8e4e3;
  }
`;

const SiteDetailsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
`;

export default ProductsBanner;
