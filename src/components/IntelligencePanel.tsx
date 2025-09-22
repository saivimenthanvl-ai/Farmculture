// src/components/IntelligencePanel.tsx
import { Brain, Satellite, Boxes } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function IntelligencePanel() {
  const { t } = useLanguage();

  return (
    <section className="mt-10">
      <div className="relative overflow-hidden rounded-2xl">
        {/* darker gradient so white text pops */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-700 via-blue-700 to-emerald-700" />
        <div className="relative p-6 sm:p-8 text-white">
          <h3 className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold drop-shadow">
            <span></span>
            {t('Revolutionary Agriculture')}
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5" />
                <div className="font-semibold">{t('Market Prediction')}</div>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/95">
                {t('Market Prediction')}
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <Satellite className="h-5 w-5" />
                <div className="font-semibold">{t('Satellite Monitoring')}</div>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/95">
                {t('Satellite Monitoring')}
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <Boxes className="h-5 w-5" />
                <div className="font-semibold">{t('Blockchain Transparency')}</div>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/95">
                {t('Blockchain Transparency')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
