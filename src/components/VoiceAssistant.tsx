import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceAssistantProps {
  isListening: boolean;
  onToggleListening: () => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  isListening,
  onToggleListening
}) => {
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState<'en-IN' | 'ta-IN' | 'hi-IN' | 'pl-PL' | 'pt-PT' | 'de-DE' | 'es-ES' | 'fr-FR'>('en-IN');

  useEffect(() => {
    if (isListening) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert('Speech Recognition not supported in this browser.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        handleVoiceCommand(spokenText);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        onToggleListening();
      };

      recognition.onend = () => {
        onToggleListening();
      };

      recognition.start();

      return () => {
        recognition.abort();
      };
    }
  }, [isListening, language]);

  const speakResponse = (text: string, lang: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    synth.speak(utterance);
  };

  const handleVoiceCommand = async (command: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    let responseText = '';
    let lang = language;

    // Use the selected language instead of detection
    switch(language) {
      case 'ta-IN':
        responseText = 'மயசூரு APMC நிலலில் томேதோ பெல் இன்று கிலோ ೪೫ ரூபாய். கழித்த வார்க்கின் கழித்து ೧೨% மேலாக விட்டது. விற்பனம் செய்யும் நேரம்.';
        break;
      case 'hi-IN':
        responseText = 'मिसर APMC निगल में томेटो का मूल्य आज ₹45 प्रति किलो है। इसे पिछले सप्ताह के तौर पर 12% बढ़ा गया। बेचने का अच्छा समय।';
        break;
      case 'de-DE':
        responseText = 'Der Preis für Tomaten im APMC Mysore ist heute für jeden Kilogramm ₹45. Er stieg im letzten Woche um 12% auf. Ein guter Zeitpunkt zum Verkaufen.';
        break;
      case 'fr-FR':
        responseText = 'Le prix des tomates dans l\'APMC de Mysore est de 45 euros par kilogramme. Il a augmenté de 12% la semaine dernière. Un bon moment pour vendre.';
        break;
      case 'pl-PL':
        responseText = 'Cena pomidorów w APMC Mysore jest dziś 45 euros na kilogram. Zwiększyła się o 12% w porównaniu do poprzedniej tygodni. Dość dobry czas do sprzedaży.';
        break;
      case 'pt-PT':
        responseText = 'O preço do tomate no APMC Mysore hoje é de 45 euros por kg. Aumentou 12% em relação à semana passada. Bom momento para vender.';
        break;
      case 'es-ES':
        responseText = 'El precio del tomate en APMC Mysore hoy es de 45 euros por kg. Ha aumentado un 12% desde la semana pasada. Buen momento para vender.';
        break;
      default: // en-IN
        responseText = 'The tomato price in Mysore APMC today is ₹45 per kg. It has increased by 12% from last week. Good time to sell.';
        break;
    }

    setResponse(responseText);
    setIsSpeaking(true);
    speakResponse(responseText, lang);

    setTimeout(() => setIsSpeaking(false), 5000);
    onToggleListening();
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Voice Assistant</h2>
      </div>

      {/* Language Selector */}
      <div className="text-center mb-4">
        <label className="mr-2 font-medium text-gray-700">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en-IN' | 'ta-IN' | 'hi-IN' | 'pl-PL' | 'pt-PT' | 'de-DE' | 'es-ES' | 'fr-FR')}
          className="p-2 border rounded"
        >
          <option value="en-IN">English</option>
          <option value="ta-IN">Tamil</option>
          <option value="es-ES">Español</option>
          <option value="fr-FR">Français</option>
          <option value="pt-PT">Português</option>
          <option value="pl-PL">Polski</option>
          <option value="de-DE">Deutsch</option>
          <option value="hi-IN">हिन्दी</option>
        </select>
      </div>

      {/* Voice Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={onToggleListening}
          className={`p-4 rounded-full transition-all duration-200 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </button>

        {response && (
          <button
            onClick={toggleSpeech}
            className={`p-4 rounded-full transition-all duration-200 ${
              isSpeaking
                ? 'bg-blue-500 hover:bg-blue-600 animate-pulse'
                : 'bg-gray-500 hover:bg-gray-600'
            } text-white`}
          >
            {isSpeaking ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
          </button>
        )}
      </div>

      {/* Status */}
      <div className="text-center mb-6">
        {isListening && (
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Listening...</span>
          </div>
        )}
        {isSpeaking && (
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Speaking...</span>
          </div>
        )}
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-gray-800 mb-2">You said:</h3>
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}

      {/* Response */}
      {response && (
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="font-medium text-green-800 mb-2">Assistant:</h3>
          <p className="text-green-700">{response}</p>
        </div>
      )}

      {/* Quick Commands */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-800 mb-3">Quick Commands:</h3>
        
        {/* English */}
        {language === 'en-IN' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"What's the price of onions?"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Show me irrigation schemes"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Diagnose my crop disease"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Weather forecast"</span>
            </button>
          </div>
        )}
        
        {/* German */}
        {language === 'de-DE' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Was ist der Preis von Zwiebeln?"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Zeig mir Bewässerungssysteme"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Diagnostiziere meine Pflanzenkrankheit"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Wettervorhersage"</span>
            </button>
          </div>
        )}
        
        {/* Hindi */}
        {language === 'hi-IN' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"प्याज का भाव क्या है?"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"सिंचाई योजनाएं दिखाएं"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"मेरी फसल की बीमारी का निदान करें"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"मौसम का पूर्वानुमान"</span>
            </button>
          </div>
        )}
        
        {/* Tamil */}
        {language === 'ta-IN' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"வெங்காயத்தின் விலை என்ன?"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"நீர்ப்பாசன திட்டங்களைக் காட்டு"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"எனது பயிர் நோயை கண்டறியவும்"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"வானிலை முன்னறிவிப்பு"</span>
            </button>
          </div>
        )}
        
        {/* Spanish */}
        {language === 'es-ES' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"¿Cuál es el precio de las cebollas?"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Muéstrame sistemas de riego"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Diagnostica la enfermedad de mi cultivo"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Pronóstico del tiempo"</span>
            </button>
          </div>
        )}
        
        {/* Portuguese */}
        {language === 'pt-PT' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Qual é o preço das cebolas?"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Mostre-me sistemas de irrigação"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Diagnostique a doença da minha cultura"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Previsão do tempo"</span>
            </button>
          </div>
        )}
        
        {/* Polish */}
        {language === 'pl-PL' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Jaka jest cena cebuli?"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Pokaż mi systemy nawadniania"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Zdiagnozuj chorobę mojej uprawy"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Prognoza pogody"</span>
            </button>
          </div>
        )}
        
        {/* French */}
        {language === 'fr-FR' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Quel est le prix des oignons?"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Montrez-moi les systèmes d'irrigation"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Diagnostiquez la maladie de ma culture"</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
              <span className="text-sm">"Prévisions météo"</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
