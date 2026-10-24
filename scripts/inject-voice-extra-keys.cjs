const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'contexts', 'LanguageContext.tsx');
let content = fs.readFileSync(targetFile, 'utf8').replace(/\r\n/g, '\n');

const additionalVoiceTranslations = {
  en: {
    "voice.stopGeneration": "Stop Response",
    "voice.quickAssessment": "My Farm & Diagnostic History",
    "voice.sourceProvenance": "Data Source & Provenance",
    "voice.verifiedSource": "Verified Official Record",
    "voice.estimatedModel": "Agronomic Model Estimate",
    "voice.abstainNotice": "Safety Abstention Policy",
    "voice.timeObserved": "Observed",
  },
  ta: {
    "voice.stopGeneration": "பதிலை நிறுத்து",
    "voice.quickAssessment": "என் பண்ணை & ஆய்வு வரலாறு",
    "voice.sourceProvenance": "தரவு மூலம் & நம்பகத்தன்மை",
    "voice.verifiedSource": "சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ பதிவு",
    "voice.estimatedModel": "மாதிரி மதிப்பீடு",
    "voice.abstainNotice": "பாதுகாப்பு விலக்கு கொள்கை",
    "voice.timeObserved": "பதிவு செய்யப்பட்ட நேரம்",
  },
  hi: {
    "voice.stopGeneration": "उत्पत्ति रोकें",
    "voice.quickAssessment": "मेरा खेत और जांच इतिहास",
    "voice.sourceProvenance": "डेटा स्रोत और प्रामाणिकता",
    "voice.verifiedSource": "सत्यापित आधिकारिक रिकॉर्ड",
    "voice.estimatedModel": "कृषि मॉडल अनुमान",
    "voice.abstainNotice": "सुरक्षा निषेध नीति",
    "voice.timeObserved": "अवलोकन समय",
  },
  te: {
    "voice.stopGeneration": "సమాధానం ఆపండి",
    "voice.quickAssessment": "నా పొలం & వ్యాధి నిర్ధారణ చరిత్ర",
    "voice.sourceProvenance": "సమాచార మూలం & విశ్వసనీయత",
    "voice.verifiedSource": "ధృవీకరించబడిన అధికారిక రికార్డు",
    "voice.estimatedModel": "వ్యవసాయ మోడల్ అంచనా",
    "voice.abstainNotice": "రక్షణ విధానం",
    "voice.timeObserved": "నమోదైన సమయం",
  },
  mr: {
    "voice.stopGeneration": "प्रक्रिया थांबवा",
    "voice.quickAssessment": "माझी शेती आणि निदान इतिहास",
    "voice.sourceProvenance": "माहिती स्रोत आणि सत्यता",
    "voice.verifiedSource": "सत्यापित अधिकृत नोंद",
    "voice.estimatedModel": "कृषी मॉडेल अंदाज",
    "voice.abstainNotice": "सुरक्षा धोरण",
    "voice.timeObserved": "नोंद वेळ",
  },
  fr: {
    "voice.stopGeneration": "Arrêter la réponse",
    "voice.quickAssessment": "Mes exploitations & diagnostics",
    "voice.sourceProvenance": "Source et traçabilité des données",
    "voice.verifiedSource": "Enregistrement officiel vérifié",
    "voice.estimatedModel": "Estimation de modèle agronomique",
    "voice.abstainNotice": "Politique de sécurité et d'abstention",
    "voice.timeObserved": "Observé le",
  },
  es: {
    "voice.stopGeneration": "Detener respuesta",
    "voice.quickAssessment": "Mi historial de parcelas y diagnóstico",
    "voice.sourceProvenance": "Fuente de datos y procedencia",
    "voice.verifiedSource": "Registro oficial verificado",
    "voice.estimatedModel": "Estimación del modelo agronómico",
    "voice.abstainNotice": "Política de seguridad agronómica",
    "voice.timeObserved": "Observado",
  },
  de: {
    "voice.stopGeneration": "Antwort stoppen",
    "voice.quickAssessment": "Mein Betrieb & Diagnoseverlauf",
    "voice.sourceProvenance": "Datenquelle & Herkunft",
    "voice.verifiedSource": "Geprüfter amtlicher Datensatz",
    "voice.estimatedModel": "Agronomische Modellschätzung",
    "voice.abstainNotice": "Sicherheits- und Enthaltungsgrundsatz",
    "voice.timeObserved": "Erfasst",
  },
  pl: {
    "voice.stopGeneration": "Zatrzymaj generowanie",
    "voice.quickAssessment": "Moje gospodarstwo i historia diagnoz",
    "voice.sourceProvenance": "Źródło danych i atrybucja",
    "voice.verifiedSource": "Zweryfikowany rekord urzędowy",
    "voice.estimatedModel": "Szacunek modelu agronomicznego",
    "voice.abstainNotice": "Zasada bezpieczeństwa i wstrzymania",
    "voice.timeObserved": "Zarejestrowano",
  },
  ar: {
    "voice.stopGeneration": "إيقاف الرد",
    "voice.quickAssessment": "سجل مزرعتي والتشخيصات السابقة",
    "voice.sourceProvenance": "مصدر البيانات والتحقق",
    "voice.verifiedSource": "سجل رسمي موثق",
    "voice.estimatedModel": "تقدير النموذج الزراعي",
    "voice.abstainNotice": "سياسة الأمان والامتناع الاحترازي",
    "voice.timeObserved": "وقت الرصد",
  },
};

for (const [lang, translations] of Object.entries(additionalVoiceTranslations)) {
  const pattern = new RegExp(`(  ${lang}: \\{\\n)`);
  if (!pattern.test(content)) continue;

  const entriesStr = Object.entries(translations)
    .map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
    .join('\n');

  content = content.replace(pattern, `$1${entriesStr}\n`);
}

fs.writeFileSync(targetFile, content.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully injected additional voice.* keys across all 10 locales!');
