// VoiceAssistant.tsx
import { useLanguage } from '../contexts/LanguageContext';

const languageEndonyms = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'pl', name: 'Polski' },
  { code: 'es', name: 'Español' }
];

const quickCommands = [
  { key: 'weather', translations: { en: 'weather', hi: 'मौसम', ta: 'வானிலை', de: 'Wetter', fr: 'Météo', pl: 'Pogoda', es: 'Clima' } },
  { key: 'market_price', translations: { en: 'market_price', hi: 'बाज़ार भाव', ta: 'சந்தை விலை', de: 'Marktpreis', fr: 'Prix du marché', pl: 'Cena rynkowa', es: 'Precio de mercado' } },
  { key: 'crop_health', translations: { en: 'crop_health', hi: 'फसल स्वास्थ्य', ta: 'பயிர் நலம்', de: 'Pflanzengesundheit', fr: 'Santé des cultures', pl: 'Zdrowie upraw', es: 'Salud del cultivo' } },
  { key: 'irrigation', translations: { en: 'irrigation', hi: 'सिंचाई', ta: 'நீர்ப்பாசனம்', de: 'Bewässerung', fr: 'Irrigation', pl: 'Nawadnianie', es: 'Riego' } },
  { key: 'traceability', translations: { en: 'traceability', hi: 'उत्पाद ट्रैकिंग', ta: 'தடமறிதல்', de: 'Rückverfolgbarkeit', fr: 'Traçabilité', pl: 'Identyfikowalność', es: 'Trazabilidad' } }
];

export default function VoiceAssistant({
  isListening,
  onToggleListening,
}: {
  isListening: boolean;
  onToggleListening: () => void;
}) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-center">{t('voice_assistant')}</h2>
      <p className="text-center text-slate-600">
        {t('bilingual_support')} {isListening ? '🎙️' : '🔇'}
      </p>

      <div className="mt-2 flex justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm bg-white hover:bg-gray-50"
          onClick={onToggleListening}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <label className="text-sm">{t('language')}</label>
        <select
          className="border rounded-md px-3 py-2"
          value={language}
          onChange={(e) => setLanguage(e.target.value as typeof language)}
        >
          {languageEndonyms.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 max-w-3xl mx-auto">
        <div className="text-sm mb-2 font-medium">{t('va_quick')}</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {quickCommands.map((cmd, i) => (
            <button
              key={i}
              className="text-left rounded-xl border px-4 py-3 bg-white hover:bg-slate-50"
              onClick={() => /* your handler */ null}
            >
              {cmd.translations[language as keyof typeof cmd.translations] ?? cmd.key}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}