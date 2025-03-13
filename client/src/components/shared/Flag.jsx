const Flag = ({ country }) => {
  const [flagUrl, setFlagUrl] = useState("");

  useEffect(() => {
    const countryCodes = {
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
      russie: "ru",
      chine: "cn",
      inde: "in",
      japon: "jp",
      coréedusud: "kr",
      indonésie: "id",
      turquie: "tr",
      thaïlande: "th",
      étatsunis: "us",
      canada: "ca",
      mexique: "mx",
      brésil: "br",
      argentine: "ar",
      colombie: "co",
      chili: "cl",
      cuba: "cu",
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
    <span>
      {flagUrl && (
        <img
          src={flagUrl}
          alt={`Drapeau de ${country}`}
          style={{ marginTop: "0.5rem", width: "2rem" }}
        />
      )}
    </span>
  );
};

export default Flag;
