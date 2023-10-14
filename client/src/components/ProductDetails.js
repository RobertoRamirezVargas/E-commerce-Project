import React from "react";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IconGlobe from "../GlobeSvg";
import { HiChevronDoubleLeft } from "react-icons/hi";
import LandingFooter from "./LandingFooter";
import { MyContext } from "./MyContext";

// page renders details on specific products, location, available stock ect

const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState(null);
  const { dispatch } = useContext(MyContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/product/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setSingleProduct(data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  const handleAddToCart = (item) => {
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
    navigate(`/cart`);
  };

  // Function to disable the "add to cart" button if the stock is at 0.
  const disableButton = () => {
    if (singleProduct.data.numInStock === 0) return true;
  };

  if (!singleProduct) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Wrapper>
        <BackButton onClick={() => navigate("/products")}>
          <BiggerIcon />
        </BackButton>

        <Image src={singleProduct.data.imageSrc} />
        <ContentsWrapper>
          <ProductName>{singleProduct.data.name}</ProductName>
          <StarReview>★★★★☆ Average Reviews</StarReview>
          <BodyLocation>
            Location: {singleProduct.data.body_location}
          </BodyLocation>

          <ProductPrice>{singleProduct.data.price} CAD</ProductPrice>
          <ButtonWrapper>
            <Button
              onClick={() => handleAddToCart(singleProduct.data)}
              disabled={disableButton()}
            >
              Add To Cart
            </Button>
          </ButtonWrapper>
          <p>
            {" "}
            🔥 Hurry! <NumBuyers>over 500 people</NumBuyers> have this in their
            carts
          </p>
          <AfterPay>
            Or buy now and pay later with{" "}
            <AfterPayButton>AfterPay™️</AfterPayButton>{" "}
          </AfterPay>
          <ShippingDetailsDiv>
            <h3>Shipping & Return</h3>
            <Couriers>
              {" "}
              <CouriersSpan>Courier Companies:</CouriersSpan> CANADAPOST |
              DHgate | UPS 📦
            </Couriers>
            <Delivery>Delivery: Aug 1-Sep 20</Delivery>
            <Delivery>Get a CA$5 credit for late delivery </Delivery>

            <Return>
              <IconGlobe /> QuantumWear is commited to environmental
              sustainability
            </Return>
          </ShippingDetailsDiv>
          <InStock>Left In Stock: {singleProduct.data.numInStock}</InStock>
        </ContentsWrapper>
      </Wrapper>
      <LandingFooter />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  color: black;
  margin-top: 30px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  margin-top: 150px;
`;
const BodyLocation = styled.p`
  font-size: 18px;
  color: black;
`;
const InStock = styled.p`
  font-weight: bold;
  color: red;
`;
const ProductName = styled.h3`
  color: black;
`;

const ProductPrice = styled.p`
  font-size: 22px;
  color: black;
`;
const Button = styled.button`
  background: #1db954;
  color: white;
  padding: 17px;
  border-radius: 8px;
  font-size: 15px;
  border-style: none;
  cursor: pointer;

  &:hover {
    background-color: #179346;
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: solid 1px;
  padding: 30px;
  height: 670px;
  margin-bottom: 70px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StarReview = styled.h3`
  color: black;
`;

const AfterPay = styled.p`
  color: grey;
  font-size: 9px;
`;

const AfterPayButton = styled.button`
  cursor: pointer;
  width: 72px;
  height: 25px;
  border-radius: 12px;
  border-style: none;
  background-color: #a0e7e5;
`;

const Couriers = styled.p`
  color: black;
  font-size: 15px;
`;
const Delivery = styled.p`
  color: grey;
  font-size: 15;
`;

const Return = styled.p`
  color: black;
  font-size: 12px;
`;
const CouriersSpan = styled.span`
  color: grey;
`;

const NumBuyers = styled.span`
  color: #00ff00;
`;

const ShippingDetailsDiv = styled.div``;

const BackButton = styled.button`
  height: 50px;
  width: 50px;
  border-style: none;
  background-color: white;
  position: absolute;
  left: 24px;
  cursor: pointer;
`;

const BiggerIcon = styled(HiChevronDoubleLeft)`
  font-size: 36px;
`;
export default ProductDetails;
