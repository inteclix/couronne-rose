import React from "react";
import couronneRoseImg from "./couronne_rose.png";
import productImg from "./product.png";
import product01 from "./product01.png";
import product02 from "./product02.png";
import product03 from "./product03.png";
import cercleImg from "./cercle.png";
import styled from "@emotion/styled";
import { useLocalObservable, Observer } from "mobx-react-lite";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, setDoc, getDoc, doc, query, where } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import giftBoxImg from "imgs/giftbox.png"
import checkImg from "imgs/check.png"

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

const imgs = {
  product01,
  product02,
  product03
};

const RootStyled = styled.div`
  background: rgb(208, 207, 212);
  background: linear-gradient(
    0deg,
    rgba(208, 207, 212, 1) 15%,
    rgba(246, 247, 252, 1) 67%
  );
  height: 100vh;
  user-select: none;
  overflow-y: scroll;
  .title {
    padding: 10;
    align-items: center;
    justify-content: center;
    .img-title {
      width: 50%;
    }
  }
  .valider{
    flex-direction: row-reverse;
    width: 80%;
  }
  select{
    border-radius: 3px;
    padding: 3px;
    border: 1px solid lightgray;
  }
  @media only screen and (max-width: 800px) {
    .title {
      margin-top: 10px;
    .img-title {
      width: 90%;
    }
    }
    .valider{
      flex-direction: column;
      width: 80%;
      align-self: center;
    }
  }
`;

export default ({ user }) => {
  const [firebaseProducts, setfirebaseProducts] = React.useState([]);
  const [wilaya, setWilaya] = React.useState([]);
  const [coronne, setCouronne] = React.useState(null);
  const [totalDons, setTotalDons] = React.useState(0)


  const signout = () => {
    const auth = getAuth();
    auth.signOut();
  }
  async function getProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    let productsDocs = [];
    querySnapshot.forEach((doc) => {
      productsDocs.push(doc.data());
    });
    setfirebaseProducts(productsDocs);
  }

  async function getUserDon() {
    const couronneRef = doc(db, "couronnes", user.email);
    const oldCouronneRef = await getDoc(couronneRef);
    if (oldCouronneRef.exists()) {
      setCouronne(oldCouronneRef.data())
    }
  }

  React.useEffect(() => {
    getProducts();
    getUserDon();
  }, []);

  const submit = () => {
    if (wilaya == 0) {
      return alert("Selectionne une wilaya")
    }
  }

  if (firebaseProducts.length == 0) {
    return (
      <div
        style={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img width="60%" src={couronneRoseImg} alt="img" />
        <div style={{ fontSize: 24, fontWeight: 700 }}>Loading ...</div>
      </div>
    );
  }

  const doUserDon = async (product) => {
    let couronneDoc = {
      email: user.email,
      username: user.displayName,
      productName: product.name,
    }
    const couronneRef = doc(db, "couronnes", user.email);
    const oldCouronneRef = await getDoc(couronneRef);
    if (oldCouronneRef.exists()) {
      const oldProductName = oldCouronneRef.data().prodcutName
      // downvote  the product id


    }



    setDoc(couronneRef, couronneDoc, { merge: true })
      .then(() => {
        alert("success")
        getUserDon();
      })
      .catch(() => {
        alert("error")

      })

  }
  return (
    <Observer>
      {() => (
        <RootStyled>
          <div className="title">
            <img className="img-title" src={couronneRoseImg} alt="img" />
            <div style={{ borderRadius: 16, flexDirection: "row", alignItems: "center" }}>
              <div style={{ marginTop: 10, }}>
                <img width={48} height={48} src={user?.photoURL} />
              </div>
              <div >
                <div style={{ marginLeft: 10, fontWeight: 700 }}>{user?.displayName}</div>
                <div onClick={signout} style={{ marginLeft: "auto", fontWeight: 700, fontSize: 14, textDecoration: "underline", cursor: "pointer" }}>Déconnecté</div>
              </div>
            </div>
          </div>
          <div style={{ padding: 5 }}>
            <div>
              <select
                onClick={(e) => {
                  setWilaya(e.target.value)
                }}
                label="Wilaya"
                select={true}
                size="small"
                defaultValue={wilaya}
                style={{ margin: 10, padding: 5, width: 300, alignSelf: "center" }} >
                <option key={0} value={0}>
                  Selectionné votre wilaya
                </option>
                {
                  wilayas.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.code} -- {w.name}
                    </option>
                  ))
                }
              </select>
            </div>
            <div style={{ fontSize: 24, textAlign: "center", fontWeight: 700 }}>
              Choisissez le Produit qui vous souhaiter en faire don:
            </div>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {firebaseProducts.map((p, index) => (
                <Don
                  setTotalDons={setTotalDons}
                  totalDons={totalDons}
                  coronne={coronne} user={user} doUserDon={doUserDon} key={index} product={p} />
              ))}
            </div>
          </div>
          <div style={{ padding: 10 }}>
            <div style={{ fontSize: 24, textAlign: "center", fontWeight: 700 }}>
              Pour participer à la tombola, choisisser votre cadeau:
            </div>
            <div
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <PackButton>Pack 1</PackButton>
              <PackButton>Pack 2</PackButton>
              <PackButton>Pack 3</PackButton>
            </div>
            <div className="valider" onClick={submit}>
              <ValideButton>Valider</ValideButton>
            </div>
          </div>
          {/* <pre>{JSON.stringify(firebaseProducts, null, 2)}</pre> */}
        </RootStyled>
      )}
    </Observer>
  );
};

