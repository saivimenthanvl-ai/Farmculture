import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

type Lang = "en" | "de" | "hi" | "ta" | "es" | "fr" | "pt" | "pl";

const T: Record<Lang, {
  backToTop: string;
  cols: {
    title: string; items: string[];
  }[];
  brandTitle: string;
  brandSubtitle: string;
  poweredByLabel: string;
  poweredBy: string;
  techLabel: string;
  tech: string;
  copyright: string;
}> = {
  en: {
    backToTop: "Back to top",
    cols: [
      {
        title: "Get to Know Us",
        items: ["About Us", "Careers", "Press Releases", "Research & Science"]
      },
      {
        title: "Connect With Us",
        items: ["Facebook", "Twitter", "Instagram"]
      },
      {
        title: "Make Money With Us",
        items: [
          "Sell on Farmculture",
          "Brand Registry",
          "Global Selling",
          "Supply with Farmculture",
          "Fulfillment by Farmculture",
          "Advertise Your Products"
        ]
      },
      {
        title: "Let Us Help You",
        items: [
          "Your Account",
          "Returns Centre",
          "100% Secure Shopping",
          "Download the App",
          "Help"
        ]
      }
    ],
    brandTitle: "Farmculture",
    brandSubtitle: "Revolutionizing Agriculture with AI & Blockchain Technology",
    poweredByLabel: "Powered by:",
    poweredBy: "Google AI • Firebase • Vertex AI",
    techLabel: "Technologies:",
    tech: "Machine Learning",
    copyright:
      "© 2025 Farmculture. Empowering farmers with cutting-edge agricultural intelligence."
  },

  de: {
    backToTop: "Zurück nach oben",
    cols: [
      { title: "Lernen Sie uns kennen",
        items: ["Über uns", "Karriere", "Pressemitteilungen", "Forschung & Wissenschaft"] },
      { title: "Vernetzen Sie sich",
        items: ["Facebook", "Twitter", "Instagram"] },
      { title: "Verdienen Sie mit uns",
        items: [
          "Bei Farmculture verkaufen",
          "Markenregister",
          "Globales Verkaufen",
          "Liefern mit Farmculture",
          "Fulfillment durch Farmculture",
          "Werben für Ihre Produkte"
        ]},
      { title: "Wir helfen Ihnen",
        items: ["Ihr Konto", "Rücksendezentrum", "100% sicheres Einkaufen", "App herunterladen", "Hilfe"] }
    ],
    brandTitle: "Farmculture",
    brandSubtitle: "Revolutioniert die Landwirtschaft mit KI- und Blockchain-Technologie",
    poweredByLabel: "Bereitgestellt von:",
    poweredBy: "Google AI • Firebase • Vertex AI",
    techLabel: "Technologien:",
    tech: "Maschinelles Lernen",
    copyright:
      "© 2025 Farmculture. Stärkung der Landwirte durch modernste landwirtschaftliche Intelligenz."
  },

  hi: {
    backToTop: "वापस सबसे ऊपर जाएँ",
    cols: [
      { title: "हमारे बारे में जानें",
        items: ["हमारे बारे में", "करियर", "प्रेस विज्ञप्तियाँ", "अनुसंधान व विज्ञान"] },
      { title: "हमसे जुड़ें",
        items: ["Facebook", "Twitter", "Instagram"] },
      { title: "हमारे साथ पैसे कमाएँ",
        items: [
          "Farmculture पर बेचें",
          "ब्रांड रजिस्ट्री",
          "वैश्विक बिक्री",
          "Farmculture सप्लाई",
          "Farmculture द्वारा फुलफ़िलमेंट",
          "अपने उत्पादों का विज्ञापन करें"
        ]},
      { title: "हम आपकी सहायता करें",
        items: ["आपका अकाउंट", "वापसी केंद्र", "100% सुरक्षित खरीदारी", "ऐप डाउनलोड करें", "सहायता"] }
    ],
    brandTitle: "Farmculture",
    brandSubtitle: "एआई और ब्लॉकचेन तकनीक के साथ कृषि में क्रांति",
    poweredByLabel: "द्वारा संचालित:",
    poweredBy: "Google AI • Firebase • Vertex AI",
    techLabel: "प्रौद्योगिकियां:",
    tech: "मशीन लर्निंग",
    copyright:
      "© 2025 Farmculture. अत्याधुनिक कृषि बुद्धिमत्ता के साथ किसानों को सशक्त बनाना।"
  },

  ta: {
    backToTop: "மேல்நோக்கி செல்ல",
    cols: [
      { title: "எங்களைப் பற்றி அறிந்து கொள்ள",
        items: ["எங்களை பற்றி", "தொழில்வாய்ப்புகள்", "செய்திக்குறிப்புகள்", "ஆராய்ச்சி & அறிவியல்"] },
      { title: "எங்களுடன் இணைக",
        items: ["Facebook", "Twitter", "Instagram"] },
      { title: "எங்களுடன் வருமானம் பெற",
        items: [
          "Farmculture-ல் விற்பனை செய்யவும்",
          "பிராண்டு பதிவியல்",
          "உலகளாவிய விற்பனை",
          "Farmculture வழங்கல்",
          "Farmculture நிறைவேற்றல்",
          "உங்கள் தயாரிப்புகளை விளம்பரப்படுத்தவும்"
        ]},
      { title: "உங்களுக்கு உதவுகிறோம்",
        items: ["உங்கள் கணக்கு", "திருப்பு மையம்", "100% பாதுகாப்பான வாங்குதல்", "ஆப்பை பதிவிறக்குக", "உதவி"] }
    ],
    brandTitle: "Farmculture",
    brandSubtitle: "ஏஐ மற்றும் ப்ளாக்செயின் தொழில்நுட்பத்துடன் வேளாண்மையில் புரட்சி",
    poweredByLabel: "வழங்குபவர்கள்:",
    poweredBy: "Google AI • Firebase • Vertex AI",
    techLabel: "தொழில்நுட்பங்கள்:",
    tech: "இயந்திரக் கற்றல்",
    copyright:
      "© 2025 Farmculture. நவீன வேளாண் நுண்ணறிவுடன் விவசாயிகளை அதிகாரப்படுத்துகிறது."
  },

  es: {
    backToTop: "Volver arriba",
    cols: [
      { title: "Conócenos",
        items: ["Quiénes somos", "Empleos", "Notas de prensa", "Investigación y ciencia"] },
      { title: "Conéctate con nosotros",
        items: ["Facebook", "Twitter", "Instagram"] },
      { title: "Gana dinero con nosotros",
        items: [
          "Vende en Farmculture",
          "Registro de marca",
          "Ventas globales",
          "Suministro con Farmculture",
          "Fulfillment por Farmculture",
          "Anuncia tus productos"
        ]},
      { title: "Permítenos ayudarte",
        items: ["Tu cuenta", "Centro de devoluciones", "Compra 100% segura", "Descargar la app", "Ayuda"] }
    ],
    brandTitle: "Farmculture",
    brandSubtitle: "Revolucionando la agricultura con tecnología de IA y blockchain",
    poweredByLabel: "Impulsado por:",
    poweredBy: "Google AI • Firebase • Vertex AI",
    techLabel: "Tecnologías:",
    tech: "Aprendizaje Automático",
    copyright:
      "© 2025 Farmculture. Empoderando a los agricultores con inteligencia agrícola de vanguardia."
  },

  fr: {
    backToTop: "Revenir en haut",
    cols: [
      { title: "Faites connaissance",
        items: ["À propos", "Carrières", "Communiqués de presse", "Recherche & Science"] },
      { title: "Restez connectés",
        items: ["Facebook", "Twitter", "Instagram"] },
      { title: "Gagnez de l’argent avec nous",
        items: [
          "Vendre sur Farmculture",
          "Enregistrement de marque",
          "Ventes internationales",
          "Approvisionner avec Farmculture",
          "Fulfillment par Farmculture",
          "Faites la publicité de vos produits"
        ]},
      { title: "Laissez-nous vous aider",
        items: ["Votre compte", "Centre de retours", "Achats 100% sécurisés", "Télécharger l’app", "Aide"] }
    ],
    brandTitle: "Farmculture",
    brandSubtitle: "Révolutionner l’agriculture avec la technologie IA et Blockchain",
    poweredByLabel: "Propulsé par :",
    poweredBy: "Google AI • Firebase • Vertex AI",
    techLabel: "Technologies :",
    tech: "Apprentissage automatique",
    copyright:
      "© 2025 Farmculture. Donner du pouvoir aux agriculteurs grâce à une intelligence agricole de pointe."
  },

  pt: {
    backToTop: "Voltar ao topo",
    cols: [
      { title: "Conheça-nos",
        items: ["Sobre nós", "Carreiras", "Comunicados à imprensa", "Pesquisa & Ciência"] },
      { title: "Conecte-se",
        items: ["Facebook", "Twitter", "Instagram"] },
      { title: "Ganhe dinheiro conosco",
        items: [
          "Venda na Farmculture",
          "Registro de marca",
          "Vendas globais",
          "Suprimentos com Farmculture",
          "Fulfillment pela Farmculture",
          "Anuncie seus produtos"
        ]},
      { title: "Deixe-nos ajudar",
        items: ["Sua conta", "Centro de devoluções", "Compra 100% segura", "Baixar o app", "Ajuda"] }
    ],
    brandTitle: "Farmculture",
    brandSubtitle: "Revolucionando a agricultura com tecnologia de IA e Blockchain",
    poweredByLabel: "Desenvolvido por:",
    poweredBy: "Google AI • Firebase • Vertex AI",
    techLabel: "Tecnologias:",
    tech: "Aprendizado de Máquina",
    copyright:
      "© 2025 Farmculture. Empoderando agricultores com inteligência agrícola de ponta."
  },

  pl: {
    backToTop: "Powrót na górę",
    cols: [
      { title: "Poznaj nas",
        items: ["O nas", "Kariera", "Informacje prasowe", "Badania i nauka"] },
      { title: "Bądź z nami",
        items: ["Facebook", "Twitter", "Instagram"] },
      { title: "Zarabiaj z nami",
        items: [
          "Sprzedawaj na Farmculture",
          "Rejestracja marki",
          "Sprzedaż globalna",
          "Dostawy z Farmculture",
          "Realizacja zamówień przez Farmculture",
          "Reklamuj swoje produkty"
        ]},
      { title: "Chętnie pomożemy",
        items: ["Twoje konto", "Centrum zwrotów", "W 100% bezpieczne zakupy", "Pobierz aplikację", "Pomoc"] }
    ],
    brandTitle: "Farmculture",
    brandSubtitle: "Rewolucjonizowanie rolnictwa dzięki technologii AI i Blockchain",
    poweredByLabel: "Obsługiwane przez:",
    poweredBy: "Google AI • Firebase • Vertex AI",
    techLabel: "Technologie:",
    tech: "Uczenie maszynowe",
    copyright:
      "© 2025 Farmculture. Wspieranie rolników dzięki najnowocześniejszej inteligencji rolniczej."
  }
};

const Footer: React.FC = () => {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <footer className="bg-[#232F3E] text-white mt-16">
      {/* Back to Top */}
      <div
        className="w-full text-center text-sm py-3 bg-[#37475A] hover:bg-[#485769] cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        role="button"
      >
        {t.backToTop}
      </div>

      {/* Columns */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {t.cols.map((col, idx) => (
          <div key={idx}>
            <h4 className="text-lg font-semibold mb-3">{col.title}</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              {col.items.map((item, i) => (
                <li key={i} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Thin divider */}
      <div className="border-t border-white/10" />

      {/* Brand row (like your second screenshot styling) */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-5xl mx-auto px-6 py-10 text-center">
          <h3 className="text-2xl font-bold mb-2">{t.brandTitle}</h3>
          <p className="text-gray-300 mb-6">{t.brandSubtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
            <div>
              <span className="font-semibold">{t.poweredByLabel} </span>
              <span className="text-gray-300">{t.poweredBy}</span>
            </div>
            <div>
              <span className="font-semibold">{t.techLabel} </span>
              <span className="text-gray-300">{t.tech}</span>
            </div>
          </div>
          <div className="text-gray-300 text-sm mt-8">
            {t.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
