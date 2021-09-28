import React from "react";
import styled from "styled-components";
import bgImg from "imgs/bg.png";
import { useTranslation } from "react-i18next";

const MerciStyled = styled.div`
  display: ${(props) => (props.showMerci ? "block" : "none")};
  position: absolute;
  top: calc(50% - 160px);
  left: calc(50% - 200px);
  width: 400px;
  height: 280px;
  border: 2px dashed lightgray;
  z-index: 1000;
  padding: 5px;
  justify-content: center;
  align-items: center;
  background-color: #fefefe;
  padding-top: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  span {
    position: absolute;
    background-color: lightgray;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    right: 10px;
    top: 10px;
    color: black;
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
    font-weight: 700;
    :hover {
      color: red;
    }
  }
  @media only screen and (max-width: 800px) {
    border: none;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
`;

export default ({ setShowMerci, showMerci }) => {
  const { t } = useTranslation();
  return (
    <MerciStyled showMerci={showMerci}>
      <div>
        <span onClick={() => setShowMerci(false)}>X</span>
        {t("Merci pour votre participation")}
        <div
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img width={200} height={200} src={bgImg} />
        </div>
      </div>
    </MerciStyled>
  );
};
