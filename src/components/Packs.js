import React from "react";
import Button from "./Button";
import checkImg from "imgs/check.png";

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
    <div
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {packs.map((p, index) => (
        <Pack
          key={index}
          onChoosePack={onChoosePack}
          pack={p}
          selectedPack={selectedPack}
          submitedUserCouronne={submitedUserCouronne}
        />
      ))}
    </div>
  );
};

const Pack = ({ selectedPack, submitedUserCouronne, pack, onChoosePack }) => {
  return (
    <div
      style={{
        padding: 10,
        borderRadius: 5,
        border:
          submitedUserCouronne?.packName == pack.name
            ? "1px dashed green"
            : "1px dashed lightgray",
      }}
    >
      <Button
        onClick={() => onChoosePack(pack)}
        selected={selectedPack?.name == pack.name}
      >
        {pack.name}
        <img className="imgButton" src={checkImg} />
      </Button>
    </div>
  );
};
