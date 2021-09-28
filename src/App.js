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

import { useTranslation } from "react-i18next";

import Button from "./components/Button";

import giftBoxImg from "imgs/giftbox.png";
import checkImg from "imgs/check.png";
import tradImg from "imgs/trad.png";

import logoArImg from "imgs/logo_ar.png";
import logoFrImg from "imgs/logo_fr.png";
import bgImg from "imgs/bg.png";
import excelImg from "imgs/excel.png";

import Login from "Login";
import Dons from "components/Dons";
import Packs from "components/Packs";

import Merci from "./components/Merci";

//
const firebaseConfig = {
  apiKey: "AIzaSyCAJ0DP7Q2mMWPr3my-iDtc5swIBobn1W8",
  authDomain: "condor-coronne-rose.web.app",
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
  direction: ${(props) => (props.lang == "ar" ? "rtl" : "ltr")};
  overflow-x: hidden;
  .lang {
    position: absolute;
    left: ${(props) => (props.lang == "ar" ? "10px" : "")};
    right: ${(props) => (props.lang != "ar" ? "10px" : "")};
    top: 10px;
    cursor: pointer;
    :hover {
      filter: brightness(1.1);
    }
  }
  .excel {
    position: absolute;
    right: ${(props) => (props.lang == "ar" ? "10px" : "")};
    left: ${(props) => (props.lang != "ar" ? "10px" : "")};
    top: 10px;
    cursor: pointer;
    :hover {
      filter: brightness(1.1);
    }
  }
  .bg {
    position: absolute;
    right: ${(props) => (props.lang != "ar" ? "-100px" : "")};
    left: ${(props) => (props.lang == "ar" ? "-100px" : "")};
    top: calc(50% - 200px);
    height: 200px;
    width: 260px;
    z-index: -2;
    opacity: 0.5;
  }
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
      padding-left: ${(props) => (props.lang == "ar" ? "0px" : "30px")};
      padding-right: ${(props) => (props.lang != "ar" ? "0px" : "30px")};
      border-left: ${(props) =>
        props.lang == "ar" ? "none" : "1px solid lightgray"};
      border-right: ${(props) =>
        props.lang != "ar" ? "none" : "1px solid lightgray"};
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
  .valide {
    align-self: end;
    .div {
      border: 1px solid blue;
    }
  }
  @media only screen and (max-width: 800px) {
    .header {
      flex-direction: column;
      .right {
        .select {
          margin-top: 10px;
        }
        .text-title {
          margin-top: 10px;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
    .valide {
      align-self: start;
      width: 100%;
      border-top: 1px solid lightgray;
      padding-top: 10px;
      margin-top: 10px;
      .div {
        border: 1px solid blue;
      }
    }
  }
`;
export default () => {
  const { t, i18n } = useTranslation();
  const [wilaya, setWilaya] = React.useState("0");
  const [user, setUser] = React.useState(null);
  const [submitedUserCouronne, setSubmitedUserCouronne] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [showMerci, setShowMerci] = React.useState(false);
  const [lang, setLang] = React.useState("en");

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  const [packs, setPacks] = React.useState([
    {
      name: "1",
    },
    {
      name: "2",
    },
    {
      name: "3",
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
    const submitedCouronneRef = await getDoc(doc(db, "couronnes", user.uid));
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
      return alert(t("selectionner un produit") + "!");
    }
    if (selectedPack == null) {
      return alert(t("selectionner un cadeau") + "!");
    }
    if (wilaya == 0) {
      return alert(t("selectioner votre wilaya") + "!");
    }
    const now = new Date();
    const formatedNowDate = `${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
    let couronneDoc = {
      user: user.providerData[0],
      date: formatedNowDate,
      wilaya,
      productName: selectedProduct.name,
      packName: selectedPack.name,
    };
    setDoc(doc(db, "couronnes", user.uid), couronneDoc, { merge: true })
      .then(() => {
        //getUserDon();
        setShowMerci(true);
        window.scrollTo(0, 0);
      })
      .catch(() => {
        alert("error");
      });
  };

  if (user != null && loadingSubmitedUserCouronne) {
    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <img
          width="200px"
          src={lang == "ar" ? logoArImg : logoFrImg}
          alt="img"
        />
      </div>
    );
  }

  if (user == null) {
    return <Login setUser={setUser} />;
  }

  return (
    <RootStyled lang={lang}>
      <Merci showMerci={showMerci} setShowMerci={setShowMerci} />
      <div className="header">
        <div className="img-title">
          <img src={lang == "ar" ? logoArImg : logoFrImg} alt="img" />
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
                {t("selectioner votre wilaya")}
              </option>
              {wilayas.map((w) => (
                <option value={w.code}>
                  {lang == "ar" ? w.name_ar : w.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-title">
            {t("Choisissez le Produit qui vous souhaitez en faire don")}
          </div>
        </div>
        <div
          className="lang"
          onClick={() => {
            if (lang == "ar") {
              setLang("en");
            } else {
              setLang("ar");
            }
          }}
        >
          <img height={24} src={tradImg} />
        </div>
        {user?.email == "condor.coronne@gmail.com" && (
          <div
            className="excel"
            onClick={() => {
              alert("Download excel file");
            }}
          >
            <img height={24} src={excelImg} />
          </div>
        )}
      </div>

      <Dons
        selectedProduct={selectedProduct}
        submitedUserCouronne={submitedUserCouronne}
        loading={loadingProducts}
        onChooseProduct={(product) => setSelectedProduct(product)}
        products={products} // list available products with dons
      />
      <div
        style={{
          fontSize: 20,
          textAlign: "center",
          marginBottom: 10,
          fontWeight: 700,
        }}
      >
        {t("pour participer à la tombola, choisissez votre cadeau")}
      </div>
      <Packs
        selectedPack={selectedPack}
        submitedUserCouronne={submitedUserCouronne}
        loading={loadingSubmitedUserCouronne}
        packs={packs} // list available products with dons
        onChoosePack={(pack) => {
          setSelectedPack(pack);
        }}
      />
      <div className="valide">
        <Button onClick={() => submit()}>{t("Je Valide")}</Button>
      </div>
      <div className="bg">
        <img src={bgImg} />
      </div>
    </RootStyled>
  );
};

const wilayas = [
  { name: "Adrar", name_ar: "ادرار", code: 1 },
  { name: "Chlef", name_ar: "الشلف", code: 2 },
  { name: "Laghouat", name_ar: "الأغواط", code: 3 },
  { name: "Oum El Bouaghi", name_ar: "أم_ar البواقي", code: 4 },
  { name: "Batna", name_ar: "باتنة", code: 5 },
  { name: "Béjaïa", name_ar: "بجاية", code: 6 },
  { name: "Biskra", name_ar: "بسكرة", code: 7 },
  { name: "Béchar", name_ar: "بشار", code: 8 },
  { name: "Blida", name_ar: "بليدة", code: 9 },
  { name: "Bouira", name_ar: "بويرة", code: 10 },
  { name: "Tamanrasset", name_ar: "تمنراست", code: 11 },
  { name: "Tébessa", name_ar: "تبسة", code: 12 },
  { name: "Tlemcen", name_ar: "تلمسان", code: 13 },
  { name: "Tiaret", name_ar: "تيارت", code: 14 },
  { name: "Tizi Ouzou", name_ar: "تيزي_ar وزو", code: 15 },
  { name: "Alger", name_ar: "للجزائر", code: 16 },
  { name: "Djelfa", name_ar: "الجلفة", code: 17 },
  { name: "Jijel", name_ar: "جيجل", code: 18 },
  { name: "Sétif", name_ar: "سطيف", code: 19 },
  { name: "Saïda", name_ar: "سعيدة", code: 20 },
  { name: "Skikda", name_ar: "سكيكدة", code: 21 },
  { name: "Sidi Bel Abbès", name_ar: "سيدي_ar بلعباس", code: 22 },
  { name: "Annaba", name_ar: "عنابة", code: 23 },
  { name: "Guelma", name_ar: "قالمة", code: 24 },
  { name: "Constantine", name_ar: "قسنطينة", code: 25 },
  { name: "Médéa", name_ar: "المدية", code: 26 },
  { name: "Mostaganem", name_ar: "مستغانم", code: 27 },
  { name: "M'Sila", name_ar: "مسيلة", code: 28 },
  { name: "Mascara", name_ar: "معسكر", code: 29 },
  { name: "Ouargla", name_ar: "ورقلة", code: 30 },
  { name: "Oran", name_ar: "وهران", code: 31 },
  { name: "El Bayadh", name_ar: "البيض", code: 32 },
  { name: "Illizi", name_ar: "اليزي", code: 33 },
  { name: "Bordj Bou Arreridj", name_ar: "برج_ar بوعريريج", code: 34 },
  { name: "Boumerdès", name_ar: "بومرداس", code: 35 },
  { name: "El Tarf", name_ar: "الطارف", code: 36 },
  { name: "Tindouf", name_ar: "تيندوف", code: 37 },
  { name: "Tissemsilt", name_ar: "تيسيمسيلت", code: 38 },
  { name: "El Oued", name_ar: "الواد", code: 39 },
  { name: "Khenchela", name_ar: "خنشلة", code: 40 },
  { name: "Souk Ahras", name_ar: "سوق_ar أهراس", code: 41 },
  { name: "Tipaza", name_ar: "تيبازة", code: 42 },
  { name: "Mila", name_ar: "ميلة", code: 43 },
  { name: "Aïn Defla", name_ar: "عين_ar الدفلة", code: 44 },
  { name: "Naâma", name_ar: "النعامة", code: 45 },
  { name: "Aïn Témouchent", name_ar: "عين_ar تيموشنت", code: 46 },
  { name: "Ghardaïa", name_ar: "غرداية", code: 47 },
  { name: "Relizane", name_ar: "غيليزان", code: 48 },
  { name: "Timimoun", name_ar: "تيميمون", code: 49 },
  { name: "Bordj Badji Mokhtar", name_ar: "برج_ar باجي مختار", code: 50 },
  { name: "Ouled Djellal", name_ar: "أولاد_ar جلال", code: 51 },
  { name: "Béni Abbès", name_ar: "بني_ar عباس", code: 52 },
  { name: "In Salah", name_ar: "عين_ar صالح", code: 53 },
  { name: "In Guezzam", name_ar: "عين_ar قزم", code: 54 },
  { name: "Touggourt", name_ar: "توقورت", code: 55 },
  { name: "Djanet", name_ar: "جانت", code: 56 },
  { name: "El M'Ghair", name_ar: "المغير", code: 57 },
  { name: "El Meniaa", name_ar: "المنيعة", code: 58 },
];
