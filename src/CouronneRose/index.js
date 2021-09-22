import React from "react";
import couronneRoseImg from "./couronne_rose.png";
import productImg from "./product.png";
import product01Img from "./product01.png";
import product02Img from "./product02.png";
import product03Img from "./product03.png";
import cercleImg from "./cercle.png";
import styled from '@emotion/styled'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDy6l1P5H1jB5narxoHXXIsxwpRuvmbtXk",
  authDomain: "couronne-rose.firebaseapp.com",
  projectId: "couronne-rose",
  storageBucket: "couronne-rose.appspot.com",
  messagingSenderId: "207432424251",
  appId: "1:207432424251:web:ea8996616dfd8d84e0351e",
  measurementId: "G-W4GJ3P1VVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const RootStyled = styled.div`
background: rgb(208,207,212);
background: linear-gradient(0deg, rgba(208,207,212,1) 15%, rgba(246,247,252,1) 67%);
  height: 100vh;
  user-select: none;
`


export default () => {
  const [firebaseProducts, setfirebaseProducts] = React.useState([])
  async function getProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    let productsDocs = []
    querySnapshot.forEach((doc) => {
      productsDocs.push(doc.data());
    });
    setfirebaseProducts(productsDocs)
  }
  
  React.useEffect(getProducts, [])
  const products = [
    {
      name: "product name",
      img: product01Img,
      dons: 60
    },
    {
      name: "product name",
      img: product02Img,
      dons: 57
    },
    {
      name: "product name",
      img: product03Img,
      dons: 20
    }
  ];
  let totalDons = 0
  products.forEach(p => totalDons += p.dons)
  if (products.length == 0) {
    return <div>
      Loading ...
    </div>
  }
  return (
    <RootStyled>
      <div style={{
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
      }} >
        <img width={"60%"} src={couronneRoseImg} />
      </div>
      <div style={{ padding: 5 }}>
        <div style={{ fontSize: 24, textAlign: "center", fontWeight: 700 }}>
          Choisissez le Produit qui vous souhaiter en faire don:
        </div>
        <div style={{
          justifyContent: "center",
          alignItems: "center"
        }} >
          {products.map((p, index) => (
            <Don totalDons={totalDons} product={p} />
          ))}
        </div>

      </div>
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, textAlign: "center", fontWeight: 700 }}>
          Pour participer à la tombola, choisisser votre cadeau:
        </div>
        <div style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 10
        }}   >
          <PackButton>Pack 1</PackButton>
          <PackButton>Pack 2</PackButton>
          <PackButton>Pack 3</PackButton>
        </div>
      </div>
      <pre>
        {JSON.stringify(firebaseProducts, null, 2)}
      </pre>
    </RootStyled>
  );
};

const DonButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin: 10px;
  background: linear-gradient(90deg, rgba(1,164,221,1) 22%, rgba(44,51,131,1) 100%);
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: white;
  font-weight: 700;
  border-radius: 24px;
  height: 24px;
  box-Shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  :hover{
    background: linear-gradient(90deg, rgba(1,180,230,1) 22%, rgba(50,70,140,1) 100%);
    cursor: pointer;
  }
`

const PackButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin: 10px;
  background: linear-gradient(90deg, rgba(244,36,130,1) 22%, rgba(48,43,137,1) 100%);
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: white;
  font-weight: 700;
  border-radius: 24px;
  height: 24px;
  box-Shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  :hover{
    background: linear-gradient(90deg, rgba(230,30,120,1) 22%, rgba(60,60,160,1) 100%);
    cursor: pointer;
  }
`

const Don = ({ product, totalDons }) => {
  return (
    <div style={{
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    }} >
      <div>
        <img style={{ width: 120, marginRight: 20 }} src={product.img} />
      </div>
      <div style={{ marginRight: 20 }}>
        <DonProgressBar dons={product.dons} totalDons={totalDons} />
      </div>
      <DonButton>Je Fais un Don</DonButton>
    </div>
  );
};

const DonProgressBarStyled = styled.div`
  background-color: #dde1e4;
  width: 400px;
  box-Shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid lightgray;
  height: 64px;
  border-radius: 64px;
  position: relative;
  .cercle{
    position: absolute;
    top: 2px;
    img{
      height: 60px;
      width: 60px;
    }
  }
`
const DonProgressBar = ({ dons, totalDons }) => {
  return (
    <DonProgressBarStyled>
      <div className="cercle" style={{ left: `${dons / totalDons * 100}%` }}>
        <img src={cercleImg} />
      </div>
    </DonProgressBarStyled>
  )
}
