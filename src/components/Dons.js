import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import product01 from "imgs/product01.png";
import product02 from "imgs/product02.png";
import product03 from "imgs/product03.png";
import giftBoxImg from "imgs/giftbox.png";
import checkImg from "imgs/check.png";
import cercleImg from "imgs/cercle.png";

const imgs = {
  product01,
  product02,
  product03,
};

const DonsStyled = styled.div`
  padding: 5px;
`;
export default ({
  selectedProduct,
  submitedUserCouronne,
  loading,
  products,
  onChooseProduct,
}) => {
  let totalDons = 0;
  products.forEach((p) => {
    totalDons += p.dons;
  });
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
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
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
      <DonButton
        onClick={() => onChooseProduct(product)}
        selected={selectedProduct && selectedProduct.name == product.name}
      >
        Je Fais un Don <img className="imgButton" src={checkImg} />
      </DonButton>
    </DonStyled>
  );
};

const DonButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
  background: linear-gradient(
    90deg,
    rgba(1, 164, 221, 1) 22%,
    rgba(44, 51, 131, 1) 100%
  );
  margin-left: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  min-width: 100px;
  color: white;
  font-weight: 700;
  border-radius: 16px;
  height: 16px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  .imgButton {
    display: ${(props) => (props.selected ? "block" : "none")};
    position: absolute;
    left: -5px;
    bottom: -5px;
    width: 16px;
  }
  :hover {
    background: linear-gradient(
      90deg,
      rgba(1, 180, 230, 1) 22%,
      rgba(50, 70, 140, 1) 100%
    );
    cursor: pointer;
  }
`;

const DonProgressBarStyled = styled.div`
  flex: 1;
  background-color: #dde1e4;
  box-shadow: inset 2px 3px 4px gray;
  padding: 2px;
  border: 1px solid lightgray;
  height: 40px;
  border-radius: 40px;
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
