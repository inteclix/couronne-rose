import React from "react";
import styled from "styled-components";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useTranslation } from "react-i18next";
import logoArImg from "imgs/logo_ar.png";
import logoFrImg from "imgs/logo_fr.png";
import googleImg from "imgs/google.png";
import facebookImg from "imgs/facebook.png";
import tradImg from "imgs/trad.png";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const RootStyled = styled.div`
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
  background: rgb(208, 207, 212);
  background: linear-gradient(
    0deg,
    rgba(208, 207, 212, 1) 15%,
    rgba(246, 247, 252, 1) 67%
  );
  justify-content: center;
  height: 100vh;
  user-select: none;
  overflow-y: scroll;
  .title {
    padding: 10;
    align-items: center;
    justify-content: center;
    .img-title {
      width: 200px;
    }
  }
  .buttons {
    margin-top: 20px;
    flex-direction: row;
    align-self: center;
  }
  .form {
    max-width: 320px;
    align-self: center;
    .input {
      input {
        padding: 10px;
        margin: 5px;
        border: 1px dashed lightgray;
      }
      input::focus {
        border: 2px dashed black;
      }
    }
  }
  @media only screen and (max-width: 800px) {
    .buttons {
      flex-direction: column;
    }
    .title {
      margin-top: 10px;
      .img-title {
        width: 90%;
      }
    }
  }
`;
export default () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = React.useState("en");

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  const loginWithGoogle = () => {
    const auth = getAuth();
    googleProvider.addScope("email");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        //setUser(user)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const loginWithFacebbok = () => {
    const auth = getAuth();
    facebookProvider.addScope("email");
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        //setUser(user)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <RootStyled>
      <div className="title">
        <img
          className="img-title"
          src={lang == "ar" ? logoArImg : logoFrImg}
          alt="img"
        />
      </div>
      <div>
        <div>
          <div className="buttons">
            <LoginWithGoogleButton t={t} onClick={loginWithGoogle} />
            <LoginWithFacebookButton t={t} onClick={loginWithFacebbok} />
          </div>
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
    </RootStyled>
  );
};

const StyledLoginWithGoogle = styled.div`
  margin: 5px;
  flex-direction: row;
  background-color: #4285f4;
  align-items: center;
  padding: 5px;
  padding-right: 15px;
  padding-left: 15px;

  border-radius: 3px;
  max-width: 320px;
  color: white;
  font-size: 26;
  font-weight: 700;
  cursor: pointer;
  img {
    margin-right: 8px;
    background-color: white;
    padding: 5px;
  }
  :hover {
    background-color: #2767d0;
  }
`;
export const LoginWithGoogleButton = ({t, onClick }) => (
  <StyledLoginWithGoogle onClick={onClick}>
    <div className="img">
      <img width={24} height={24} src={googleImg} />
    </div>
    <div>{t("Connectez-vous avec")}</div>
  </StyledLoginWithGoogle>
);

const StyledLoginWithFacebook = styled.div`
  margin: 5px;
  flex-direction: row;
  background-color: #3b5998;
  align-items: center;
  padding: 5px;
  border-radius: 3px;
  max-width: 320px;
  color: white;
  font-size: 26;
  font-weight: 700;
  cursor: pointer;
  img {
    margin-right: 5px;
    background-color: white;
    padding: 8px;
  }
  :hover {
    background-color: #1f4492;
  }
`;
export const LoginWithFacebookButton = ({t, onClick }) => (
  <StyledLoginWithFacebook onClick={onClick}>
    <div className="img">
      <img width={24} height={24} src={facebookImg} />
    </div>
    <div>{t("Connectez-vous avec")}</div>
  </StyledLoginWithFacebook>
);
