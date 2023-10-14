import styled from "styled-components";
import React from "react";
import fashion from "../pictures/fashion.png";
import accessories from "../pictures/accessories.png";
import hobbies from "../pictures/hobbies.png";
import ProductsBanner from "./ProductsBanner";
import { Link } from "react-router-dom";

//images in the second div of the landing page that links to products when clicked
const ProductPreview = () => {
  return (
    <>
      <Imagewrapper>
        <StyledLink to="/products">
          <Image src={fashion} alt="futuristicman" />
          <Image src={accessories} alt="futuristicwoman" />
          <Image src={hobbies} alt="futuristic camera" />
        </StyledLink>
      </Imagewrapper>
      <ProductsBanner />
    </>
  );
};

const Imagewrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin: 0;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  margin: 0px 10px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export default ProductPreview;
