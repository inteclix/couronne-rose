import React from "react";
import styled from "styled-components";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  getDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import Button from "./components/Button";

import giftBoxImg from "imgs/giftbox.png";
import checkImg from "imgs/check.png";
import tradImg from "imgs/trad.png";
import couronneRoseImg from "imgs/couronne_rose.png";

import Login from "Login";
import Dons from "components/Dons";
import Packs from "components/Packs";

import Merci from "./components/Merci";

//
const firebaseConfig = {
  apiKey: "AIzaSyCAJ0DP7Q2mMWPr3my-iDtc5swIBobn1W8",
  authDomain: "condor-coronne-rose.firebaseapp.com",
  projectId: "condor-coronne-rose",
  storageBucket: "condor-coronne-rose.appspot.com",
  messagingSenderId: "330472201590",
  appId: "1:330472201590:web:07b759024a5bbd7f92ee57",
  measurementId: "G-2H5WQT0HF2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const RootStyled = styled.div`
  padding: 40px;
  position: relative;
  .header {
    flex-direction: row;
    .img-title {
      align-self: center;
      width: 200px;
      padding: 10px;
      img {
      }
    }
    .right {
      justify-content: space-around;
      padding: 10px;
      padding-left: 20px;
      border-left: 1px solid lightgray;
      flex: 1;
      border-radius: 3px;
      flex-direction: column;
      .select {
        margin: 3px;
        width: 100%;
        label {
          font-size: 18px;
          font-weight: 700;
          align-self: right;
          padding: 3px;
        }
        select {
          padding: 3px;
          width: 200px;
        }
      }
      .user {
        div {
          margin: 2px;
          font-weight: 700;
        }
        flex-direction: row;
        align-items: center;
        img {
          width: 42px;
          height: 42px;
        }
        .logout {
          font-size: 10px;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .text-title {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }

  @media only screen and (max-width: 800px) {
    padding: 10px;
  }
`;
export default () => {
  const [wilaya, setWilaya] = React.useState("0");
  const [user, setUser] = React.useState(null);
  const [submitedUserCouronne, setSubmitedUserCouronne] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [showMerci, setShowMerci] = React.useState(false);

  const [packs, setPacks] = React.useState([
    {
      name: "Pack01",
    },
    {
      name: "Pack02",
    },
    {
      name: "Pack03",
    },
  ]);
  const [selectedPack, setSelectedPack] = React.useState(null);

  const [loadingSubmitedUserCouronne, setLoadingSubmitedUserCouronne] =
    React.useState(true);
  const [loadingProducts, setLoadingProducts] = React.useState(true);

  const signout = () => {
    const auth = getAuth();
    auth.signOut();
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const querySnapshot = await getDocs(collection(db, "products"));
    let productsWithDons = [];
    querySnapshot.forEach(async (doc) => {
      const product = doc.data();
      const q = query(
        collection(db, "couronnes"),
        where("productName", "==", product.name)
      );
      const docs = await getDocs(q);
      product.dons = docs.docs.length;
      productsWithDons = [...productsWithDons, { ...product }];
      setProducts(productsWithDons);
    });
    setLoadingProducts(false);
  };

  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const fetchUserCouronne = async () => {
    setLoadingSubmitedUserCouronne(true);
    const submitedCouronneRef = await getDoc(doc(db, "couronnes", user.email));
    if (submitedCouronneRef.exists()) {
      setSubmitedUserCouronne(submitedCouronneRef.data());
      setWilaya(submitedCouronneRef.data().wilaya);
    }
    setLoadingSubmitedUserCouronne(false);
  };
  React.useEffect(() => {
    if (user != null) {
      const unsubscribe = onSnapshot(
        query(collection(db, "couronnes")),
        (querySnapshot) => {
          fetchProducts();
          fetchUserCouronne();
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  const submit = () => {
    if (selectedProduct == null) {
      return alert("Don un produit !");
    }
    if (selectedPack == null) {
      return alert("selectionner un pack !");
    }
    if (wilaya == 0) {
      return alert("selectioner votre wilaya !");
    }
    const now = new Date();
    const formatedNowDate = `${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
    let couronneDoc = {
      date: formatedNowDate,
      email: user.email,
      username: user.displayName,
      productName: selectedProduct.name,
      packName: selectedPack.name,
      wilaya,
    };
    setDoc(doc(db, "couronnes", user.email), couronneDoc, { merge: true })
      .then(() => {
        //getUserDon();
        setShowMerci(true);
      })
      .catch(() => {
        alert("error");
      });
  };

  if (user == null) {
    return <Login setUser={setUser} />;
  }

  if (loadingSubmitedUserCouronne) {
    return (
      <div style={{ alignItems: "center", justifyContent: "center" }}>
        <img width="200px" src={couronneRoseImg} />
      </div>
    );
  }

  return (
    <RootStyled>
      <Merci showMerci={showMerci} setShowMerci={setShowMerci} />
      <div className="header">
        <div className="img-title">
          <img src={couronneRoseImg} alt="img" />
        </div>
        <div className="right">
          <div className="user">
            <div>
              <img src={user?.photoURL} />
            </div>
            <div>
              <div>{user?.displayName}</div>
              <div className="logout" onClick={signout}>
                Déconnecté
              </div>
            </div>
          </div>
          <div className="select">
            <select value={wilaya} onChange={(e) => setWilaya(e.target.value)}>
              <option key={0} value={"0"}>
                Selectionné votre wilaya
              </option>
              {wilayas.map((w) => (
                <option value={w.code}>{w.name}</option>
              ))}
            </select>
          </div>
          <div className="text-title">
            Choisissez le Produit qui vous souhaiter en faire don:
          </div>
        </div>
        <div>
          <img height={24} src={tradImg} />
        </div>
      </div>

      <Dons
        selectedProduct={selectedProduct}
        submitedUserCouronne={submitedUserCouronne}
        loading={loadingProducts}
        onChooseProduct={(product) => setSelectedProduct(product)}
        products={products} // list available products with dons
      />
      <Packs
        selectedPack={selectedPack}
        submitedUserCouronne={submitedUserCouronne}
        loading={loadingSubmitedUserCouronne}
        packs={packs} // list available products with dons
        onChoosePack={(pack) => {
          setSelectedPack(pack);
        }}
      />
      {/* <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div> */}
      <Button style={{ width: 100, alignSelf: "end" }} onClick={() => submit()}>
        valider
      </Button>
      {/* <pre>{JSON.stringify(submitedUserCouronne, null, 2)}</pre> */}
    </RootStyled>
  );
};

const wilayas = [
  { name: "Adrar", code: 1 },
  { name: "Chlef", code: 2 },
  { name: "Laghouat", code: 3 },
  { name: "Oum El Bouaghi", code: 4 },
  { name: "Batna", code: 5 },
  { name: "Béjaïa", code: 6 },
  { name: "Biskra", code: 7 },
  { name: "Béchar", code: 8 },
  { name: "Blida", code: 9 },
  { name: "Bouira", code: 10 },
  { name: "Tamanrasset", code: 11 },
  { name: "Tébessa", code: 12 },
  { name: "Tlemcen", code: 13 },
  { name: "Tiaret", code: 14 },
  { name: "Tizi Ouzou", code: 15 },
  { name: "Alger", code: 16 },
  { name: "Djelfa", code: 17 },
  { name: "Jijel", code: 18 },
  { name: "Sétif", code: 19 },
  { name: "Saïda", code: 20 },
  { name: "Skikda", code: 21 },
  { name: "Sidi Bel Abbès", code: 22 },
  { name: "Annaba", code: 23 },
  { name: "Guelma", code: 24 },
  { name: "Constantine", code: 25 },
  { name: "Médéa", code: 26 },
  { name: "Mostaganem", code: 27 },
  { name: "M'Sila", code: 28 },
  { name: "Mascara", code: 29 },
  { name: "Ouargla", code: 30 },
  { name: "Oran", code: 31 },
  { name: "El Bayadh", code: 32 },
  { name: "Illizi", code: 33 },
  { name: "Bordj Bou Arreridj", code: 34 },
  { name: "Boumerdès", code: 35 },
  { name: "El Tarf", code: 36 },
  { name: "Tindouf", code: 37 },
  { name: "Tissemsilt", code: 38 },
  { name: "El Oued", code: 39 },
  { name: "Khenchela", code: 40 },
  { name: "Souk Ahras", code: 41 },
  { name: "Tipaza", code: 42 },
  { name: "Mila", code: 43 },
  { name: "Aïn Defla", code: 44 },
  { name: "Naâma", code: 45 },
  { name: "Aïn Témouchent", code: 46 },
  { name: "Ghardaïa", code: 47 },
  { name: "Relizane", code: 48 },
  { name: "Timimoun", code: 49 },
  { name: "Bordj Badji Mokhtar", code: 50 },
  { name: "Ouled Djellal", code: 51 },
  { name: "Béni Abbès", code: 52 },
  { name: "In Salah", code: 53 },
  { name: "In Guezzam", code: 54 },
  { name: "Touggourt", code: 55 },
  { name: "Djanet", code: 56 },
  { name: "El M'Ghair", code: 57 },
  { name: "El Meniaa", code: 58 },
];
