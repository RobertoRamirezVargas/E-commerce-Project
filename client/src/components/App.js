import { GlobalStyle, theme } from "../GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";
import Products from "./Products";
import Landing from "./Landing";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";

// This function renders the App
const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Structurediv>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Structurediv>
    </Router>
  );
};

const Structurediv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  font-family: ${theme.primaryFontFamily};
  color: ${theme.textColors.primary};
  width: 100vw;
  height: 100vh;
  margin-top: 32px;
`;

export default App;
