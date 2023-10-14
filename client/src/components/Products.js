import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../GlobalStyles";
import { ProductContainer } from "./ProductContainer";
import LandingFooter from "./LandingFooter";

// This is the products component. It displays available items. It also has a filter feature.
const Products = () => {
  const [showPriceMenu, setShowPriceMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortedItems, setSortedItems] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [items, setItems] = useState([]);

  // Sorting function to sort by price
  const sortByPrice = (items, sortOrder) => {
    return items.slice().sort((itemA, itemB) => {
      const apriceA = parseFloat(itemA.price.replace(/[$,]/g, ""));
      const apriceB = parseFloat(itemB.price.replace(/[$,]/g, ""));
      const priceA = Math.round(apriceA * 100);
      const priceB = Math.round(apriceB * 100);
      // Toggle sorting order on each call, ? ascending : descending
      return sortOrder === "ascending" ? priceA - priceB : priceB - priceA;
    });
  };

  // Toggle sorting order
  const handleSortByPrice = (order) => {
    // Check if the current sorting order is the same as the previous one
    if (sortOrder === order) {
      // If it's the same, set sortedItems to null to use items.map
      setSortedItems(null);
      setSortOrder(null);
    } else {
      // Otherwise, set the new sorting order and sort the items
      setSortOrder(order);
      setSortedItems(sortByPrice(items, order));
    }
  };

  useEffect(() => {
    // Reach out products/data from backend
    fetch("/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
        setLoading(false);
      });
  }, []);

  // Navigate to the product detail page
  const handleProductClick = (itemId) => {
    navigate(`/products/${itemId}`);
  };
  // Update category
  const handleCategoryChange = (category) => {
    //if it was already selected just go back to no-filter option, otherwise, filter using to show just that category
    setSelectedCategory(selectedCategory === category ? null : category);
  };
  return (
    <>
      <Container>
        <Filter>
          <p>Searching bar</p>
          <ul>
            <li>
              <button onClick={() => setShowPriceMenu(!showPriceMenu)}>
                Sort by Price
              </button>
            </li>
            {showPriceMenu && (
              <SubUl>
                <li>
                  <ButtonMenu
                    selectedID={sortOrder === "ascending"}
                    onClick={() => handleSortByPrice("ascending")}
                  >
                    {" "}
                    - Ascending
                  </ButtonMenu>
                </li>
                <li>
                  <ButtonMenu
                    selectedID={sortOrder === "descending"}
                    onClick={() => handleSortByPrice("descending")}
                  >
                    {" "}
                    - Descending
                  </ButtonMenu>
                </li>
              </SubUl>
            )}
            <li>
              <button onClick={() => setShowCategoryMenu(!showCategoryMenu)}>
                Filter by Category
              </button>
            </li>
            {showCategoryMenu && (
              <SubUl>
                <li>
                  <ButtonMenu
                    selectedID={selectedCategory === "Fitness"}
                    onClick={() => handleCategoryChange("Fitness")}
                  >
                    {" "}
                    - Fitness
                  </ButtonMenu>
                </li>
                <li>
                  <ButtonMenu
                    selectedID={selectedCategory === "Medical"}
                    onClick={() => handleCategoryChange("Medical")}
                  >
                    {" "}
                    - Medical
                  </ButtonMenu>
                </li>
                <li>
                  <ButtonMenu
                    selectedID={selectedCategory === "Lifestyle"}
                    onClick={() => handleCategoryChange("Lifestyle")}
                  >
                    {" "}
                    - Lifestyle
                  </ButtonMenu>
                </li>
                <li>
                  <ButtonMenu
                    selectedID={selectedCategory === "Entertainment"}
                    onClick={() => handleCategoryChange("Entertainment")}
                  >
                    {" "}
                    - Entertainment
                  </ButtonMenu>
                </li>
              </SubUl>
            )}
          </ul>
        </Filter>
        {loading ? (
          <Loader>
            <div className="spinner"></div>
          </Loader>
        ) : (
          <ProductWrapper>
            {sortedItems //if we apply filter, use this sorted array
              ? sortedItems.map((anItem) => {
                  // if a selectedCategory has been assigned and
                  // if anItem category does not matches with the one assigned to selectedCtegory then don't print/send anything to ProductContainer
                  if (selectedCategory && anItem.category !== selectedCategory)
                    return null;

                  return (
                    <ProductContainer
                      handleProductClick={handleProductClick}
                      item={anItem}
                      key={anItem._id}
                    />
                  );
                })
              : items &&
                items.map((anItem) => {
                  //if we do not apply filter, use array as it comes from fetching
                  // if a selectedCategory has been assigned and
                  // if anItem category does not matches with the one assigned to selectedCtegory then don't print/send anything to ProductContainer
                  if (selectedCategory && anItem.category !== selectedCategory)
                    return null;

                  return (
                    <ProductContainer
                      handleProductClick={handleProductClick}
                      item={anItem}
                      key={anItem._id}
                    />
                  );
                })}
          </ProductWrapper>
        )}
      </Container>
      <LandingFooter />
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 15% 77%;
  gap: 10px;
  padding: 10px;
  background-color: #8d918e;

  @media (max-width: 789px) {
    grid-template-columns: 99%; /* On smaller screens, make it a single column layout */
  }
`;
const Filter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 15px;
  max-height: 50vh;
  border-radius: 12px;
  background-color: ${theme.colors.primary};
  font-size: 18px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 20px;
      button {
        background: none;
        border: none;
        text-decoration: none;
        cursor: pointer;

        &:hover {
          color: ${theme.colors.darkHighlight};
        }
      }
    }
  }

  @media (max-width: 789px) {
    width: 96%;
  }
`;
const SubUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin-bottom: 20px;
  }
`;
const ButtonMenu = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  ${({ selectedID }) =>
    selectedID
      ? `
    color: ${theme.colors.darkHighlight};
    font-weight: bold;
  `
      : ` color: ${theme.textColors.secondary};
  `}

  &:hover {
    color: ${theme.colors.darkHighlight};
  }
`;
const ProductWrapper = styled.div`
  background-color: #8d918e;
  width: 100%;
  border-radius: 30px;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-items: center;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0;

  @media (max-width: 789px) {
    justify-content: space-around;
  }
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;

  .spinner {
    border: 3px solid rgba(0, 0, 0, 0.3);
    border-top: 3px solid ${theme.colors.highlight};
    border-radius: 50%; // from square to circle
    width: 155px;
    height: 155px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Products;
