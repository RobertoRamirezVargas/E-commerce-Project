import React, { useState } from "react";
import logotwo from "../pictures/logotwo.png";
import logothree from "../pictures/logothree.png";
import logo from "../pictures/logo.png";
import styled from "styled-components";

//three images that rotates when clicked
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      id: 1,
      image: logo,
      content: "Retro Futurism",
      title: "Pushing The Boundaries Of Innovation",
    },
    {
      id: 2,
      image: logotwo,
      content: "Unquantifiable",
      title: "Where Fashion Meets Technology",
    },

    {
      id: 3,
      image: logothree,
      content: "Innovation",
      title: "Empowering You To Express Yourself",
    },
  ];

  const currentSlide = slides[currentIndex];

  // Function to go to the previous slide.
  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next slide.
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button onClick={goToPreviousSlide}> ＜ </Button>
      </ButtonWrapper>
      <img src={currentSlide.image} alt={currentSlide.title} />
      <Introtext>
        <CurrentSlideText>{currentSlide.title}</CurrentSlideText>
        <p>{currentSlide.content}</p>
      </Introtext>
      <ButtonWrapper>
        <Button onClick={goToNextSlide}> ＞ </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  background-color: black;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 70px;
  margin-right: 16px;
`;

const Introtext = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "arial", Courier, monospace;
`;

const Button = styled.button`
  border-radius: 70%;
  position: relative;
  top: 200px;
  height: 74px;
  width: 70px;
  color: black;
  opacity: 0.5;
`;

const CurrentSlideText = styled.p`
  font-size: 50px;
`;

export default Carousel;
