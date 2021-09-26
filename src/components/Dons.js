import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import product01 from "imgs/product01.png";
import product02 from "imgs/product02.png";
import product03 from "imgs/product03.png";
import giftBoxImg from "imgs/giftbox.png";
import checkImg from "imgs/check.png";
import cercleImg from "imgs/cercle.png";

import Button from "./Button"

const imgs = {
  product01,
  product02,
  product03,
};

const DonsStyled = styled.div`
  padding: 50px;
`;
export default ({
  selectedProduct,
  submitedUserCouronne,
  loading,
  products,
  onChooseProduct,
}) => {
  let totalDons = 10000
  if (loading) {
    // return <div>...loading</div>;
  }
  return (
    <DonsStyled>
      {products.map((p, index) => (
        <Don
          key={index}
          onChooseProduct={onChooseProduct}
          product={p}
          totalDons={totalDons}
          selectedProduct={selectedProduct}
          submitedUserCouronne={submitedUserCouronne}
        />
      ))}
    </DonsStyled>
  );
};

const DonStyled = styled.div`
  flex-direction: row;
  width: 100%;
  align-self: center;
  align-items: center;
  .product {
    position: relative;
    width: 100px;
    height: 100px;
    .submited {
      display: ${(props) => (props.submited ? "block" : "none")};
      position: absolute;
      right: 10px;
      bottom: 0px;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    background-color: red;
    height: 320px;
  }
`;

const Don = ({
  selectedProduct,
  submitedUserCouronne,
  product,
  totalDons,
  onChooseProduct,
}) => {
  return (
    <DonStyled
      selected={selectedProduct && selectedProduct.name == product.name}
      submited={
        submitedUserCouronne && submitedUserCouronne.productName == product.name
      }
    >
      <div className="product">
        <img src={imgs[product.name]} />
        <div className="submited">
          <img src={checkImg} />
        </div>
      </div>
      <DonProgressBar dons={product.dons} totalDons={totalDons} />
      <Button
        onClick={() => product.dons !== 10000 && onChooseProduct(product)}
        selected={selectedProduct && selectedProduct.name == product.name}
        disabled={product.dons == 10000}
      >
        Je Fais un Don <img className="imgButton" src={checkImg} />
      </Button>
    </DonStyled>
  );
};


const DonProgressBarStyled = styled.div`
  flex: 1;
  background-color: #dde1e4;
  box-shadow: inset 2px 3px 4px gray;
  padding: 2px;
  border: 1px solid lightgray;
  height: 40px;
  border-radius: 40px;
  margin-left: 30px;
  position: relative;
  .cercle {
    position: absolute;
    top: 3px;
    img {
      height: 40px;
      width: 40px;
    }
  }
  .total {
    position: absolute;
    left: 20px;
    bottom: -20px;
    font-size: 12px;
    font-weight: 700;
  }
  .info {
    position: absolute;
    right: 20px;
    bottom: -25px;
    font-size: 14px;
    font-weight: 700;
    img {
      width: 14px;
    }
  }
  @media only screen and (max-width: 800px) {
    flex: 0;
    flex-direction: row;
    height: 40px;
    width: 100%;
    background-color: green;
  }
`;
const DonProgressBar = ({ dons, totalDons }) => {
  let width = (dons / totalDons) * 100;
  return (
    <DonProgressBarStyled>
      <motion.div
        className="cercle"
        animate={{ left: width == 100 ? `calc(${width}% - 40px)` : `${width}%` }}
        transition={{ duration: 1 }}

      >
        <img src={cercleImg} alt="img" />
      </motion.div>
      <span className="total">
        {dons} / {totalDons}
      </span>
      <span className="info">
        10 Vote = {"  "}
        <img src={giftBoxImg} />
      </span>
    </DonProgressBarStyled>
  );
};
