import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import product1 from "imgs/product1.png";
import product2 from "imgs/product2.png";
import product3 from "imgs/product3.png";
import giftBoxImg from "imgs/giftbox.png";
import checkImg from "imgs/check.png";
import cercleImg from "imgs/cercle.png";

import Button from "./Button";

const imgs = {
  product1,
  product2,
  product3,
};

const DonsStyled = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 10px;
  @media only screen and (max-width: 800px) {
    padding-left: 5px;
    padding-right: 5px;
  }
`;
export default ({
  selectedProduct,
  submitedUserCouronne,
  loading,
  products,
  onChooseProduct,
}) => {
  let totalDons = 10000;
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
    img {
      width: 95px;
      height: 95px;
    }
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
    padding-bottom: 10px;
    border-bottom: 1px solid lightgray;
    margin-bottom: 10px;
    .button {
      margin-top: 30px;
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
  const { t } = useTranslation();
  return (
    <DonStyled
      selected={selectedProduct && selectedProduct.name == product.name}
      submited={
        submitedUserCouronne && submitedUserCouronne.productName == product.name
      }
    >
      <div className="product">
        <img src={imgs[product.img]} />
        <div className="submited">
          <img src={checkImg} />
        </div>
      </div>
      <DonProgressBar dons={product.dons} totalDons={totalDons} />
      <div className="button">
        <Button
          onClick={() => product.dons !== 10000 && onChooseProduct(product)}
          selected={selectedProduct && selectedProduct.name == product.name}
          disabled={product.dons >= 10000}
        >
          {t("Je Fais un Don")} <img className="imgButton" src={checkImg} />
        </Button>
      </div>
    </DonStyled>
  );
};

const DonProgressBarStyled = styled.div`
  direction: ltr;
  flex: 1;
  background-color: #dde1e4;
  box-shadow: inset 2px 3px 4px gray;
  padding: 2px;
  border: 1px solid lightgray;
  min-height: 40px;
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
    flex-direction: row;
    width: 100%;
    margin-left: 0px;
  }
`;
const DonProgressBar = ({ dons, totalDons }) => {
  const { t, i18n } = useTranslation();
  let width = (dons / totalDons) * 100;
  return (
    <DonProgressBarStyled>
      <motion.div
        className="cercle"
        animate={{
          left: width == 100 ? `calc(${width}% - 40px)` : `${width}%`,
        }}
        transition={{ duration: 1 }}
      >
        <img src={cercleImg} alt="img" />
      </motion.div>
      <span className="total">
        {dons} / {totalDons}
      </span>
      <span className="info">
        1000 {t("Vote")} = {"  "}
        <img src={giftBoxImg} />
      </span>
    </DonProgressBarStyled>
  );
};
