import styled from "styled-components";
import React from "react";
import InstagramSvg from "./InstagramSvg";
import IconTwitterCircle from "./TwitterSvg";

//footer that contains svg images for instagram and twitter for customers to follow the brands social media
const LandingFooter = () => {
  return (
    <>
      <Footer>
        <p>Follow Us</p>
        <InstagramSvg />
        <IconTwitterCircle />
      </Footer>
    </>
  );
};

const Footer = styled.div`
  position: static;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: black;
  color: white;
  text-align: center;
`;
export default LandingFooter;
