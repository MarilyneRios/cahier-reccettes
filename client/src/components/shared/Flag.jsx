import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const Flag = ({ country }) => {
  const [flagUrl, setFlagUrl] = useState("");

  useEffect(() => {
    const countryCodes = {
      // Europe
      france: "fr",
      allemagne: "de",
      italie: "it",
      espagne: "es",
      "royaume-uni": "gb",
      irlande: "ie",
      portugal: "pt",
      belgique: "be",
      paysbas: "nl",
      danemark: "dk",
      suède: "se",
      norvège: "no",
      finlande: "fi",
      pologne: "pl",
      autriche: "at",
      suisse: "ch",
      grèce: "gr",
      roumanie: "ro",
      "république tchèque": "cz",
      tchéquie: "cz",
      hongrie: "hu",
      biélorussie: "by",
      bulgarie: "bg",
      slovaquie: "sk",
      moldavie: "md",
      // Asie
      russie: "ru",
      chine: "cn",
      inde: "in",
      japon: "jp",
      coréedusud: "kr",
      indonésie: "id",
      turquie: "tr",
      thaïlande: "th",
      // Amérique du Nord
      étatsunis: "us",
      canada: "ca",
      mexique: "mx",
      // Amérique du Sud
      brésil: "br",
      argentine: "ar",
      colombie: "co",
      chili: "cl",
      cuba: "cu",
      // Afrique
      nigeria: "ng",
      algérie: "dz",
      maroc: "ma",
      "burkina faso": "bf",
      cameroon: "cm",
      ghana: "gh",
      mali: "ml",
      tunésie: "tn",
      niger: "ne",
    };

    const countryCode = countryCodes[country.toLowerCase()];
    if (countryCode) {
      const flagUrl = `https://flagcdn.com/w640/${countryCode}.png`;
      setFlagUrl(flagUrl);
    }
  }, [country]);

  return (
    <div>
      {flagUrl && (
        <Card.Img
          src={flagUrl}
          alt={`Drapeau de ${country}`}
          style={{ marginTop: "0.5rem", width: "2rem" }}
        />
      )}
    </div>
  );
};

export default Flag;