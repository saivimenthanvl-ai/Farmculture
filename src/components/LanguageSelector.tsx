import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪'},
    { code: 'pl', name: 'polski', flag: '🇵🇱'},
    { code: 'fr', name: 'français', flag: '🇫🇷'},
    { code: 'es', name: 'español', flag: '🇪🇸' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },

  ];

  return (
    <div className="relative group">
      {/* Button with boxed globe + language code */}
      <button
        aria-label={t('language')}
        className="flex items-center gap-2 px-3 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 border border-gray-300">
          <Globe className="w-4 h-4 text-gray-700" />
        </span>
        <span className="text-sm font-medium uppercase">{language}</span>
      </button>
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
              language === lang.code ? 'bg-green-50 text-green-700' : 'text-gray-700'
            } ${lang.code === languages[0].code ? 'rounded-t-lg' : ''} ${
              lang.code === languages[languages.length - 1].code ? 'rounded-b-lg' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export const translations = {
  en: {
    welcome: 'Farmculture',
    subtitle: 'Your friendly agriculture assistant',
    cropDiagnosis: 'Crop Disease Diagnosis',
    marketPrices: 'Market Prices',
    govtSchemes: 'Government Schemes',
    voiceAssistant: 'Voice Assistant',
    restaurants: 'Restaurant Connect',
    coldStorage: 'Cold Storage',
    language: 'Language',
    farmersHelped: 'Farmers Helped',
    diagnosisAccuracy: 'Diagnosis Accuracy',
    availableSupport: 'Available Support',
    SupportSystem: 'Support System',
    FarmerIncome_increased: '2.5 Million',
    FarmerIncomeincreasedlabel: 'Farmer Income Increased',
    copyright: '© 2025 Farmculture. All rights reserved.',
  },
  ta: {
    வரவேற்கிறேன்: 'பண்ணை வளர்ப்பு வரவேற்கிறோம்',
    தலைப்பு: 'உங்கள் நட்பு விவசாய உதவி',
    சந்தைவிலைகள்: 'சந்தை விலைகள்',
    மர்க்ட்விலைகள்: 'மர்க்ட் விலைகள்',
    அரசுதிட்டங்கள்: 'அரசு திட்டங்கள்',
    உணவகஇணைப்பு: 'உணவக இணைப்பு',
    குளிர்பதனசேமிப்பு: 'குளிர்பதன சேமிப்பு',
    மொழி: 'மொழி',
    நோயறிதல்துல்லியம்: 'நோயறிதல் துல்லியம்',
    கிடைக்கிறதுஆதரவு: 'கிடைக்கும் ஆதரவு',
    ஆதரவுச்சிஸ்டம்: 'ஆதரவு சிஸ்டம்',
    copyright: '© 2025 Farmculture. All rights reserved.',

  },
  hi: {
    welcome: 'कृषिसंस्कृति में आपका स्वागत है',
    subtitle: 'दुनिया की सबसे बड़ी कृषि नेटवर्क',
    tagline: 'किसानों को अत्याधुनिक इंटेलिजेंस के साथ सशक्त बनाना',
    agriculture_tools: 'कृषि उपकरण',
    crop_diagnosis: 'फसल निदान',
    crop_diagnosis_desc: 'तुरंत आधारित रोग पहचान',
    market_prices: 'बाज़ार भाव',
    market_prices_desc: 'रियल-टाइम कमोडिटी दाम ट्रैकिंग',
    govt_schemes: 'सरकारी योजनाएँ',
    govt_schemes_desc: 'सब्सिडी और सहायता कार्यक्रमों तक पहुँच',
    voice_assistant: 'वॉयस सहायक',
    voice_assistant_desc: 'आपकी भाषा में हाथ-मुक्त मदद',
    restaurants: 'रेस्तराँ',
    restaurants_desc: 'उत्पाद को सीधे खरीदारों से जोड़ें',
    cold_storage: 'कोल्ड स्टोरेज',
    cold_storage_desc: 'कोल्ड चेन की निगरानी और प्रबंधन',
    advanced_features: 'उन्नत सुविधाएँ',
    market_predictor: 'बाज़ार पूर्वानुमान',
    market_predictor_desc: 'बेहतर बिक्री निर्णयों के लिए AI पूर्वानुमान',
    crop_health_monitor: 'फसल स्वास्थ्य मॉनिटर',
    crop_health_monitor_desc: 'सैटेलाइट और सेंसर आधारित फ़ील्ड विश्लेषण',
    drone_monitoring: 'ड्रोन निगरानी',
    drone_monitoring_desc: 'प्रेसिजन खेती के लिए एरियल इमेजरी',
    smart_irrigation: 'स्मार्ट सिंचाई',
    smart_irrigation_desc: 'पानी बचाने वाली स्वचालित सिंचाई',
    weather_insights: 'मौसम अंतर्दृष्टि',
    weather_insights_desc: 'हाइपरलोकल मौसम और जलवायु चेतावनियाँ',
    blockchain_traceability: 'ब्लॉकचेन ट्रेसेबिलिटी',
    blockchain_traceability_desc: 'अंत-से-अंत सप्लाई-चेन पारदर्शिता',
    farmers_helped: '100,000+',
    farmers_helped_label: 'किसानों की सहायता',
    diagnosis_accuracy: '९८.५%',
    diagnosis_accuracy_label: 'निदान की सटीकता',
    support_system: '२४/७',
    support_system_label: 'सहायता प्रणाली',
    farmer_income_increased: '२.५ मिलियन',
    farmer_income_increased_label: 'किसान आय में वृद्धि',
    revolutionary_agriculture:'क्रांतिकारी कृषि',
    market_preiction : 'मार्केट की भविष्यवाणी',
    satellite_monitoring : 'उपग्रह निगरानी',
    copyright: '© २०२५ कृषि संस्कृति. सभी अधिकार सुरक्षित।',
  },
  de: {
    Willkommen: 'Landwirtschaftskultur',
    Untertitel: 'Ihr freundlicher Landwirtschaftsassistent',
    ErnteDiagnose: 'Pflanzenkrankheiten Diagnose',
    Marktpreise: 'Marktpreise',
    RegierungsProgramme: 'Regierungsprogramme',
    Sprachassistent: 'Sprachassistent',
    Restaurants: 'Restaurant verbinden',
    Kühlhaus: 'Kühlhaus',
    Sprache: 'Sprache',
    UnterstützteBauern: 'Hilfreiche Landwirte',
    DiagnoseGenauigkeit: 'Diagnosegenauigkeit',
    VerfügbareHilfe: 'Verfügbare Unterstützung',
    UnterstützungsSystem: 'Unterstützungsystem',
  },
  pl: {
    witaj: 'Witamy w Farmkultura',
    kotwica: 'Twój AI-zasilany asystent rolniczy',
    diagnozaRoślin: 'Diagnoza chorób roślin',
    cenyRynkowe: 'Ceny rynkowe',
    programyRządowe: 'Programy rządowe',
    asystentGłosowy: 'Asystent głosowy',
    restauracje: 'Połączenie restauracji',
    zapasyChłodnicze: 'Magazyn chłodniczy',
    język: 'Język',
    rolnicyPomocni: 'Rolnicy, którzy otrzymali pomoc',
    precyzjaDiagnozy: 'Dokładność diagnozy',
    odpłatnaPomoc: 'Dostępna pomoc',
    systemPodstrojowy: 'System podstrojowy',
  },
  fr: {
    bienvenue: 'Bienvenue au Culture agricole',
    sousTitre: 'Votre assistant agricole alimenté par lIA',
    diagnosticDeCulture: 'Diagnostic des maladies des cultures',
    prixDuMarché: 'Prix du marché',
    programmesGouvernementaux: 'Programmes gouvernementaux',
    assistantVocal: 'Assistant vocal',
    restaurants: 'Connexion restaurant',
    stockageFroid: 'Stockage frigorifique',
    langue: 'Langue',
    agriculteursAidés: 'Agriculteurs aidés',
    diagnosticPrécision: 'Précision du diagnostic',
    supportDisponible: 'Support disponible',
    systèmeDeSupport: 'Système de support',
  },
  es: {
    bienvenida: 'Bienvenido al Cultura agrícola',
    subtítulo: 'Tu asistente agrícola potenciado por IA',
    diagnósticoDeCultivo: 'Diagnóstico de enfermedades de cultivos',
    preciosDelMercado: 'Precios de mercado',
    programasGobierno: 'Programas gubernamentales',
    asistenteDeVoz: 'Asistente de voz',
    restaurantes: 'Conexión de restaurantes',
    almacenamientoFrío: 'Almacenamiento en frío',
    idioma: 'Idioma',
    agricultoresAyudados: 'Agricultores ayudados',
    precisiónDelDiagnóstico: 'Precisión del diagnóstico',
    soporteDisponible: 'Soporte disponible',
    sistemaDeSoporte: 'Sistema de soporte',
  },
  te:{
    welcome: 'కृषిసంస్కృతిలో మీకు స్వాగతం',
    subtitle: 'ప్రపంచంలో అత్యంత పెద్ద వ్యవసాయ నెట్‌వర్క్',
    tagline: 'కిసాన్లను అత్యాధునిక మేధోశక్తితో బలవంతంగా చేయడం',
    agriculture_tools: 'కృషి ఉపకరణం',
    crop_diagnosis: 'ముగ్గు నిర్ధారణ',
    crop_diagnosis_desc: 'తక్షణంగా ఆధారిత రోగ గుర్తింపు',
    market_prices: 'మార్కెట్ ధర',
    market_prices_desc: 'నిజం-సమయ క commodities ధరల ట్రాకింగ్',
    govt_schemes: 'సర్కారి కార్యక్రమాలు',
    govt_schemes_desc: 'సబ్‌సిడీ మరియు సహాయ కార్యక్రమాలను చేరుకోవడం',
    voice_assistant: 'శబ్ద సహాయకుడు',
    voice_assistant_desc: 'మీ భాషలో చేతులేని సహాయం',
    restaurants: 'రెస్టారంట్',
    restaurants_desc: 'ఉత్పన్నాన్ని నేరుగా కరిదారులకు అనుసంధానం చేయండి',
    cold_storage: 'కొల్డ్ స్టోరేజ్',
    cold_storage_desc: 'కోల్‌డ్ చైన్ పర్యవేక్షణ మరియు నిర్వహణ',
    advanced_features: 'ఉన్నత సౌకర్యాలు',
    market_predictor: 'బజార్ అంచనా',
    market_predictor_desc: 'మంచి అమ్మకాలు నిర్ణయాలకు AI అంచనాలు',
    crop_health_monitor: 'పంట ఆరోగ్య మానిటర్',
    crop_health_monitor_desc: 'సాట్‌లైట్ మరియు సెన్సార్ ఆధారిత ఫీల్డ్ విశ్లేషణ',
    drone_monitoring: 'డ్రోన్ పర్యవేక్షణ',
    drone_monitoring_desc: 'ప్రెసిజన్ వ్యవసాయానికి ఎరియల్ ఇమేజరీ',
    smart_irrigation: 'స్మార్ట్ పంట నూర్పు',
    smart_irrigation_desc: 'నీళ్లు పొడిగించే అందుబాటులో ఉన్న పద్ధతులు సురక్షితమైన పొడిగింపు',
    weather_insights: 'మౌసమ దృష్టీకోణం',
    weather_insights_desc: 'హైపర్‌లోకల్ వాతావరణం మరియు సుజనాత్మక చట్రాలు',
    blockchain_traceability: 'బ్లాక్‌చెయిన్ ట్రేసబిలిటీ',
    blockchain_traceability_desc: 'అంత-చోక కర్మాగారానికి సప్లై-చెయిన్ ప్యారదర్శిత.',
    farmers_helped: '100,000+',
    farmers_helped_label: 'కిసాన్ల సహాయం',
    diagnosis_accuracy: '९८.५%',
    diagnosis_accuracy_label: 'నిదాన యొక్క ఖచ్చితత్వం',
    support_system: '२४/७',
    support_system_label: 'సహాయ వ్యవస్థ',
    farmer_income_increased: '२.५ మిలియన్',
    farmer_income_increased_label: 'వ్యవసాయకారుల ఆదాయం పెరుగుదల',
    revolutionary_agriculture:'క్రాంతికారి వ్యవసాయం',
    market_preiction : 'మార్కెట్ యొక్క భవిష్యవాణి',
    satellite_monitoring : 'ఉపగ్రహ పర్యవేక్షణ',
    copyright: '© २०२५ కొత్త దేశం. అన్ని హక్కులు అందుబాటులో ఉన్నాయి.',
  },
};