const DonButton = styled.div`
position: relative;

  display: flex;
  align-items: center;
  font-size: 18px;
  margin: 10px;
  background: linear-gradient(
    90deg,
    rgba(1, 164, 221, 1) 22%,
    rgba(44, 51, 131, 1) 100%
  );
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: white;
  font-weight: 700;
  border-radius: 24px;
  height: 24px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  .imgButton{
    display: ${props => props.isChecked ? 'block' : 'none'};
    position: absolute;
    left: -5px;
    bottom: -5px;
    width: 24px;
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

const ValideButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin: 10px;
  background: linear-gradient(
    90deg,
    rgba(2, 174, 224, 1) 22%,
    rgba(25, 186, 130, 1) 100%
  );
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: white;
  font-weight: 700;
  border-radius: 24px;
  height: 24px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  :hover {
    background: linear-gradient(
    90deg,
    rgba(5, 190, 240, 1) 22%,
    rgba(30, 200, 150, 1) 100%
  );
    cursor: pointer;
  }
`;
const PackButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin: 10px;
  background: linear-gradient(
    90deg,
    rgba(244, 36, 130, 1) 22%,
    rgba(48, 43, 137, 1) 100%
  );
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: white;
  font-weight: 700;
  border-radius: 24px;
  height: 24px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  :hover {
    background: linear-gradient(
      90deg,
      rgba(230, 30, 120, 1) 22%,
      rgba(60, 60, 160, 1) 100%
    );
    cursor: pointer;
  }
  @media only screen and (max-width: 800px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const DonStyle = styled.div`
  flex-direction: row;
  align-items: center;
  margin-top: 10;

  @media only screen and (max-width: 800px) {
    padding: 10px;
    flex-direction: column;
    border: 2px dashed lightgray;
    margin: 5px;
    border-radius: 10px;
  }
`;

const Don = ({ product, doUserDon, coronne }) => {
  const [dons, setDons] = React.useState(0)
  const [totalDons, setTotalDons] = React.useState(0)

  React.useEffect(() => {
    const fetch = async () => {
      const couronnesRef = collection(db, "couronnes");
      const q = query(couronnesRef, where("productName", "==", product.name));
      const size = await getDocs(q)
      setDons(size.docs.length)
    }
    fetch()
  }, [coronne])

  React.useEffect(() => {
    const fetch = async () => {
      const couronnesRef = collection(db, "couronnes");
      const q = query(couronnesRef);
      const size = await getDocs(q)
      setTotalDons(size.docs.length)
    }
    fetch()
  }, [coronne])
  return (
    <DonStyle>
      <div>
        <img
          style={{}}
          src={imgs[product.img]}
          alt="img"
        />
      </div>
      <div style={{ marginRight: 20 }}>
        <DonProgressBar dons={dons} totalDons={totalDons} />
      </div>
      <DonButton onClick={() => doUserDon(product)} isChecked={coronne?.productName === product.name}>Je Fais un Don <img className="imgButton" src={checkImg} /></DonButton>
    </DonStyle>
  );
};

const DonProgressBarStyled = styled.div`
  background-color: #dde1e4;
  width: 400px;
  box-shadow: inset 2px 3px 4px gray;
  padding: 2px;
  border: 1px solid lightgray;
  height: 64px;
  border-radius: 64px;
  position: relative;
  .cercle {
    position: absolute;
    top: 4px;
    img {
      height: 60px;
      width: 60px;
    }
  }
  .total{
      position: absolute;
      left: 20px;
      bottom: -30px;
      font-size: 16px;
      font-weight: 700;
    }
    .info{
      position: absolute;
      right: 20px;
      bottom: -30px;
      font-size: 16px;
      font-weight: 700;
      img{
        width: 16px;
      }
    }
  @media only screen and (max-width: 800px) {
    position: relative;
    background-color: #dde1e4;
    width: 300px;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
    border: 1px solid lightgray;
    height: 40px;
    border-radius: 40px;
    position: relative;

    .cercle {
      position: absolute;
      top: 0px;
      img {
        height: 40px;
        width: 40px;
      }
    }
  }
`;
const DonProgressBar = ({ dons, totalDons }) => {

  const width = (dons / totalDons) * 100
  return (
    <DonProgressBarStyled>
      <div className="cercle" style={{ left: width == 0 ? `calc(${width}%)` : `calc(${width}% - 62px)` }}>
        <img src={cercleImg} alt="img" />
      </div>
      <span className="total">{dons} / {totalDons}</span>
      <span className="info">
        10 Vote = {"  "}
        <img src={giftBoxImg} />
      </span>
    </DonProgressBarStyled>
  );
};


const wilayas = [{ "name": "Adrar", "code": 1 },
{ "name": "Chlef", "code": 2 },
{ "name": "Laghouat", "code": 3 },
{ "name": "Oum El Bouaghi", "code": 4 },
{ "name": "Batna", "code": 5 },
{ "name": "Béjaïa", "code": 6 },
{ "name": "Biskra", "code": 7 },
{ "name": "Béchar", "code": 8 },
{ "name": "Blida", "code": 9 },
{ "name": "Bouira", "code": 10 },
{ "name": "Tamanrasset", "code": 11 },
{ "name": "Tébessa", "code": 12 },
{ "name": "Tlemcen", "code": 13 },
{ "name": "Tiaret", "code": 14 },
{ "name": "Tizi Ouzou", "code": 15 },
{ "name": "Alger", "code": 16 },
{ "name": "Djelfa", "code": 17 },
{ "name": "Jijel", "code": 18 },
{ "name": "Sétif", "code": 19 },
{ "name": "Saïda", "code": 20 },
{ "name": "Skikda", "code": 21 },
{ "name": "Sidi Bel Abbès", "code": 22 },
{ "name": "Annaba", "code": 23 },
{ "name": "Guelma", "code": 24 },
{ "name": "Constantine", "code": 25 },
{ "name": "Médéa", "code": 26 },
{ "name": "Mostaganem", "code": 27 },
{ "name": "M'Sila", "code": 28 },
{ "name": "Mascara", "code": 29 },
{ "name": "Ouargla", "code": 30 },
{ "name": "Oran", "code": 31 },
{ "name": "El Bayadh", "code": 32 },
{ "name": "Illizi", "code": 33 },
{ "name": "Bordj Bou Arreridj", "code": 34 },
{ "name": "Boumerdès", "code": 35 },
{ "name": "El Tarf", "code": 36 },
{ "name": "Tindouf", "code": 37 },
{ "name": "Tissemsilt", "code": 38 },
{ "name": "El Oued", "code": 39 },
{ "name": "Khenchela", "code": 40 },
{ "name": "Souk Ahras", "code": 41 },
{ "name": "Tipaza", "code": 42 },
{ "name": "Mila", "code": 43 },
{ "name": "Aïn Defla", "code": 44 },
{ "name": "Naâma", "code": 45 },
{ "name": "Aïn Témouchent", "code": 46 },
{ "name": "Ghardaïa", "code": 47 },
{ "name": "Relizane", "code": 48 },
{ "name": "Timimoun", "code": 49 },
{ "name": "Bordj Badji Mokhtar", "code": 50 },
{ "name": "Ouled Djellal", "code": 51 },
{ "name": "Béni Abbès", "code": 52 },
{ "name": "In Salah", "code": 53 },
{ "name": "In Guezzam", "code": 54 },
{ "name": "Touggourt", "code": 55 },
{ "name": "Djanet", "code": 56 },
{ "name": "El M'Ghair", "code": 57 },
{ "name": "El Meniaa", "code": 58 }]