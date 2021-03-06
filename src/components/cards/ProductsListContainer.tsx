import { useEffect, useState } from "react";
import styled from "styled-components";
import AppliedFilters from "../AppliedFilters";
import ProductsVerticalResults from "../VerticalRender/ProductsVerticalResults";
import { ProductCard } from "./ProductCard";
import { useProductsContext } from "../../context/ProductsContext";
import Loading from "../Loading";
import {
  Matcher,
  SelectableFilter,
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";

const ProductsListContainer = (props: any) => {
  const { isGrid, sortType, price, minPrice } = useProductsContext();
  const answersActions = useAnswersActions();
  const { setPrice } = useProductsContext();
  useEffect(() => {
    if (sortType) {
      sortType && answersActions.setSortBys([sortType]);
      sortType && answersActions.executeVerticalQuery();
      answersActions.executeVerticalQuery();
    }
  }, [sortType]);

  useEffect(() => {
    if (price >= 1) {
      const selectedFilters: SelectableFilter[] = [];
      const priceFilter = getMaxPrice();
      priceFilter && selectedFilters.push(priceFilter);
      answersActions.setStaticFilters(selectedFilters);
      answersActions.executeVerticalQuery();
    }
  }, [price]);

  const getMaxPrice = (): SelectableFilter | undefined => {
    if (price) {
      return {
        selected: true,
        fieldId: "price.value",
        value: parseInt(price),
        matcher: Matcher.GreaterThanOrEqualTo,
      };
    }
  };
  const isLoading = useAnswersState((state) => state.searchStatus.isLoading);

  const state = useAnswersState((state) => state);
  const filterState: any = state.vertical.results ? state.filters : {};
  useEffect(() => {
    if (Object.keys(filterState).length >= 1) {
      if (filterState.static && !filterState.static[0].selected)
        setPrice(minPrice);
    }
  }, [filterState]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {parseInt(price) !== parseInt(minPrice) && (
        <AppliedFilters hiddenFields={["price"]} />
      )}
      {isGrid ? (
        <WrapperGrid>
          <div className="products-container">
            <ProductsVerticalResults
              CardComponent={ProductCard}
              displayAllResults={false}
            />
          </div>
        </WrapperGrid>
      ) : (
        <WrapperList>
          <ProductsVerticalResults
            CardComponent={ProductCard}
            displayAllResults={false}
          />
        </WrapperList>
      )}
    </>
  );
};

export default ProductsListContainer;
const WrapperGrid = styled.section`
  img {
    height: 175px;
  }
  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }
  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const WrapperList = styled.section`
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;
