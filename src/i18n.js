import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "selectioner votre wilaya": "Sélectioner votre wilaya !",
      "Choisissez le Produit qui vous souhaitez en faire don":
        "Choisissez le Produit qui vous souhaitez en faire don",
      "Je Fais un Don": "Je Fais un Don",
      cadeau: "Cadeau",
      "Je Valide": "Je Valide",
      Vote: "Vote",
      "selectionner un cadeau": "Sélectionner un cadeau",
      "selectionner un produit": "Sélectionner un produit",
      "pour participer à la tombola, choisissez votre cadeau":
        "Pour participer à la tombola, choisissez votre cadeau",
      "Se deconnecter": "Se déconnecter",
      "Email invalide!": "Email invalide!",
      "Connectez-vous avec": "Connectez-vous avec",
      "Merci pour votre participation": "Merci pour votre participation",
    },
  },
  ar: {
    translation: {
      "selectioner votre wilaya": "أختر الولاية",
      "Choisissez le Produit qui vous souhaitez en faire don":
        "اختر المنتج الذي تريد التبرع به",
      "Je Fais un Don": "أتبرع",
      cadeau: "هدية",
      "Je Valide": "موافق",
      Vote: "تصويت",
      "selectionner un cadeau": "اختر الهدية",
      "selectionner un produit": "اختر المنتوج الذي تريد التبرع به",
      "pour participer à la tombola, choisissez votre cadeau":
        "للمشاركة في السحب ، اختر هديتك",
      "Se deconnecter": "تسجيل خروج",
      "Email invalide!": "بريد إلكتروني خاطئ!",
      "Connectez-vous avec": "تسجيل الدخول مع",
      "Merci pour votre participation": "شكرا لمشاركتك",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
