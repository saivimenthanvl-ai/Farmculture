// src/contexts/LanguageContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  PropsWithChildren,
} from "react";

/** Supported languages */
export type Lang = "en" | "hi" | "ta" | "de" | "pl" | "fr" | "es" | "te";

/** Context shape (keeps old & new names to avoid breaking anything) */
type Ctx = {
  // NEW API
  lang: Lang;
  setLang: (l: Lang) => void;
  // Legacy aliases (so older code keeps working)
  language: Lang;
  setLanguage: (l: Lang) => void;
  // translator
  t: (key: string) => string;
};

const LanguageContext = createContext<Ctx | undefined>(undefined);

/** Normalize browser codes like en-US → en */
const normalize = (v?: string | null): Lang => {
  const base = (v || "en").toLowerCase().split("-")[0] as Lang;
  return (["en", "hi", "ta", "de", "pl", "fr", "es", "te"] as const).includes(base)
    ? base
    : "en";
};

/** Safe nested getter using dot notation ("footer.brand") */
const pathGet = (obj: any, path: string) =>
  path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), obj);

/** ---------------- Translations ----------------
 *  Note: use any for values to allow nested objects like auth and footer.
 */
const dict: Record<Lang, any> = {
  en: {
    brand: "Farmculture",
    brand_tagline: "Your friendly agriculture assistant",
    welcome: "Welcome to Farmculture",
    subtitle: "World largest agricultural network",
    tagline: "Empowering farmers with cutting-edge intelligence",
    agriculture_tools: "Agriculture Tools",
    crop_diagnosis: "Crop Diagnosis",
    crop_diagnosis_desc: "Instant crop disease detection",
    market_prices: "Market Prices",
    market_prices_desc: "Real-time commodity price tracking",
    govt_schemes: "Government Schemes",
    govt_schemes_desc: "Access subsidies and support programs",
    voice_assistant: "Voice Assistant",
    voice_assistant_desc: "Hands-free help in your language",
    restaurants: "Restaurants",
    restaurants_desc: "Connect produce directly with buyers",
    cold_storage: "Cold Storage",
    cold_storage_desc: "Monitor and manage cold chain",

    advanced_features: "Advanced Features",
    market_predictor: "Market Predictor",
    market_predictor_desc: "Forecasts for better selling decisions",
    crop_health_monitor: "Crop Health Monitor",
    crop_health_monitor_desc: "Satellite and sensor-based field analytics",
    drone_monitoring: "Drone Monitoring",
    drone_monitoring_desc: "Aerial imagery for precision farming",
    smart_irrigation: "Smart Irrigation",
    smart_irrigation_desc: "Water-saving automated irrigation",
    weather_insights: "Weather Insights",
    weather_insights_desc: "Hyperlocal weather and climate alerts",
    blockchain_traceability: "Blockchain Traceability",
    blockchain_traceability_desc: "End-to-end supply chain transparency",
    farmers_helped: "100,000",
    farmers_helped_label: "Farmers Helped",
    diagnosis_accuracy: "98.5%",
    diagnosis_accuracy_label: "Diagnosis Accuracy",
    support_system: "24/7",
    support_system_label: "Support System",
    farmer_income_increased: "2.5 Million",
    farmer_income_increased_label: "Farmer Income Increased",
    revolutionary_agriculture: "Revolutionary Agriculture",
    market_prediction: "Market Prediction",
    market_prediction_desc: "Forecasts for better selling decisions",
    satellite_monitoring: "Satellite Monitoring",
    satellite_monitoring_desc: "Real-time monitoring with remote sensing",
    blockchain_transparency: "Blockchain Transparency",
    blockchain_transparency_desc: "Traceable supply chain",
    backToHome: "Back to Home",
    "Back To Home": "Back to Home", // legacy alias
    "footer.brand": "Farmculture",
    "footer.tagline":
      "Revolutionizing Agriculture with AI Technology & Blockchain Traceability",
    "footer.poweredBy": "Powered by",
    "footer.technologies": "Technologies",
    "footer.copyright":
      "Helping farmers with small contribution towards society.",
    auth: {
      sign_in_title: "Sign in to",
      welcome: "Welcome back, farmer!",
      email: "Email address",
      password: "Password",
      sign_in: "Sign in",
      or: "OR",
      continue_google: "Continue with Google",
      new_to: "New to",
      create_account: "Create an account",
      back_home: "Back to home",
    },
    units: { perKg: "per kg", perKgDay: "per kg/day", l: "L" },

    cropDiag: {
      title: "Crop Disease Diagnosis",
      subtitle: "Upload a photo of your crop to get instant diagnosis",
      dropPrompt: "Click to upload or take a photo",
      cta: "Take Photo / Upload Image",
    },

    market: {
      title: "Market Prices",
      search: "Search for commodity…",
      alertTitle: "Price Alert",
      alertMsg: "Beans prices have increased by 15% in the last week.",
    },

    schemes: {
      title: "Government Schemes",
      subtitle: "Find and apply for agricultural subsidies and schemes",
      search: "Search schemes…",
      filterAll: "All",
      eligibility: "Eligibility",
      benefits: "Benefits",
      applyOnline: "Apply online",
      applyNow: "Apply Now",
    },

    restaurant: {
      title: "Restaurant Connect",
      subtitle:
        "Connect directly with restaurants and food chains for bulk orders",
      requirements: "Requirements",
      connect: "Connect",
    },

    cold: {
      title: "Cold Storage Facilities",
      subtitle: "Find and book cold storage space for your produce",
      facilities: "Facilities",
      goodAvailability: "Good Availability",
      bookNow: "Book Now",
    },

    predictor: {
      title: "Market Predictor",
      subtitle: "Advanced machine learning price forecasting",
      timeframe: "Timeframe",
      optimalStrategy: "Optimal Strategy",
      hold: "Hold for 2–3 weeks for optimal returns",
      bestSellDate: "Best sell date",
      confidence: "Confidence",
      next7: "Next 7 days",
      next30: "Next 30 days",
      keyFactors: "Key Market Factors",
      seriesPrice: "Predicted Price (₹/kg)",
      seriesConf: "Confidence (%)",
    },

    health: {
      title: "Crop Health Monitor",
      subtitle: "Real-time satellite and drone-based crop analysis",
      aiScan: "AI Scan",
      yourFields: "Your Fields",
      cropType: "Crop Type",
      growthStage: "Growth Stage",
      predictedYield: "Predicted Yield",
      expectedHarvest: "Expected Harvest",
      cropIssues: "Crop Issues",
      recommendations: "Recommendations",
    },

    drone: {
      title: "Drone Monitoring System",
      subtitle: "Real-time aerial surveillance and crop monitoring",
      activeDrone: "Active Drone",
      liveFeed: "Live Feed",
      launch: "Launch Drone",
      recentFindings: "Recent Findings",
    },

    irrigation: {
      title: "Smart Irrigation Control",
      subtitle: "Precision watering system",
      autoMode: "Auto Mode",
      todayUsage: "Today Usage",
      thisWeek: "This Week",
      waterSaved: "Water Saved",
      zones: "Irrigation Zones",
      nextSchedule: "Next Schedule",
      efficiency: "Efficiency",
      farmingReco: "Farming Recommendation",
    },

    weatherX: {
      title: "Weather Insights",
      subtitle:
        "Precision agriculture weather analysis powered by satellite data",
      temp: "Temperature",
      humidity: "Humidity",
      rainfall: "Rainfall",
      wind: "Wind Speed",
      uv: "UV Index",
      soil: "Soil Moisture",
      forecast5: "5-Day Precision Forecast",
      recos: "Farming Recommendations",
    },

    trace: {
      title: "Blockchain Traceability",
      subtitle: "Complete farm-to-fork transparency with immutable records",
      productLabel: "Organic Tomatoes",
      batch: "Batch",
      showQr: "Show QR Code",
      farmerDetails: "Farmer Details",
      sustainabilityScore: "Farmculture Sustainability Score",
      certificates: "Certificates",
      certList: {
        organic: "Organic Certificate",
        quality: "Quality Assurance",
        coldChain: "Cold Chain Compliance",
      },
      delivery: "Delivery",
      stages: {
        planting: "Planting",
        harvesting: "Harvesting",
        processing: "Processing",
        transportation: "Transportation",
        retail: "Retail",
      },
      fields: {
        location: "Location",
        handler: "Handler",
        quality: "Quality",
        temperature: "Temperature",
      },
      status: {
        current: "Current Status: Available for Purchase",
        verifiedLine:
          "All stages verified on blockchain. Complete transparency guaranteed.",
      },
      tags: {
        organic: "Organic",
        fairTrade: "Fair Trade",
        sustainable: "Sustainable",
      },
    },
  },

  hi: {
    brand: "कृषि संस्कृति",
    brand_tagline: "आपका दोस्ताना कृषि सहायक",
    welcome: "कृषि संस्कृति में आपका स्वागत है",
    subtitle: "दुनिया का सबसे बड़ा कृषि नेटवर्क",
    tagline: "अत्याधुनिक इंटेलिजेंस के साथ किसानों को सशक्त बनाना",

    agriculture_tools: "कृषि उपकरण",
    crop_diagnosis: "फसल निदान",
    crop_diagnosis_desc: "तुरंत रोग पहचान",
    market_prices: "बाज़ार भाव",
    market_prices_desc: "रीयल-टाइम कमोडिटी मूल्य",
    govt_schemes: "सरकारी योजनाएँ",
    govt_schemes_desc: "सब्सिडी और सहायता कार्यक्रम",
    voice_assistant: "वॉयस सहायक",
    voice_assistant_desc: "आपकी भाषा में हाथ-मुक्त मदद",
    restaurants: "रेस्तरां",
    restaurants_desc: "उत्पादों को सीधे खरीदारों से जोड़ें",
    cold_storage: "कोल्ड स्टोरेज",
    cold_storage_desc: "कोल्ड चेन की निगरानी व प्रबंधन",

    advanced_features: "उन्नत सुविधाएँ",
    market_predictor: "बाज़ार पूर्वानुमान",
    market_predictor_desc: "बेहतर बिक्री निर्णयों के लिए भविष्यवाणी",
    crop_health_monitor: "फसल स्वास्थ्य मॉनिटर",
    crop_health_monitor_desc: "सैटेलाइट व सेंसर आधारित विश्लेषण",
    drone_monitoring: "ड्रोन निगरानी",
    drone_monitoring_desc: "प्रिसिजन खेती के लिए एरियल इमेजरी",
    smart_irrigation: "स्मार्ट सिंचाई",
    smart_irrigation_desc: "पानी बचाने वाली स्वचालित सिंचाई",
    weather_insights: "मौसम जानकारियाँ",
    weather_insights_desc: "हाइपरलोकल मौसम व अलर्ट",
    blockchain_traceability: "ब्लॉकचेन ट्रेसेबिलिटी",
    blockchain_traceability_desc: "एंड-टू-एंड सप्लाई-चेन पारदर्शिता",

    farmers_helped: "100,000+",
    farmers_helped_label: "सहायता प्राप्त किसान",
    diagnosis_accuracy: "98.5%",
    diagnosis_accuracy_label: "निदान सटीकता",
    support_system: "24/7",
    support_system_label: "सहायता प्रणाली",
    farmer_income_increased: "2.5 मिलियन",
    farmer_income_increased_label: "किसान आय में वृद्धि",

    revolutionary_agriculture: "क्रांतिकारी कृषि",
    market_prediction: "मार्केट प्रेडिक्शन",
    satellite_monitoring: "उपग्रह मॉनिटरिंग",
    blockchain_transparency: "ब्लॉकचेन पारदर्शिता",

    backToHome: "मुख्य पृष्ठ पर लौटें",

    "footer.brand": "कृषि संस्कृति",
    "footer.tagline":
      "एआई तकनीक और ब्लॉकचेन ट्रेसबिलिटी के साथ कृषि में क्रांति",
    "footer.poweredBy": "द्वारा संचालित",
    "footer.technologies": "प्रौद्योगिकियाँ",
    "footer.copyright":
      "समाज की ओर छोटे योगदान के साथ किसानों की सहायता करना।",

    auth: {
      sign_in_title: "साइन इन करें",
      welcome: "स्वागत है, किसान!",
      email: "ईमेल पता",
      password: "पासवर्ड",
      sign_in: "साइन इन",
      or: "या",
      continue_google: "Google के साथ जारी रखें",
      new_to: "नए हैं",
      create_account: "खाता बनाएँ",
      back_home: "मुख्य पृष्ठ पर लौटें",
    },
    units: { perKg: "प्रति किग्रा", perKgDay: "प्रति किग्रा/दिन", l: "ली" },

    cropDiag: {
      title: "फसल रोग निदान",
      subtitle: "तुरंत निदान के लिए अपनी फसल की फोटो अपलोड करें",
      dropPrompt: "फोटो अपलोड करें या कैमरा खोलें",
      cta: "फोटो लें / इमेज अपलोड करें",
    },

    market: {
      title: "बाज़ार भाव",
      search: "माल खोजें…",
      alertTitle: "मूल्य चेतावनी",
      alertMsg: "पिछले सप्ताह में सेम के दाम 15% बढ़े हैं।",
    },

    schemes: {
      title: "सरकारी योजनाएँ",
      subtitle: "कृषि अनुदान और योजनाओं के लिए आवेदन करें",
      search: "योजनाएँ खोजें…",
      filterAll: "सभी",
      eligibility: "पात्रता",
      benefits: "लाभ",
      applyOnline: "ऑनलाइन आवेदन",
      applyNow: "अभी आवेदन करें",
    },

    restaurant: {
      title: "रेस्तरां कनेक्ट",
      subtitle:
        "थोक ऑर्डर के लिए सीधे रेस्तरां और खाद्य शृंखलाओं से जुड़ें",
      requirements: "आवश्यकताएँ",
      connect: "कनेक्ट",
    },

    cold: {
      title: "कोल्ड स्टोरेज सुविधाएँ",
      subtitle: "अपनी उपज के लिए कोल्ड स्टोरेज बुक करें",
      facilities: "सुविधाएँ",
      goodAvailability: "उपलब्धता अच्छी है",
      bookNow: "बुक करें",
    },

    predictor: {
      title: "मार्केट प्रेडिक्टर",
      subtitle: "एआई आधारित मूल्य पूर्वानुमान",
      timeframe: "अवधि",
      optimalStrategy: "उत्तम रणनीति",
      hold: "बेहतर रिटर्न के लिए 2–3 सप्ताह होल्ड करें",
      bestSellDate: "श्रेष्ठ बिक्री तिथि",
      confidence: "विश्वास स्तर",
      next7: "अगले 7 दिन",
      next30: "अगले 30 दिन",
      keyFactors: "मुख्य बाज़ार कारक",
      seriesPrice: "अनुमानित मूल्य (₹/किग्रा)",
      seriesConf: "विश्वास (%)",
    },

    health: {
      title: "फसल स्वास्थ्य मॉनिटर",
      subtitle: "रियल-टाइम सैटेलाइट और ड्रोन विश्लेषण",
      aiScan: "एआई स्कैन",
      yourFields: "आपके खेत",
      cropType: "फसल प्रकार",
      growthStage: "विकास चरण",
      predictedYield: "अनुमानित उपज",
      expectedHarvest: "अपेक्षित कटाई",
      cropIssues: "फसल समस्याएँ",
      recommendations: "सुझाव",
    },

    drone: {
      title: "ड्रोन मॉनिटरिंग सिस्टम",
      subtitle: "रियल-टाइम हवाई निगरानी",
      activeDrone: "सक्रिय ड्रोन",
      liveFeed: "लाइव फ़ीड",
      launch: "ड्रोन लॉन्च करें",
      recentFindings: "नवीनतम निष्कर्ष",
    },

    irrigation: {
      title: "स्मार्ट सिंचाई नियंत्रण",
      subtitle: "सटीक पानी वितरण प्रणाली",
      autoMode: "ऑटो मोड",
      todayUsage: "आज की खपत",
      thisWeek: "इस सप्ताह",
      waterSaved: "बचा पानी",
      zones: "सिंचाई ज़ोन",
      nextSchedule: "अगला समय",
      efficiency: "दक्षता",
      farmingReco: "कृषि अनुशंसा",
    },

    weatherX: {
      title: "मौसम विश्लेषण",
      subtitle: "उपग्रह आधारित सटीक मौसम विश्लेषण",
      temp: "तापमान",
      humidity: "आर्द्रता",
      rainfall: "वर्षा",
      wind: "पवन गति",
      uv: "यूवी सूचकांक",
      soil: "मृदा नमी",
      forecast5: "5-दिवसीय पूर्वानुमान",
      recos: "खेती संबंधी सुझाव",
    },

    trace: {
      title: "ब्लॉकचेन ट्रेसेबिलिटी",
      subtitle:
        "अपरिवर्तनीय रिकॉर्ड के साथ खेत से थाली तक पूर्ण पारदर्शिता",
      productLabel: "ऑर्गेनिक टमाटर",
      batch: "बैच",
      showQr: "क्यूआर कोड दिखाएँ",
      farmerDetails: "किसान विवरण",
      sustainabilityScore: "Farmculture स्थिरता स्कोर",
      certificates: "प्रमाणपत्र",
      certList: {
        organic: "ऑर्गेनिक प्रमाणपत्र",
        quality: "गुणवत्ता आश्वासन",
        coldChain: "कोल्ड-चेन अनुपालन",
      },
      delivery: "डिलीवरी",
      stages: {
        planting: "रोपाई",
        harvesting: "कटाई",
        processing: "प्रोसेसिंग",
        transportation: "परिवहन",
        retail: "खुदरा",
      },
      fields: {
        location: "स्थान",
        handler: "हैंडलर",
        quality: "गुणवत्ता",
        temperature: "तापमान",
      },
      status: {
        current: "वर्तमान स्थिति: खरीद हेतु उपलब्ध",
        verifiedLine:
          "सभी चरण ब्लॉकचेन पर सत्यापित। पूर्ण पारदर्शिता की गारंटी।",
      },
      tags: {
        organic: "ऑर्गेनिक",
        fairTrade: "फेयर ट्रेड",
        sustainable: "सस्टेनेबल",
      },
    },
  },

  ta: {
    brand: "பண்ணைவளர்",
    brand_tagline: "உங்கள் நண்பன் வேளாண் உதவியாளர்",
    welcome: "பண்ணைவளர் வரவேற்கிறோம்",
    subtitle: "உலகின் மிகப்பெரிய வேளாண் வலை",
    tagline: "புதிய நுண்ணறிவால் விவசாயிகளுக்கு வலு",

    agriculture_tools: "வேளாண் கருவிகள்",
    crop_diagnosis: "பயிர் நோய் கண்டறிதல்",
    crop_diagnosis_desc: "உடனடி AI அடையாளம்",
    market_prices: "சந்தை விலை",
    market_prices_desc: "நேரடி பொருள் விலை கண்காணிப்பு",
    govt_schemes: "அரசுத் திட்டங்கள்",
    govt_schemes_desc: "உதவித்தொகை மற்றும் ஆதரவு",
    voice_assistant: "குரல் உதவியாளர்",
    voice_assistant_desc: "உங்கள் மொழியில் கைமற்ற உதவி",
    restaurants: "உணவகங்கள்",
    restaurants_desc: "பொருட்களை நேரடியாக வாங்குபவர்களுடன் இணை",
    cold_storage: "குளிர் கிடங்கு",
    cold_storage_desc: "குளிர்சங்கிலி கண்காணிப்பு",

    advanced_features: "மேம்பட்ட அம்சங்கள்",
    market_predictor: "சந்தை முன்னறிவு",
    market_predictor_desc: "சிறந்த விற்பனை முடிவுகளுக்கான கணிப்பு",
    crop_health_monitor: "பயிர் ஆரோக்கிய கண்காணிப்பு",
    crop_health_monitor_desc: "செயற்கைக்கோள்/சென்சார் பகுப்பாய்வு",
    drone_monitoring: "ட்ரோன் கண்காணிப்பு",
    drone_monitoring_desc: "துல்லிய வேளாண்மைக்கான விமானப் படம்",
    smart_irrigation: "ஸ்மார்ட் நீர்ப்பாசனம்",
    smart_irrigation_desc: "நீர்செலவை குறைக்கும் தானியங்கி பாசனம்",
    weather_insights: "வானிலை பார்வைகள்",
    weather_insights_desc: "உள்ளூர் வானிலை எச்சரிக்கைகள்",
    blockchain_traceability: "பிளாக்செயின் கண்காணிப்பு",
    blockchain_traceability_desc: "முற்றிலும் பின்தொடர்தன்மை",

    farmers_helped: "100,000+",
    farmers_helped_label: "உதவி பெற்ற விவசாயிகள்",
    diagnosis_accuracy: "98.5%",
    diagnosis_accuracy_label: "கண்டறிதல் துல்லியம்",
    support_system: "24/7",
    support_system_label: "ஆதரவு அமைப்பு",
    farmer_income_increased: "2.5 மில்லியன்",
    farmer_income_increased_label: "வருமான உயர்வு",

    revolutionary_agriculture: "புதுமையான வேளாண்மை",
    market_prediction: "சந்தை கணிப்பு",
    satellite_monitoring: "செயற்கைக்கோள் கண்காணிப்பு",
    blockchain_transparency: "பிளாக்செயின் வெளிப்படைமை",

    backToHome: "முகப்புக்கு திரும்ப",

    "footer.brand": "பண்ணைவளர்",
    "footer.tagline":
      "ஏஐ & பிளாக்செயின் கண்காணிப்பால் வேளாண்மையில் புரட்சி",
    "footer.poweredBy": "இயக்குவது",
    "footer.technologies": "தொழில்நுட்பங்கள்",
    "footer.copyright":
      "சமூகத்திற்கு சிறிய பங்களிப்புடன் விவசாயிகளுக்கு உதவுகிறோம்.",

    auth: {
      sign_in_title: "உள்நுழைய",
      welcome: "மீண்டும் வருக, விவசாயியே!",
      email: "மின்னஞ்சல் முகவரி",
      password: "கடவுச்சொல்",
      sign_in: "உள்நுழை",
      or: "அல்லது",
      continue_google: "Google மூலம் தொடரவும்",
      new_to: "புதியவரா",
      create_account: "கணக்கு உருவாக்கு",
      back_home: "முகப்புக்குத் திரும்ப",
    },
    units: { perKg: "கி.கி.க்கு", perKgDay: "கி.கி./நாள்", l: "லிட்டர்" },

    cropDiag: {
      title: "பயிர் நோய் கண்டறிதல்",
      subtitle:
        "உடனடி கண்டறிதலுக்குப் புகைப்படத்தைப் பதிவேற்றவும்",
      dropPrompt: "படத்தைப் பதிவேற்ற அல்லது படம் எடுக்க கிளிக் செய்யவும்",
      cta: "புகைப்படம் எடு / பதிவேற்று",
    },

    market: {
      title: "சந்தை விலைகள்",
      search: "பொருளைத் தேடுக…",
      alertTitle: "விலை எச்சரிக்கை",
      alertMsg:
        "கடந்த வாரத்தில் பயத்தம் விலை 15% உயர்ந்துள்ளது.",
    },

    schemes: {
      title: "அரசு திட்டங்கள்",
      subtitle: "விவசாய திட்டங்களுக்கு விண்ணப்பிக்கவும்",
      search: "திட்டங்களைத் தேடுக…",
      filterAll: "அனைத்தும்",
      eligibility: "தகுதி",
      benefits: "பலன்கள்",
      applyOnline: "ஆன்லைனில் விண்ணப்பிக்கவும்",
      applyNow: "இப்போது விண்ணப்பிக்கவும்",
    },

    restaurant: {
      title: "உணவகம் இணை",
      subtitle: "தொகுதி ஆர்டர்களுக்கு நேரடி இணைப்பு",
      requirements: "தேவைகள்",
      connect: "இணைக்க",
    },

    cold: {
      title: "கோல்ட் ஸ்டோரேஜ் வசதிகள்",
      subtitle:
        "உற்பத்திக்காக குளிர்சாதன இடம் புக் செய்யவும்",
      facilities: "வசதிகள்",
      goodAvailability: "சிறந்த கிடைக்கை",
      bookNow: "புக் செய்யவும்",
    },

    predictor: {
      title: "சந்தை முன்னறிவிப்பு",
      subtitle: "AI விலை கணிப்பு",
      timeframe: "காலவரை",
      optimalStrategy: "சிறந்த திட்டம்",
      hold: "2–3 வாரம் வைத்திருங்கள்",
      bestSellDate: "சிறந்த விற்பனை தேதி",
      confidence: "நம்பிக்கை",
      next7: "அடுத்த 7 நாள்",
      next30: "அடுத்த 30 நாள்",
      keyFactors: "முக்கிய சந்தை காரகங்கள்",
      seriesPrice: "எதிர்பார்க்கும் விலை (₹/கி.கி.)",
      seriesConf: "நம்பிக்கை (%)",
    },

    health: {
      title: "பயிர் ஆரோக்கிய கண்காணிப்பு",
      subtitle: "நேரடி செயற்கைக்கோள்/ட்ரோன் பகுப்பாய்வு",
      aiScan: "ஏஐ ஸ்கேன்",
      yourFields: "உங்கள் வயல்கள்",
      cropType: "பயிர் வகை",
      growthStage: "வளர்ச்சி நிலை",
      predictedYield: "எதிர்பார்க்கும் விளைச்சல்",
      expectedHarvest: "எதிர்பார்க்கும் அறுவடை",
      cropIssues: "பயிர் சிக்கல்கள்",
      recommendations: "பரிந்துரைகள்",
    },

    drone: {
      title: "ட்ரோன் கண்காணிப்பு",
      subtitle: "நேரடி வான்வழி கண்காணிப்பு",
      activeDrone: "செயலில் ட்ரோன்",
      liveFeed: "நேரலை",
      launch: "ட்ரோன் தொடங்கு",
      recentFindings: "சமீபத்திய கண்டுபிடிப்புகள்",
    },

    irrigation: {
      title: "ஸ்மார்ட் பாசனம்",
      subtitle: "துல்லியமான நீர்ப்பாசனம்",
      autoMode: "ஆட்டோ மோடு",
      todayUsage: "இன்றைய பயன்பாடு",
      thisWeek: "இந்த வாரம்",
      waterSaved: "சேமிக்கப்பட்டது",
      zones: "பாசன மண்டலங்கள்",
      nextSchedule: "அடுத்த அட்டவணை",
      efficiency: "திறன்",
      farmingReco: "விவசாய பரிந்துரைகள்",
    },

    weatherX: {
      title: "வானிலை தகவல்கள்",
      subtitle: "செயற்கைக்கோள் ஆதரித்த ஆய்வு",
      temp: "வெப்பநிலை",
      humidity: "ஈரப்பதம்",
      rainfall: "மழை",
      wind: "காற்றின் வேகம்",
      uv: "யூவி குறியீடு",
      soil: "மண் ஈரப்பதம்",
      forecast5: "5 நாள் முன்னறிவிப்பு",
      recos: "பயிர் பரிந்துரைகள்",
    },

    trace: {
      title: "ப்ளாக்செயின் தடயத்தன்மை",
      subtitle:
        "மாற்றமறுக்கும் பதிவுகளுடன் பண்ணையிலிருந்து தட்டுக்கு முழு வெளிப்படைமை",
      productLabel: "ஆர்கானிக் தக்காளி",
      batch: "தொகுதி",
      showQr: "QR குறியீட்டை காண்",
      farmerDetails: "விவசாயி விவரங்கள்",
      sustainabilityScore: "Farmculture நிலைத்தன்மை மதிப்பெண்",
      certificates: "சான்றிதழ்கள்",
      certList: {
        organic: "ஆர்கானிக் சான்றிதழ்",
        quality: "தர உறுதி",
        coldChain: "கோல்ட்சேன் இணக்கம்",
      },
      delivery: "டெலிவரி",
      stages: {
        planting: "நடவு",
        harvesting: "அறுவடை",
        processing: "செயலாக்கம்",
        transportation: "போக்குவரத்து",
        retail: "சில்லறை",
      },
      fields: {
        location: "இடம்",
        handler: "பொறுப்பாளர்",
        quality: "தரம்",
        temperature: "வெப்பநிலை",
      },
      status: {
        current: "நிலை: வாங்கக் கிடைக்கிறது",
        verifiedLine:
          "அனைத்து கட்டங்களும் ப்ளாக்செயினில் சரிபார்க்கப்பட்டது. முழு வெளிப்படைமை உறுதி.",
      },
      tags: {
        organic: "ஆர்கானிக்",
        fairTrade: "நேர்மை வாணிபம்",
        sustainable: "நிலைத்தன்மை",
      },
    },
  },

  de: {
    brand: "Bauernkultur",
    brand_tagline: "Ihr freundlicher Landwirtschaftsassistent",
    welcome: "Willkommen bei Bauernkultur",
    subtitle: "Größtes Agrarnetzwerk der Welt",
    tagline: "Mit modernster Intelligenz Bauern stärken",

    agriculture_tools: "Landwirtschaftliche Tools",
    crop_diagnosis: "Pflanzendiagnose",
    crop_diagnosis_desc: "Sofortige KI-Erkennung",
    market_prices: "Marktpreise",
    market_prices_desc: "Preise in Echtzeit",
    govt_schemes: "Regierungsprogramme",
    govt_schemes_desc: "Zuschüsse & Förderung",
    voice_assistant: "Sprachassistent",
    voice_assistant_desc: "Freihändige Hilfe",
    restaurants: "Restaurants",
    restaurants_desc: "Direkt mit Käufern verbinden",
    cold_storage: "Kühllager",
    cold_storage_desc: "Kühlkette überwachen",

    advanced_features: "Erweiterte Funktionen",
    market_predictor: "Marktprognose",
    market_predictor_desc: "Bessere Verkaufsentscheidungen",
    crop_health_monitor: "Pflanzengesundheit",
    crop_health_monitor_desc: "Satellit/Sensor-Analyse",
    drone_monitoring: "Drohnenüberwachung",
    drone_monitoring_desc: "Luftbilder für Präzision",
    smart_irrigation: "Intelligente Bewässerung",
    smart_irrigation_desc: "Wasser-sparende Automatik",
    weather_insights: "Wettereinblicke",
    weather_insights_desc: "Hyperlokale Warnungen",
    blockchain_traceability: "Blockchain-Rückverfolgbarkeit",
    blockchain_traceability_desc: "Transparente Lieferkette",

    farmers_helped: "100.000",
    farmers_helped_label: "Geholfene Landwirte",
    diagnosis_accuracy: "98,5 %",
    diagnosis_accuracy_label: "Diagnosegenauigkeit",
    support_system: "24/7",
    support_system_label: "Support-System",
    farmer_income_increased: "2,5 Millionen",
    farmer_income_increased_label: "Einkommen gesteigert",

    revolutionary_agriculture: "Revolutionäre Landwirtschaft",
    market_prediction: "Marktprognose",
    satellite_monitoring: "Satellitenüberwachung",
    blockchain_transparency: "Blockchain-Transparenz",

    backToHome: "Zur Startseite",

    "footer.brand": "Bauernkultur",
    "footer.tagline":
      "Landwirtschaft revolutionieren mit KI & Blockchain-Nachverfolgbarkeit",
    "footer.poweredBy": "Bereitgestellt von",
    "footer.technologies": "Technologien",
    "footer.copyright":
      "Unterstützt Landwirte mit einem kleinen Beitrag für die Gesellschaft.",

    auth: {
      sign_in_title: "Anmelden bei",
      welcome: "Willkommen zurück, Landwirt!",
      email: "E-Mail-Adresse",
      password: "Passwort",
      sign_in: "Anmelden",
      or: "ODER",
      continue_google: "Mit Google fortfahren",
      new_to: "Neu bei",
      create_account: "Konto erstellen",
      back_home: "Zur Startseite",
    },
    units: { perKg: "pro kg", perKgDay: "pro kg/Tag", l: "L" },

    cropDiag: {
      title: "Pflanzenkrankheiten-Diagnose",
      subtitle:
        "Laden Sie ein Foto Ihrer Kultur hoch, um sofort eine Diagnose zu erhalten",
      dropPrompt: "Zum Hochladen klicken oder Foto aufnehmen",
      cta: "Foto aufnehmen / Bild hochladen",
    },
    market: {
      title: "Marktpreise",
      search: "Ware suchen…",
      alertTitle: "Preiswarnung",
      alertMsg: "Bohnenpreise stiegen in der letzten Woche um 15%.",
    },
    schemes: {
      title: "Regierungsprogramme",
      subtitle: "Für landwirtschaftliche Zuschüsse und Programme bewerben",
      search: "Programme suchen…",
      filterAll: "Alle",
      eligibility: "Berechtigung",
      benefits: "Leistungen",
      applyOnline: "Online bewerben",
      applyNow: "Jetzt bewerben",
    },
    restaurant: {
      title: "Restaurant-Connect",
      subtitle:
        "Direkter Kontakt zu Restaurants und Ketten für Großbestellungen",
      requirements: "Anforderungen",
      connect: "Verbinden",
    },
    cold: {
      title: "Kühllager",
      subtitle: "Kühlraum für Ihre Ernte finden und buchen",
      facilities: "Einrichtungen",
      goodAvailability: "Gute Verfügbarkeit",
      bookNow: "Jetzt buchen",
    },
    predictor: {
      title: "Marktprognose",
      subtitle: "Preisprognosen mit Machine Learning",
      timeframe: "Zeitraum",
      optimalStrategy: "Optimale Strategie",
      hold: "2–3 Wochen halten",
      bestSellDate: "Bester Verkaufstermin",
      confidence: "Sicherheit",
      next7: "Nächste 7 Tage",
      next30: "Nächste 30 Tage",
      keyFactors: "Wichtige Markt­faktoren",
      seriesPrice: "Prognosepreis (₹/kg)",
      seriesConf: "Sicherheit (%)",
    },
    health: {
      title: "Pflanzengesundheitsmonitor",
      subtitle: "Satelliten- und Drohnenanalyse in Echtzeit",
      aiScan: "KI-Scan",
      yourFields: "Ihre Felder",
      cropType: "Kulturart",
      growthStage: "Wachstumsphase",
      predictedYield: "Erwarteter Ertrag",
      expectedHarvest: "Erwartete Ernte",
      cropIssues: "Probleme",
      recommendations: "Empfehlungen",
    },
    drone: {
      title: "Drohnenüberwachung",
      subtitle: "Luftüberwachung und Feldkontrolle in Echtzeit",
      activeDrone: "Aktive Drohne",
      liveFeed: "Live-Feed",
      launch: "Drohne starten",
      recentFindings: "Jüngste Erkenntnisse",
    },
    irrigation: {
      title: "Intelligente Bewässerung",
      subtitle: "Präzisionsbewässerung",
      autoMode: "Auto-Modus",
      todayUsage: "Heutiger Verbrauch",
      thisWeek: "Diese Woche",
      waterSaved: "Wasser gespart",
      zones: "Bewässerungszonen",
      nextSchedule: "Nächster Termin",
      efficiency: "Effizienz",
      farmingReco: "Empfehlungen",
    },
    weatherX: {
      title: "Wettereinblicke",
      subtitle: "Satellitengestützte Agrar-Wetteranalyse",
      temp: "Temperatur",
      humidity: "Luftfeuchte",
      rainfall: "Niederschlag",
      wind: "Windgeschwindigkeit",
      uv: "UV-Index",
      soil: "Bodenfeuchte",
      forecast5: "5-Tage-Prognose",
      recos: "Empfehlungen",
    },

    trace: {
      title: "Blockchain-Nachverfolgbarkeit",
      subtitle:
        "Vollständige Transparenz vom Hof bis zum Teller mit unveränderlichen Aufzeichnungen",
      productLabel: "Bio-Tomaten",
      batch: "Charge",
      showQr: "QR-Code anzeigen",
      farmerDetails: "Landwirt-Details",
      sustainabilityScore: "Farmculture-Nachhaltigkeitsscore",
      certificates: "Zertifikate",
      certList: {
        organic: "Bio-Zertifikat",
        quality: "Qualitätssicherung",
        coldChain: "Kühlketten-Compliance",
      },
      delivery: "Lieferkette",
      stages: {
        planting: "Aussaat",
        harvesting: "Ernte",
        processing: "Verarbeitung",
        transportation: "Transport",
        retail: "Einzelhandel",
      },
      fields: {
        location: "Standort",
        handler: "Verantwortlich",
        quality: "Qualität",
        temperature: "Temperatur",
      },
      status: {
        current: "Aktueller Status: Zum Kauf verfügbar",
        verifiedLine:
          "Alle Stufen auf der Blockchain verifiziert. Vollständige Transparenz garantiert.",
      },
      tags: {
        organic: "Bio",
        fairTrade: "Fair Trade",
        sustainable: "Nachhaltig",
      },
    },
  },

  pl: {
    brand: "Kultura rolna",
    brand_tagline: "Przyjazny asystent rolniczy",
    welcome: "Witamy w Kulturze rolnej",
    subtitle: "Największa sieć rolnicza na świecie",
    tagline: "Wspieramy rolników nowoczesną inteligencją",

    agriculture_tools: "Narzędzia rolnicze",
    crop_diagnosis: "Diagnostyka upraw",
    crop_diagnosis_desc: "Natychmiastowa detekcja chorób",
    market_prices: "Ceny rynkowe",
    market_prices_desc: "Śledzenie cen w czasie rzeczywistym",
    govt_schemes: "Programy rządowe",
    govt_schemes_desc: "Dotacje i wsparcie",
    voice_assistant: "Asystent głosowy",
    voice_assistant_desc: "Pomoc w Twoim języku",
    restaurants: "Restauracje",
    restaurants_desc: "Łącz produkty bezpośrednio z kupującymi",
    cold_storage: "Chłodnia",
    cold_storage_desc: "Zarządzanie łańcuchem chłodniczym",

    advanced_features: "Zaawansowane funkcje",
    market_predictor: "Prognoza rynku",
    market_predictor_desc: "Lepsze decyzje sprzedażowe",
    crop_health_monitor: "Monitor zdrowia upraw",
    crop_health_monitor_desc: "Analiza satelitarna/czujnikowa",
    drone_monitoring: "Monitoring dronem",
    drone_monitoring_desc: "Obrazowanie lotnicze",
    smart_irrigation: "Inteligentne nawadnianie",
    smart_irrigation_desc: "Automatyczne oszczędzanie wody",
    weather_insights: "Informacje pogodowe",
    weather_insights_desc: "Lokalne alerty pogodowe",
    blockchain_traceability: "Śledzenie blockchain",
    blockchain_traceability_desc: "Przejrzysty łańcuch dostaw",

    farmers_helped: "100 000",
    farmers_helped_label: "Rolnicy objęci pomocą",
    diagnosis_accuracy: "98,5%",
    diagnosis_accuracy_label: "Dokładność diagnozy",
    support_system: "24/7",
    support_system_label: "System wsparcia",
    farmer_income_increased: "2,5 mln",
    farmer_income_increased_label: "Wzrost dochodów",

    revolutionary_agriculture: "Rewolucyjne rolnictwo",
    market_prediction: "Prognoza rynku",
    satellite_monitoring: "Monitoring satelitarny",
    blockchain_transparency: "Przejrzystość blockchainu",

    backToHome: "Powrót do strony głównej",

    "footer.brand": "Kultura rolna",
    "footer.tagline":
      "Rewolucja w rolnictwie dzięki AI i śledzeniu blockchain",
    "footer.poweredBy": "Zasilane przez",
    "footer.technologies": "Technologie",
    "footer.copyright":
      "Wspieramy rolników małym wkładem dla społeczeństwa.",

    auth: {
      sign_in_title: "Zaloguj się do",
      welcome: "Witaj ponownie, rolniku!",
      email: "Adres e-mail",
      password: "Hasło",
      sign_in: "Zaloguj się",
      or: "LUB",
      continue_google: "Kontynuuj z Google",
      new_to: "Nowy w",
      create_account: "Utwórz konto",
      back_home: "Wróć do strony głównej",
    },
    units: { perKg: "za kg", perKgDay: "za kg/dzień", l: "L" },

    cropDiag: {
      title: "Diagnostyka chorób roślin",
      subtitle:
        "Prześlij zdjęcie uprawy, aby otrzymać natychmiastową diagnozę",
      dropPrompt: "Kliknij, aby przesłać lub zrobić zdjęcie",
      cta: "Zrób zdjęcie / Prześlij obraz",
    },
    market: {
      title: "Ceny rynkowe",
      search: "Szukaj towaru…",
      alertTitle: "Alert cenowy",
      alertMsg: "Ceny fasoli wzrosły w ostatnim tygodniu o 15%.",
    },
    schemes: {
      title: "Programy rządowe",
      subtitle:
        "Wyszukaj i złóż wnioski o dopłaty i programy",
      search: "Szukaj programów…",
      filterAll: "Wszystko",
      eligibility: "Kryteria",
      benefits: "Korzyści",
      applyOnline: "Aplikuj online",
      applyNow: "Aplikuj teraz",
    },
    restaurant: {
      title: "Połączenie z restauracjami",
      subtitle:
        "Bezpośredni kontakt z restauracjami i sieciami dla zamówień hurtowych",
      requirements: "Wymagania",
      connect: "Połącz",
    },
    cold: {
      title: "Chłodnie",
      subtitle: "Znajdź i zarezerwuj miejsce w chłodni",
      facilities: "Udogodnienia",
      goodAvailability: "Dobra dostępność",
      bookNow: "Rezerwuj",
    },
    predictor: {
      title: "Prognoza rynku",
      subtitle: "Prognozowanie cen (ML)",
      timeframe: "Okres",
      optimalStrategy: "Strategia optymalna",
      hold: "Trzymaj 2–3 tygodnie",
      bestSellDate: "Najlepsza data sprzedaży",
      confidence: "Pewność",
      next7: "Najbliższe 7 dni",
      next30: "Najbliższe 30 dni",
      keyFactors: "Kluczowe czynniki",
      seriesPrice: "Cena prognozowana (₹/kg)",
      seriesConf: "Pewność (%)",
    },
    health: {
      title: "Monitor stanu upraw",
      subtitle: "Analiza satelitarna i dronowa",
      aiScan: "Skan AI",
      yourFields: "Twoje pola",
      cropType: "Rodzaj uprawy",
      growthStage: "Faza wzrostu",
      predictedYield: "Przewidywany plon",
      expectedHarvest: "Spodziewane zbiory",
      cropIssues: "Problemy",
      recommendations: "Rekomendacje",
    },
    drone: {
      title: "Monitoring dronem",
      subtitle: "Nadzór powietrzny w czasie rzeczywistym",
      activeDrone: "Aktywny dron",
      liveFeed: "Transmisja",
      launch: "Uruchom drona",
      recentFindings: "Ostatnie ustalenia",
    },
    irrigation: {
      title: "Inteligentne nawadnianie",
      subtitle: "Precyzyjne podlewanie",
      autoMode: "Tryb auto",
      todayUsage: "Dzisiejsze zużycie",
      thisWeek: "Ten tydzień",
      waterSaved: "Zaoszczędzona woda",
      zones: "Strefy nawadniania",
      nextSchedule: "Następny termin",
      efficiency: "Wydajność",
      farmingReco: "Zalecenia",
    },
    weatherX: {
      title: "Informacje pogodowe",
      subtitle: "Dokładna analiza pogody (satelity)",
      temp: "Temperatura",
      humidity: "Wilgotność",
      rainfall: "Opady",
      wind: "Wiatr",
      uv: "Indeks UV",
      soil: "Wilgotność gleby",
      forecast5: "Prognoza 5-dniowa",
      recos: "Zalecenia rolnicze",
    },

    trace: {
      title: "Śledzenie w blockchainie",
      subtitle:
        "Pełna przejrzystość od gospodarstwa do stołu dzięki niezmiennym zapisom",
      productLabel: "Pomidory ekologiczne",
      batch: "Partia",
      showQr: "Pokaż kod QR",
      farmerDetails: "Dane rolnika",
      sustainabilityScore:
        "Wynik zrównoważenia Farmculture",
      certificates: "Certyfikaty",
      certList: {
        organic: "Certyfikat ekologiczny",
        quality: "Gwarancja jakości",
        coldChain: "Zgodność łańcucha chłodniczego",
      },
      delivery: "Dostawa",
      stages: {
        planting: "Siew",
        harvesting: "Zbiór",
        processing: "Przetwarzanie",
        transportation: "Transport",
        retail: "Detal",
      },
      fields: {
        location: "Lokalizacja",
        handler: "Obsługa",
        quality: "Jakość",
        temperature: "Temperatura",
      },
      status: {
        current: "Status: Dostępne do zakupu",
        verifiedLine:
          "Wszystkie etapy zweryfikowane w blockchainie. Gwarantowana pełna przejrzystość.",
      },
      tags: {
        organic: "Eko",
        fairTrade: "Fair Trade",
        sustainable: "Zrównoważone",
      },
    },
  },

  fr: {
    brand: "Culture agricole",
    brand_tagline: "Votre sympathique assistant agricole",
    welcome: "Bienvenue chez Culture agricole",
    subtitle: "Le plus grand réseau agricole au monde",
    tagline: "Donner aux agriculteurs une intelligence de pointe",

    agriculture_tools: "Outils agricoles",
    crop_diagnosis: "Diagnostic des cultures",
    crop_diagnosis_desc: "Détection instantanée par IA",
    market_prices: "Prix du marché",
    market_prices_desc: "Suivi en temps réel",
    govt_schemes: "Programmes gouvernementaux",
    govt_schemes_desc: "Subventions et aides",
    voice_assistant: "Assistant vocal",
    voice_assistant_desc: "Aide mains libres",
    restaurants: "Restaurants",
    restaurants_desc: "Relier les produits aux acheteurs",
    cold_storage: "Entrepôt frigorifique",
    cold_storage_desc: "Gérer la chaîne du froid",

    advanced_features: "Fonctionnalités avancées",
    market_predictor: "Prédicteur de marché",
    market_predictor_desc: "Meilleures décisions de vente",
    crop_health_monitor: "Surveillance de la santé des cultures",
    crop_health_monitor_desc: "Analyse satellite/capteurs",
    drone_monitoring: "Surveillance par drone",
    drone_monitoring_desc: "Imagerie aérienne",
    smart_irrigation: "Irrigation intelligente",
    smart_irrigation_desc: "Arrosage automatisé économe",
    weather_insights: "Informations météo",
    weather_insights_desc: "Alertes hyperlocales",
    blockchain_traceability: "Traçabilité blockchain",
    blockchain_traceability_desc: "Chaîne d’approvisionnement traçable",

    farmers_helped: "100 000",
    farmers_helped_label: "Agriculteurs aidés",
    diagnosis_accuracy: "98,5 %",
    diagnosis_accuracy_label: "Précision du diagnostic",
    support_system: "24/7",
    support_system_label: "Assistance",
    farmer_income_increased: "2,5 millions",
    farmer_income_increased_label: "Revenu accru",

    revolutionary_agriculture: "Agriculture révolutionnaire",
    market_prediction: "Prévision du marché",
    satellite_monitoring: "Surveillance satellite",
    blockchain_transparency: "Transparence blockchain",

    backToHome: "Retour à l’accueil",

    "footer.brand": "Culture agricole",
    "footer.tagline":
      "Révolutionner l’agriculture avec l’IA et la traçabilité blockchain",
    "footer.poweredBy": "Propulsé par",
    "footer.technologies": "Technologies",
    "footer.copyright":
      "Aider les agriculteurs par une petite contribution à la société.",

    auth: {
      sign_in_title: "Se connecter à",
      welcome: "Bon retour, agriculteur !",
      email: "Adresse e-mail",
      password: "Mot de passe",
      sign_in: "Se connecter",
      or: "OU",
      continue_google: "Continuer avec Google",
      new_to: "Nouveau sur",
      create_account: "Créer un compte",
      back_home: "Retour à l’accueil",
    },
    units: { perKg: "par kg", perKgDay: "par kg/jour", l: "L" },

    cropDiag: {
      title: "Diagnostic des maladies des cultures",
      subtitle:
        "Téléversez une photo de votre culture pour un diagnostic instantané",
      dropPrompt:
        "Cliquez pour téléverser ou prendre une photo",
      cta: "Prendre une photo / Téléverser",
    },
    market: {
      title: "Prix du marché",
      search: "Rechercher une denrée…",
      alertTitle: "Alerte prix",
      alertMsg:
        "Le prix des haricots a augmenté de 15% la semaine dernière.",
    },
    schemes: {
      title: "Programmes gouvernementaux",
      subtitle:
        "Trouvez et postulez aux subventions et programmes agricoles",
      search: "Rechercher des programmes…",
      filterAll: "Tous",
      eligibility: "Éligibilité",
      benefits: "Avantages",
      applyOnline: "Postuler en ligne",
      applyNow: "Postuler maintenant",
    },
    restaurant: {
      title: "Connexion Restaurants",
      subtitle:
        "Connexion directe avec les restaurants et chaînes pour les commandes en gros",
      requirements: "Exigences",
      connect: "Connecter",
    },
    cold: {
      title: "Entrepôts frigorifiques",
      subtitle:
        "Trouvez et réservez un espace de chaîne du froid",
      facilities: "Installations",
      goodAvailability: "Bonne disponibilité",
      bookNow: "Réserver",
    },
    predictor: {
      title: "Prédicteur de marché",
      subtitle:
        "Prévision de prix par apprentissage automatique",
      timeframe: "Période",
      optimalStrategy: "Stratégie optimale",
      hold: "Conserver 2–3 semaines",
      bestSellDate: "Meilleure date de vente",
      confidence: "Confiance",
      next7: "7 prochains jours",
      next30: "30 prochains jours",
      keyFactors: "Facteurs clés",
      seriesPrice: "Prix prévu (₹/kg)",
      seriesConf: "Confiance (%)",
    },
    health: {
      title: "Surveillance de la santé des cultures",
      subtitle:
        "Analyse par satellite et drone en temps réel",
      aiScan: "Scan IA",
      yourFields: "Vos champs",
      cropType: "Type de culture",
      growthStage: "Stade de croissance",
      predictedYield: "Rendement prévu",
      expectedHarvest: "Récolte prévue",
      cropIssues: "Problèmes",
      recommendations: "Recommandations",
    },
    drone: {
      title: "Surveillance par drone",
      subtitle: "Surveillance aérienne en temps réel",
      activeDrone: "Drone actif",
      liveFeed: "Flux en direct",
      launch: "Lancer le drone",
      recentFindings: "Conclusions récentes",
    },
    irrigation: {
      title: "Irrigation intelligente",
      subtitle: "Arrosage de précision",
      autoMode: "Mode auto",
      todayUsage: "Consommation du jour",
      thisWeek: "Cette semaine",
      waterSaved: "Eau économisée",
      zones: "Zones d’irrigation",
      nextSchedule: "Prochaine planification",
      efficiency: "Efficacité",
      farmingReco: "Recommandations agricoles",
    },
    weatherX: {
      title: "Informations météo",
      subtitle:
        "Analyse météo de précision basée sur satellite",
      temp: "Température",
      humidity: "Humidité",
      rainfall: "Précipitations",
      wind: "Vitesse du vent",
      uv: "Indice UV",
      soil: "Humidité du sol",
      forecast5: "Prévisions sur 5 jours",
      recos: "Recommandations",
    },

    trace: {
      title: "Traçabilité blockchain",
      subtitle:
        "Transparence totale du champ à l’assiette avec des enregistrements immuables",
      productLabel: "Tomates bio",
      batch: "Lot",
      showQr: "Afficher le QR code",
      farmerDetails: "Détails agriculteur",
      sustainabilityScore:
        "Score de durabilité Farmculture",
      certificates: "Certificats",
      certList: {
        organic: "Certificat biologique",
        quality: "Assurance qualité",
        coldChain: "Conformité chaîne du froid",
      },
      delivery: "Chaîne logistique",
      stages: {
        planting: "Semis",
        harvesting: "Récolte",
        processing: "Transformation",
        transportation: "Transport",
        retail: "Vente au détail",
      },
      fields: {
        location: "Lieu",
        handler: "Responsable",
        quality: "Qualité",
        temperature: "Température",
      },
      status: {
        current: "Statut : Disponible à l’achat",
        verifiedLine:
          "Toutes les étapes vérifiées sur la blockchain. Transparence totale garantie.",
      },
      tags: {
        organic: "Bio",
        fairTrade: "Commerce équitable",
        sustainable: "Durable",
      },
    },
  },

  es: {
    brand: "Cultura agrícola",
    brand_tagline: "Su amable asistente agrícola",
    welcome: "Bienvenido a Cultura agrícola",
    subtitle: "La red agrícola más grande del mundo",
    tagline: "Empoderando a los agricultores con tecnología de punta",

    agriculture_tools: "Herramientas agrícolas",
    crop_diagnosis: "Diagnóstico de cultivos",
    crop_diagnosis_desc: "Detección instantánea con IA",
    market_prices: "Precios de mercado",
    market_prices_desc: "Seguimiento en tiempo real",
    govt_schemes: "Planes gubernamentales",
    govt_schemes_desc: "Subsidios y programas de apoyo",
    voice_assistant: "Asistente de voz",
    voice_assistant_desc: "Ayuda manos libres",
    restaurants: "Restaurantes",
    restaurants_desc: "Conecta productos con compradores",
    cold_storage: "Almacén frigorífico",
    cold_storage_desc: "Cadena de frío bajo control",

    advanced_features: "Funciones avanzadas",
    market_predictor: "Predictor de mercado",
    market_predictor_desc: "Mejores decisiones de venta",
    crop_health_monitor: "Monitor de salud de cultivos",
    crop_health_monitor_desc: "Análisis satelital/sensores",
    drone_monitoring: "Monitoreo con drones",
    drone_monitoring_desc: "Imágenes aéreas",
    smart_irrigation: "Riego inteligente",
    smart_irrigation_desc: "Riego automático que ahorra agua",
    weather_insights: "Información meteorológica",
    weather_insights_desc: "Alertas hiperlocales",
    blockchain_traceability: "Trazabilidad blockchain",
    blockchain_traceability_desc: "Transparencia de extremo a extremo",

    farmers_helped: "100,000",
    farmers_helped_label: "Agricultores ayudados",
    diagnosis_accuracy: "98.5%",
    diagnosis_accuracy_label: "Precisión del diagnóstico",
    support_system: "24/7",
    support_system_label: "Sistema de soporte",
    farmer_income_increased: "2.5 millones",
    farmer_income_increased_label: "Ingresos incrementados",

    revolutionary_agriculture: "Agricultura revolucionaria",
    market_prediction: "Previsión de mercado",
    satellite_monitoring: "Monitoreo satelital",
    blockchain_transparency: "Transparencia blockchain",

    backToHome: "Volver al inicio",

    "footer.brand": "Cultura agrícola",
    "footer.tagline":
      "Revolucionando la agricultura con IA y trazabilidad blockchain",
    "footer.poweredBy": "Impulsado por",
    "footer.technologies": "Tecnologías",
    "footer.copyright":
      "Ayudando a los agricultores con una pequeña contribución a la sociedad.",

    auth: {
      sign_in_title: "Iniciar sesión en",
      welcome: "¡Bienvenido de nuevo, agricultor!",
      email: "Correo electrónico",
      password: "Contraseña",
      sign_in: "Iniciar sesión",
      or: "O",
      continue_google: "Continuar con Google",
      new_to: "¿Nuevo en",
      create_account: "Crear una cuenta",
      back_home: "Volver al inicio",
    },
    units: { perKg: "por kg", perKgDay: "por kg/día", l: "L" },

    cropDiag: {
      title: "Diagnóstico de enfermedades de cultivos",
      subtitle:
        "Sube una foto de tu cultivo para obtener un diagnóstico instantáneo",
      dropPrompt: "Haz clic para subir o tomar una foto",
      cta: "Tomar foto / Subir imagen",
    },
    market: {
      title: "Precios de mercado",
      search: "Buscar producto…",
      alertTitle: "Alerta de precios",
      alertMsg:
        "El precio de los frijoles aumentó 15% en la última semana.",
    },
    schemes: {
      title: "Planes gubernamentales",
      subtitle:
        "Busca y solicita subsidios y programas agrícolas",
      search: "Buscar planes…",
      filterAll: "Todos",
      eligibility: "Requisitos",
      benefits: "Beneficios",
      applyOnline: "Aplicar en línea",
      applyNow: "Aplicar ahora",
    },
    restaurant: {
      title: "Conexión con restaurantes",
      subtitle:
        "Conecta directo con restaurantes y cadenas para pedidos al por mayor",
      requirements: "Requisitos",
      connect: "Conectar",
    },
    cold: {
      title: "Instalaciones de cadena de frío",
      subtitle:
        "Encuentra y reserva espacio para tu producción",
      facilities: "Instalaciones",
      goodAvailability: "Buena disponibilidad",
      bookNow: "Reservar",
    },
    predictor: {
      title: "Predictor de mercado",
      subtitle: "Pronóstico de precios con ML",
      timeframe: "Periodo",
      optimalStrategy: "Estrategia óptima",
      hold: "Mantener 2–3 semanas",
      bestSellDate: "Mejor fecha de venta",
      confidence: "Confianza",
      next7: "Próximos 7 días",
      next30: "Próximos 30 días",
      keyFactors: "Factores clave",
      seriesPrice: "Precio previsto (₹/kg)",
      seriesConf: "Confianza (%)",
    },
    health: {
      title: "Monitor de salud de cultivos",
      subtitle:
        "Análisis satelital y con drones en tiempo real",
      aiScan: "Escaneo IA",
      yourFields: "Tus campos",
      cropType: "Tipo de cultivo",
      growthStage: "Etapa de crecimiento",
      predictedYield: "Rendimiento previsto",
      expectedHarvest: "Cosecha prevista",
      cropIssues: "Problemas del cultivo",
      recommendations: "Recomendaciones",
    },
    drone: {
      title: "Sistema de monitoreo con drones",
      subtitle: "Vigilancia aérea en tiempo real",
      activeDrone: "Dron activo",
      liveFeed: "Transmisión en vivo",
      launch: "Lanzar dron",
      recentFindings: "Hallazgos recientes",
    },
    irrigation: {
      title: "Riego inteligente",
      subtitle: "Sistema de riego de precisión",
      autoMode: "Modo automático",
      todayUsage: "Consumo de hoy",
      thisWeek: "Esta semana",
      waterSaved: "Agua ahorrada",
      zones: "Zonas de riego",
      nextSchedule: "Próxima programación",
      efficiency: "Eficiencia",
      farmingReco: "Recomendaciones",
    },
    weatherX: {
      title: "Información meteorológica",
      subtitle:
        "Análisis meteorológico de precisión con datos satelitales",
      temp: "Temperatura",
      humidity: "Humedad",
      rainfall: "Lluvia",
      wind: "Viento",
      uv: "Índice UV",
      soil: "Humedad del suelo",
      forecast5: "Pronóstico de 5 días",
      recos: "Recomendaciones agrícolas",
    },

    trace: {
      title: "Trazabilidad blockchain",
      subtitle:
        "Transparencia total del campo a la mesa con registros inmutables",
      productLabel: "Tomates orgánicos",
      batch: "Lote",
      showQr: "Mostrar código QR",
      farmerDetails: "Datos del agricultor",
      sustainabilityScore:
        "Puntaje de sostenibilidad Farmculture",
      certificates: "Certificados",
      certList: {
        organic: "Certificado orgánico",
        quality: "Aseguramiento de calidad",
        coldChain: "Cumplimiento de cadena de frío",
      },
      delivery: "Entrega",
      stages: {
        planting: "Siembra",
        harvesting: "Cosecha",
        processing: "Procesamiento",
        transportation: "Transporte",
        retail: "Venta minorista",
      },
      fields: {
        location: "Ubicación",
        handler: "Encargado",
        quality: "Calidad",
        temperature: "Temperatura",
      },
      status: {
        current: "Estado actual: Disponible para compra",
        verifiedLine:
          "Todas las etapas verificadas en blockchain. Transparencia total garantizada.",
      },
      tags: {
        organic: "Orgánico",
        fairTrade: "Comercio justo",
        sustainable: "Sostenible",
      },
    },
  },

  te: {
    brand: "వ్యవసాయ సంస్కృతి",
    brand_tagline: "మీ స్నేహపూర్వక వ్యవసాయ సహాయకుడు",
    welcome: "వ్యవసాయ సంస్కృతికి స్వాగతం",
    subtitle: "ప్రపంచంలోనే అతిపెద్ద వ్యవసాయ నెట్‌వర్క్",
    tagline: "అత్యాధునిక బుద్ధితో రైతులకు శక్తినిచ్చడం",

    agriculture_tools: "వ్యవసాయ పరికరాలు",
    crop_diagnosis: "పంట నిర్ధారణ",
    crop_diagnosis_desc: "తక్షణ వ్యాధి గుర్తింపు (AI)",
    market_prices: "మార్కెట్ ధరలు",
    market_prices_desc: "రియల్-టైమ్ ధరలు",
    govt_schemes: "ప్రభుత్వ పథకాలు",
    govt_schemes_desc: "సబ్సిడీలు & మద్దతు",
    voice_assistant: "వాయిస్ అసిస్టెంట్",
    voice_assistant_desc: "మీ భాషలో చేతులేని సహాయం",
    restaurants: "రెస్టారెంట్లు",
    restaurants_desc: "ఉత్పత్తిని నేరుగా కొనుగోలుదారులతో కలపండి",
    cold_storage: "కోల్డ్ స్టోరేజ్",
    cold_storage_desc: "కోల్డ్-చైన్ పర్యవేక్షణ",

    advanced_features: "అధునాతన ఫీచర్లు",
    market_predictor: "మార్కెట్ అంచనా",
    market_predictor_desc: "మెరుగైన అమ్మకాల కోసం అంచనాలు",
    crop_health_monitor: "పంట ఆరోగ్య మానిటర్",
    crop_health_monitor_desc: "ఉపగ్రహ/సెన్సార్ విశ్లేషణ",
    drone_monitoring: "డ్రోన్ మానిటరింగ్",
    drone_monitoring_desc: "ప్రెసిషన్ వ్యవసాయానికి వైమానిక చిత్రాలు",
    smart_irrigation: "స్మార్ట్ సాగు",
    smart_irrigation_desc: "నీరు ఆదా చేసే ఆటోమేటెడ్ పద్ధతి",
    weather_insights: "వాతావరణ సమాచారం",
    weather_insights_desc: "స్థానిక వాతావరణ హెచ్చరికలు",
    blockchain_traceability: "బ్లాక్‌చెయిన్ ట్రేసబిలిటీ",
    blockchain_traceability_desc: "ఎండ్-టు-ఎండ్ సరఫరా పారదర్శకత",

    farmers_helped: "100,000+",
    farmers_helped_label: "సహాయం పొందిన రైతులు",
    diagnosis_accuracy: "98.5%",
    diagnosis_accuracy_label: "నిర్ధారణ ఖచ్చితత్వం",
    support_system: "24/7",
    support_system_label: "సహాయ వ్యవస్థ",
    farmer_income_increased: "2.5 మిలియన్",
    farmer_income_increased_label: "రైతుల ఆదాయం పెరిగింది",

    revolutionary_agriculture: "క్రాంతికారి వ్యవసాయం",
    market_prediction: "మార్కెట్ అంచనా",
    satellite_monitoring: "ఉపగ్రహ పర్యవేక్షణ",
    blockchain_transparency: "బ్లాక్‌చెయిన్ పారదర్శకత",

    backToHome: "హోమ్‌కు తిరిగి వెళ్ళండి",

    "footer.brand": "వ్యవసాయ సంస్కృతి",
    "footer.tagline":
      "ఏఐ & బ్లాక్‌చెయిన్ ట్రేసబిలిటితో వ్యవసాయంలో విప్లవం",
    "footer.poweredBy": "చే శక్తినిచ్చింది",
    "footer.technologies": "సాంకేతికతలు",
    "footer.copyright":
      "సమాజానికి చిన్న సహకారంతో రైతులకు మద్దతు ఇస్తున్నాము.",

    auth: {
      sign_in_title: "లోనికి సైన్ ఇన్",
      welcome: "మళ్లీ స్వాగతం, రైతూ!",
      email: "ఈమెయిల్ చిరునామా",
      password: "పాస్‌వర్డ్",
      sign_in: "సైన్ ఇన్",
      or: "లేదా",
      continue_google: "Google తో కొనసాగండి",
      new_to: "కొత్తవారా",
      create_account: "ఖాతా సృష్టించండి",
      back_home: "హోమ్‌కు తిరిగి వెళ్ళండి",
    },
    units: { perKg: "కిలోకు", perKgDay: "కిలో/రోజు", l: "లీ" },

    cropDiag: {
      title: "పంట వ్యాధి నిర్ధారణ",
      subtitle:
        "మీ పంట ఫోటోను అప్లోడ్ చేసి తక్షణ నిర్ధారణ పొందండి",
      dropPrompt:
        "ఫోటోను అప్లోడ్ చేయడానికి లేదా కెమెరాతో తీయడానికి క్లిక్ చేయండి",
      cta: "ఫోటో తీయండి / ఇమేజ్ అప్లోడ్ చేయండి",
    },

    market: {
      title: "మార్కెట్ ధరలు",
      search: "వస్తువు కోసం వెతకండి…",
      alertTitle: "ధర హెచ్చరిక",
      alertMsg: "గత వారం బీన్స్ ధరలు 15% పెరిగాయి.",
    },

    schemes: {
      title: "ప్రభుత్వ పథకాలు",
      subtitle:
        "వ్యవసాయ సబ్సిడీలు మరియు పథకాల కోసం వెతికి దరఖాస్తు చేయండి",
      search: "పథకాలు వెతకండి…",
      filterAll: "అన్నీ",
      eligibility: "అర్హత",
      benefits: "లాభాలు",
      applyOnline: "ఆన్‌లైన్‌లో దరఖాస్తు",
      applyNow: "ఇప్పుడే దరఖాస్తు చేయండి",
    },

    restaurant: {
      title: "రెస్టారెంట్ కనెక్ట్",
      subtitle:
        "పెద్ద ఆర్డర్ల కోసం రెస్టారెంట్లు/ఫుడ్ చైన్‌లతో నేరుగా కనెక్ట్ అవ్వండి",
      requirements: "అవసరాలు",
      connect: "కనెక్ట్",
    },

    cold: {
      title: "కోల్డ్ స్టోరేజ్ సదుపాయాలు",
      subtitle:
        "మీ పంటకు కోల్డ్ స్టోరేజ్ స్థలాన్ని కనుగొని బుక్ చేయండి",
      facilities: "సౌకర్యాలు",
      goodAvailability: "మంచి లభ్యత",
      bookNow: "ఇప్పుడే బుక్ చేయండి",
    },

    predictor: {
      title: "మార్కెట్ ప్రిడిక్టర్",
      subtitle: "మెషిన్ లెర్నింగ్ ఆధారిత ధర అంచనా",
      timeframe: "కాల వ్యవధి",
      optimalStrategy: "ఉత్తమ వ్యూహం",
      hold: "ఉత్తమ లాభాల కోసం 2–3 వారాలు నిల్వ ఉంచండి",
      bestSellDate: "ఉత్తమ అమ్మక తేదీ",
      confidence: "నమ్మకం",
      next7: "తదుపరి 7 రోజులు",
      next30: "తదుపరి 30 రోజులు",
      keyFactors: "ముఖ్య మార్కెట్ అంశాలు",
      seriesPrice: "అంచనా ధర (₹/కిలో)",
      seriesConf: "నమ్మకం (%)",
    },

    health: {
      title: "పంట ఆరోగ్య మానిటర్",
      subtitle:
        "ఉపగ్రహం మరియు డ్రోన్ ఆధారిత రియల్‌టైమ్ విశ్లేషణ",
      aiScan: "ఏఐ స్కాన్",
      yourFields: "మీ పొలాలు",
      cropType: "పంట రకం",
      growthStage: "వృద్ధి దశ",
      predictedYield: "అంచనా దిగుబడి",
      expectedHarvest: "అంచనా కోత",
      cropIssues: "పంట సమస్యలు",
      recommendations: "సూచనలు",
    },

    drone: {
      title: "డ్రోన్ మానిటరింగ్ సిస్టమ్",
      subtitle: "రియల్-టైమ్ వైమానిక పర్యవేక్షణ",
      activeDrone: "సక్రియ డ్రోన్",
      liveFeed: "లైవ్ ఫీడ్",
      launch: "డ్రోన్ ప్రారంభించండి",
      recentFindings: "తాజా కనుగోళ్లు",
    },

    irrigation: {
      title: "స్మార్ట్ సాగు నియంత్రణ",
      subtitle: "ప్రెసిషన్ వాటరింగ్ సిస్టమ్",
      autoMode: "ఆటో మోడ్",
      todayUsage: "ఈ రోజు వినియోగం",
      thisWeek: "ఈ వారం",
      waterSaved: "సేవ్ చేసిన నీరు",
      zones: "నీరుపోసే జోన్‌లు",
      nextSchedule: "తదుపరి షెడ్యూల్",
      efficiency: "దక్షత",
      farmingReco: "వ్యవసాయ సూచన",
    },

    weatherX: {
      title: "వాతావరణ అవగాహనలు",
      subtitle:
        "ఉపగ్రహ డేటాతో ఖచ్చితమైన వ్యవసాయ వాతావరణ విశ్లేషణ",
      temp: "ఉష్ణోగ్రత",
      humidity: "ఆర్ద్రత",
      rainfall: "వర్షపాతం",
      wind: "గాలి వేగం",
      uv: "యూవీ సూచిక",
      soil: "మట్టి తేమ",
      forecast5: "5-దినాల ఖచ్చితమైన అంచనా",
      recos: "వ్యవసాయ సూచనలు",
    },

    trace: {
      title: "బ్లాక్‌చెయిన్ ట్రేసబిలిటీ",
      subtitle:
        "మార్పులేని రికార్డులతో ఫాం నుంచి ప్లేట్ వరకు పూర్తి పారదర్శకత",
      productLabel: "ఆర్గానిక్ టమాటాలు",
      batch: "బాచ్",
      showQr: "క్యూ ఆర్ కోడ్ చూపించు",
      farmerDetails: "రైతు వివరాలు",
      sustainabilityScore: "Farmculture స్థిరత్వ స్కోర్",
      certificates: "సర్టిఫికేట్లు",
      certList: {
        organic: "ఆర్గానిక్ సర్టిఫికేట్",
        quality: "క్వాలిటీ అష్యూరెన్స్",
        coldChain: "కొల్డ్-చైన్ కంప్లయన్స్",
      },
      delivery: "డెలివరీ",
      stages: {
        planting: "నాటకం",
        harvesting: "పంట కోత",
        processing: "ప్రాసెసింగ్",
        transportation: "రవాణా",
        retail: "రిటైల్",
      },
      fields: {
        location: "స్థానం",
        handler: "బాధ్యుడు",
        quality: "నాణ్యత",
        temperature: "ఉష్ణోగ్రత",
      },
      status: {
        current: "ప్రస్తుత స్థితి: కొనుగోలుకు అందుబాటులో ఉంది",
        verifiedLine:
          "అన్ని దశలు బ్లాక్‌చెయిన్‌లో ధృవీకరించబడ్డాయి. సంపూర్ణ పారదర్శకత హామీ.",
      },
      tags: {
        organic: "ఆర్గానిక్",
        fairTrade: "ఫెయిర్ ట్రేడ్",
        sustainable: "సస్టైనబుల్",
      },
    },
  },
};

/** ---------------- Provider ---------------- */
export const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const initial =
    (typeof localStorage !== "undefined" &&
      (localStorage.getItem("lang") as Lang)) ||
    normalize(typeof navigator !== "undefined" ? navigator.language : "en");

  const [lang, setLang] = useState<Lang>(normalize(initial));

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  // translator supports flat keys & dot-notation
  const t = useMemo(() => {
    const table = dict[lang];
    return (key: string) => {
      const v = pathGet(table, key) ?? table[key];
      return (typeof v === "string" ? v : undefined) ?? key;
    };
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      language: lang, // legacy alias
      setLanguage: setLang, // legacy alias
      t,
    }),
    [lang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/** Hook */
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
