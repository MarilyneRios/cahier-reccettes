import  { useState, useEffect } from 'react';
import ReactCountryFlag from "react-country-flag";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const CountryFlag = ({ country }) => {
  const [flagUrl, setFlagUrl] = useState("");

  // Mapping des noms de pays aux codes ISO
  const countryCodeMap = {
    // Pays Européens
    "Albanie": "AL",
    "Andorre": "AD",
    "Autriche": "AT",
    "Biélorussie": "BY",
    "Belgique": "BE",
    "Bosnie-Herzégovine": "BA",
    "Bulgarie": "BG",
    "Croatie": "HR",
    "Chypre": "CY",
    "République Tchèque": "CZ",
    "Danemark": "DK",
    "Estonie": "EE",
    "Finlande": "FI",
    "France": "FR",
    "Allemagne": "DE",
    "Grèce": "GR",
    "Hongrie": "HU",
    "Islande": "IS",
    "Irlande": "IE",
    "Italie": "IT",
    "Kosovo": "XK",
    "Lettonie": "LV",
    "Liechtenstein": "LI",
    "Lituanie": "LT",
    "Luxembourg": "LU",
    "Malte": "MT",
    "Moldavie": "MD",
    "Monaco": "MC",
    "Monténégro": "ME",
    "Pays-Bas": "NL",
    "Macédoine du Nord": "MK",
    "Norvège": "NO",
    "Pologne": "PL",
    "Portugal": "PT",
    "Roumanie": "RO",
    "Russie": "RU",
    "Saint-Marin": "SM",
    "Serbie": "RS",
    "Slovaquie": "SK",
    "Slovénie": "SI",
    "Espagne": "ES",
    "Suède": "SE",
    "Suisse": "CH",
    "Ukraine": "UA",
    "Royaume-Uni": "GB",
    "Cité du Vatican": "VA",
  
    // Quelques Pays Africains
    "Algérie": "DZ",
    "Angola": "AO",
    "Bénin": "BJ",
    "Botswana": "BW",
    "Burkina Faso": "BF",
    "Burundi": "BI",
    "Cap-Vert": "CV",
    "Cameroun": "CM",
    "République Centrafricaine": "CF",
    "Tchad": "TD",
    "Comores": "KM",
    "Congo": "CG",
    "Côte d'Ivoire": "CI",
    "République Démocratique du Congo": "CD",
    "Djibouti": "DJ",
    "Égypte": "EG",
    "Guinée Équatoriale": "GQ",
    "Érythrée": "ER",
    "Eswatini": "SZ",
    "Éthiopie": "ET",
    "Gabon": "GA",
    "Gambie": "GM",
    "Ghana": "GH",
    "Guinée": "GN",
    "Guinée-Bissau": "GW",
    "Kenya": "KE",
    "Lesotho": "LS",
    "Libéria": "LR",
    "Libye": "LY",
    "Madagascar": "MG",
    "Malawi": "MW",
    "Mali": "ML",
    "Mauritanie": "MR",
    "Maurice": "MU",
    "Maroc": "MA",
    "Mozambique": "MZ",
    "Namibie": "NA",
    "Niger": "NE",
    "Nigéria": "NG",
    "Rwanda": "RW",
    "Sao Tomé-et-Principe": "ST",
    "Sénégal": "SN",
    "Seychelles": "SC",
    "Sierra Leone": "SL",
    "Somalie": "SO",
    "Afrique du Sud": "ZA",
    "Soudan du Sud": "SS",
    "Soudan": "SD",
    "Tanzanie": "TZ",
    "Togo": "TG",
    "Tunisie": "TN",
    "Ouganda": "UG",
    "Zambie": "ZM",
    "Zimbabwe": "ZW",
  
    // Quelques Pays Asiatiques
    "Afghanistan": "AF",
    "Arménie": "AM",
    "Azerbaïdjan": "AZ",
    "Bahreïn": "BH",
    "Bangladesh": "BD",
    "Bhoutan": "BT",
    "Brunei": "BN",
    "Cambodge": "KH",
    "Chine": "CN",
    "Géorgie": "GE",
    "Inde": "IN",
    "Indonésie": "ID",
    "Iran": "IR",
    "Irak": "IQ",
    "Israël": "IL",
    "Japon": "JP",
    "Jordanie": "JO",
    "Kazakhstan": "KZ",
    "Koweït": "KW",
    "Kirghizistan": "KG",
    "Laos": "LA",
    "Liban": "LB",
    "Malaisie": "MY",
    "Maldives": "MV",
    "Mongolie": "MN",
    "Myanmar": "MM",
    "Népal": "NP",
    "Corée du Nord": "KP",
    "Oman": "OM",
    "Pakistan": "PK",
    "Palestine": "PS",
    "Philippines": "PH",
    "Qatar": "QA",
    "Arabie Saoudite": "SA",
    "Singapour": "SG",
    "Corée du Sud": "KR",
    "Sri Lanka": "LK",
    "Syrie": "SY",
    "Taïwan": "TW",
    "Tadjikistan": "TJ",
    "Thaïlande": "TH",
    "Timor-Leste": "TL",
    "Turquie": "TR",
    "Turkménistan": "TM",
    "Émirats Arabes Unis": "AE",
    "Ouzbékistan": "UZ",
    "Vietnam": "VN",
    "Yémen": "YE",
  
    // Quelques Pays Américains
    "Antigua-et-Barbuda": "AG",
    "Argentine": "AR",
    "Bahamas": "BS",
    "Barbade": "BB",
    "Belize": "BZ",
    "Bolivie": "BO",
    "Brésil": "BR",
    "Canada": "CA",
    "Chili": "CL",
    "Colombie": "CO",
    "Costa Rica": "CR",
    "Cuba": "CU",
    "Dominique": "DM",
    "République Dominicaine": "DO",
    "Équateur": "EC",
    "El Salvador": "SV",
    "Grenade": "GD",
    "Guatemala": "GT",
    "Guyana": "GY",
    "Haïti": "HT",
    "Honduras": "HN",
    "Jamaïque": "JM",
    "Mexique": "MX",
    "Nicaragua": "NI",
    "Panama": "PA",
    "Paraguay": "PY",
    "Pérou": "PE",
    "Saint-Christophe-et-Niévès": "KN",
    "Sainte-Lucie": "LC",
    "Saint-Vincent-et-les-Grenadines": "VC",
    "Suriname": "SR",
    "Trinité-et-Tobago": "TT",
    "États-Unis": "US",
    "Uruguay": "UY",
    "Venezuela": "VE"
  };
  

  useEffect(() => {
    if (country && countryCodeMap[country]) {
      const code = countryCodeMap[country].toLowerCase();
      setFlagUrl(`https://flagcdn.com/w320/${code}.png`);
    } else {
      setFlagUrl("");
    }
  }, [country]);

  return (
    <div>
    {flagUrl ? (
      <OverlayTrigger
        placement="top" // Position de l'infobulle (peut être "top", "right", "bottom", "left")
        overlay={<Tooltip id="flag-tooltip">{` ${country}`}</Tooltip>}
        
      >
        <img
          src={flagUrl}
          alt={`Drapeau de ${country}`}
          style={{ marginTop: "0.1rem", width: "2.8rem", height: "auto", cursor: "pointer" }}
          
        />
      </OverlayTrigger>
    ) : (
      <div className='d-flex align-item-center '
      style={{ marginTop: "0.1rem", width: "100px", height: "auto", cursor: "pointer" }}
      >
       Aucun drapeau
      </div>
    )}
  </div>
  );
};

export default CountryFlag;
