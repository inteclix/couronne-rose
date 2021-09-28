import React from "react";
import Button from "./Button";
import checkImg from "imgs/check.png";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import imgGift1 from "imgs/gift1.png";
import imgGift2 from "imgs/gift2.png";
import imgGift3 from "imgs/gift3.png";

const RootStyled = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    div{
      border-bottom: 1px solid lightgray;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
  }
`;
const imgs = { imgGift1, imgGift2, imgGift3 };
export default ({
  selectedPack,
  submitedUserCouronne,
  onChoosePack,
  loading,
  packs,
}) => {
  if (loading) {
    // return <div>...loading</div>;
  }
  return (
    <RootStyled>
      {packs.map((p, index) => (
        <Pack
          key={index}
          onChoosePack={onChoosePack}
          pack={p}
          selectedPack={selectedPack}
          submitedUserCouronne={submitedUserCouronne}
        />
      ))}
    </RootStyled>
  );
};

const Pack = ({ selectedPack, submitedUserCouronne, pack, onChoosePack }) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        padding: 5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        border:
          submitedUserCouronne?.packName == pack.name
            ? "1px dashed #f5818e"
            : "none",
      }}
    >
      <div>
        <img width={100} height={100} src={imgs["imgGift" + pack.name]} />
      </div>
      <Button
        onClick={() => onChoosePack(pack)}
        selected={selectedPack?.name == pack.name}
      >
        {t("cadeau") + " "} {pack.name}
        <img className="imgButton" src={checkImg} />
      </Button>
    </div>
  );
};
