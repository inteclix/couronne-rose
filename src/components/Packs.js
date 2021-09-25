import React from "react";

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
    <div style={{ flexDirection: "row" }}>
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
    <div style={{ padding: 5, border: "1px dashed black" }}>
      <div>{selectedPack && selectedPack.name == pack.name && "Selected"}</div>
      <div>{pack.name}</div>
      <div>
        {submitedUserCouronne &&
          submitedUserCouronne.packName == pack.name &&
          "Submited"}
      </div>
      <button onClick={() => onChoosePack(pack)}>choose pack</button>
    </div>
  );
};
