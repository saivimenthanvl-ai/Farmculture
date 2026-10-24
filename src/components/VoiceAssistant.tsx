import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Send, 
  CloudSun, 
  TrendingUp, 
  Leaf, 
  Droplets, 
  QrCode, 
  AlertCircle, 
  Info, 
  Sparkles, 
  Loader2, 
  RotateCcw,
  CheckCircle2,
  Globe,
  Square,
  ShieldCheck,
  Calendar,
  ExternalLink,
  History
} from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';
import { useLanguage, Lang } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  VOICE_LANGUAGE_CAPABILITIES, 
  isSpeechRecognitionAvailable, 
  isSpeechSynthesisAvailable, 
  speakAssistantResponse, 
  processAgriculturalVoiceQuery,
  AssistantMessage,
  VoiceLanguageCapability
} from '../lib/voiceAssistantService';

type VoiceState = 'READY' | 'LISTENING' | 'PROCESSING' | 'SPEAKING' | 'ERROR';

export default function VoiceAssistant() {
  const { t, region } = useLocalization();
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();

  const [voiceState, setVoiceState] = useState<VoiceState>('READY');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [isSynthesisSupported, setIsSynthesisSupported] = useState(true);

  // In-memory conversation history (Session-only, never logged remotely)
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: t('voice.ready'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'general',
      provenance: {
        sourceName: 'Farmculture Agronomy Router',
        retrievedAtIso: new Date().toISOString(),
        isLive: true,
        confidenceOrStatus: 'verified',
      }
    }
  ]);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isCancelledRef = useRef<boolean>(false);

  // Check speech API support on mount
  useEffect(() => {
    setIsSpeechSupported(isSpeechRecognitionAvailable());
    setIsSynthesisSupported(isSpeechSynthesisAvailable());
  }, []);

  // Auto-scroll conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, interimTranscript]);

  // Clean up recognition and speech synthesis on unmount
  useEffect(() => {
    return () => {
      isCancelledRef.current = true;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore cleanup abort errors
        }
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleProcessQuery = useCallback(async (queryText: string) => {
    if (!queryText.trim()) return;

    isCancelledRef.current = false;
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: AssistantMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText.trim(),
      timestamp: userTimestamp
    };

    setMessages(prev => [...prev, userMsg]);
    setTextInput('');
    setInterimTranscript('');
    setVoiceState('PROCESSING');
    setErrorMessage(null);

    try {
      const response = await processAgriculturalVoiceQuery(queryText, language, region, user?.uid);
      
      if (isCancelledRef.current) {
        setVoiceState('READY');
        return;
      }

      setMessages(prev => [...prev, response]);
      setVoiceState('READY');

      // Speak response if voice playback is active
      if (isSynthesisSupported) {
        speakAssistantResponse(response.text, language);
      }
    } catch {
      if (isCancelledRef.current) {
        setVoiceState('READY');
        return;
      }
      setVoiceState('ERROR');
      setErrorMessage(t('voice.processingError') || 'Unable to complete query processing. Please check network connectivity.');
    }
  }, [language, region, isSynthesisSupported, user?.uid, t]);

  const handleStopGeneration = () => {
    isCancelledRef.current = true;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setVoiceState('READY');
  };

  const startListening = () => {
    setErrorMessage(null);

    if (!isSpeechSupported) {
      setErrorMessage(t('voice.speechUnsupported'));
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage(t('voice.speechUnsupported'));
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      const targetCap = VOICE_LANGUAGE_CAPABILITIES.find(c => c.code === language);
      recognition.lang = targetCap ? targetCap.locale : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setVoiceState('LISTENING');
        setInterimTranscript('');
      };

      recognition.onresult = (event: any) => {
        let currentInterim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        if (finalTranscript.trim()) {
          setInterimTranscript('');
          handleProcessQuery(finalTranscript);
        } else {
          setInterimTranscript(currentInterim);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMessage(t('voice.micPermissionDenied'));
        } else if (event.error === 'no-speech') {
          setErrorMessage(t('voice.noSpeechDetected') || 'No voice detected. Please speak closer to the microphone.');
        } else {
          setErrorMessage(`Speech recognition error: ${event.error}`);
        }
        setVoiceState('READY');
      };

      recognition.onend = () => {
        if (voiceState === 'LISTENING') {
          setVoiceState('READY');
        }
      };

      recognition.start();
    } catch (err: any) {
      setVoiceState('ERROR');
      setErrorMessage(err?.message || 'Failed to initialize microphone stream.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore stop errors
      }
    }
    setVoiceState('READY');
    setInterimTranscript('');
  };

  const handleToggleListening = () => {
    if (voiceState === 'LISTENING') {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim() && voiceState !== 'PROCESSING') {
      handleProcessQuery(textInput);
    }
  };

  // Recommended Quick Action Buttons with authenticated history support
  const quickActions = [
    { key: 'weather', label: t('voice.quickWeather'), icon: <CloudSun className="w-4 h-4 text-[#1C4A3A]" />, query: 'weather forecast' },
    { key: 'market_price', label: t('voice.quickMarket'), icon: <TrendingUp className="w-4 h-4 text-[#1C4A3A]" />, query: 'mandi prices' },
    { key: 'assessment_history', label: t('voice.quickAssessment') || 'My Farm & Diagnostic History', icon: <History className="w-4 h-4 text-[#1C4A3A]" />, query: 'my assessment history' },
    { key: 'crop_health', label: t('voice.quickCropHealth'), icon: <Leaf className="w-4 h-4 text-[#1C4A3A]" />, query: 'crop health guidance' },
    { key: 'irrigation', label: t('voice.quickIrrigation'), icon: <Droplets className="w-4 h-4 text-[#1C4A3A]" />, query: 'irrigation status' },
    { key: 'traceability', label: t('voice.quickTraceability'), icon: <QrCode className="w-4 h-4 text-[#1C4A3A]" />, query: 'traceability verification' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E7E3D8]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-[#0F2E24]">
              {t('voice.title')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E2F0D9] text-[#1C4A3A] border border-[#9BE564]/50">
              {t('voice.bilingual_support')}
            </span>
          </div>
          <p className="text-xs text-[#787266] mt-1 max-w-2xl">
            {t('voice.subtitle')}
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#E7E3D8] shadow-2xs">
          <Globe className="w-4 h-4 text-[#1C4A3A] shrink-0" />
          <label htmlFor="voice-lang-select" className="text-xs font-semibold text-[#787266] sr-only">
            {t('voice.language')}
          </label>
          <select
            id="voice-lang-select"
            className="text-xs font-bold text-[#0F2E24] bg-transparent outline-none cursor-pointer"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Lang)}
          >
            {VOICE_LANGUAGE_CAPABILITIES.map((cap) => (
              <option key={cap.code} value={cap.code}>
                {cap.nativeName} ({cap.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error / Guidance Alert */}
      {errorMessage && (
        <div 
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl bg-[#FFF9F8] border border-[#C8553D]/30 text-[#C8553D] text-xs shadow-xs"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block mb-0.5">{t('voice.micPermissionDenied')}</span>
            <p className="text-[#8B0000] leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Main Interaction Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Prominent Microphone Control Card & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E7E3D8] shadow-xs text-center space-y-4">
            <div className="flex items-center justify-between text-xs text-[#787266] pb-2 border-b border-[#F4F1EA]">
              <span className="font-semibold">{t('voice.language')}:</span>
              <span className="font-bold text-[#0F2E24] uppercase">{language}</span>
            </div>

            <div className="py-4">
              <button
                type="button"
                onClick={handleToggleListening}
                aria-label={voiceState === 'LISTENING' ? t('voice.stopListening') : t('voice.startListening')}
                className={`relative w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all duration-200 shadow-md ${
                  voiceState === 'LISTENING'
                    ? 'bg-[#C8553D] text-white ring-8 ring-[#C8553D]/20 animate-pulse'
                    : 'bg-[#9BE564] hover:bg-[#8BD454] text-[#0F2E24] hover:scale-105'
                }`}
              >
                {voiceState === 'LISTENING' ? (
                  <MicOff className="w-10 h-10" />
                ) : (
                  <Mic className="w-10 h-10" />
                )}
              </button>

              <div className="mt-4">
                <span className="text-sm font-bold text-[#0F2E24] block">
                  {voiceState === 'LISTENING'
                    ? t('voice.listening')
                    : voiceState === 'PROCESSING'
                    ? t('voice.processing')
                    : t('voice.startListening')}
                </span>
                <span className="text-[11px] text-[#787266] mt-0.5 block">
                  {isSpeechSupported ? t('voice.speechEnabled') : t('voice.speechDisabled')}
                </span>
              </div>
            </div>

            {/* Session Privacy Footer */}
            <div className="pt-3 border-t border-[#F4F1EA] text-[11px] text-[#787266] flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1C4A3A]" />
              <span>{t('voice.sessionOnlyNotice')}</span>
            </div>
          </div>

          {/* Recommended Agricultural Quick Actions */}
          <div className="p-5 bg-white rounded-2xl border border-[#E7E3D8] shadow-xs space-y-3">
            <h2 className="text-xs font-bold text-[#0F2E24] uppercase tracking-wider">
              {t('voice.va_quick')}
            </h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <button
                  key={action.key}
                  type="button"
                  onClick={() => handleProcessQuery(action.query)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-[#E7E3D8] hover:border-[#1C4A3A] hover:bg-[#F4FBF4] text-left transition-colors text-xs font-medium text-[#0F2E24]"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#E2F0D9] flex items-center justify-center shrink-0">
                    {action.icon}
                  </div>
                  <span className="flex-1 truncate">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Unified Conversation Stream & Text Bar */}
        <div className="lg:col-span-2 flex flex-col h-[580px] bg-white rounded-2xl border border-[#E7E3D8] shadow-xs overflow-hidden">
          {/* Conversation Header */}
          <div className="px-5 py-3.5 bg-[#FAF9F5] border-b border-[#E7E3D8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1C4A3A]" />
              <span className="text-xs font-bold text-[#0F2E24]">Grounded Agronomic Dialogue</span>
            </div>
            <div className="flex items-center gap-2">
              {voiceState === 'PROCESSING' && (
                <button
                  type="button"
                  onClick={handleStopGeneration}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFF9F8] border border-[#C8553D]/40 text-[#C8553D] hover:bg-[#FDE8E4] text-[11px] font-bold transition-colors"
                >
                  <Square className="w-3 h-3 fill-current" />
                  <span>{t('voice.stopGeneration')}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setMessages([{
                  id: `reset-${Date.now()}`,
                  sender: 'assistant',
                  text: t('voice.ready'),
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  category: 'general',
                  provenance: {
                    sourceName: 'Farmculture Agronomy Router',
                    retrievedAtIso: new Date().toISOString(),
                    isLive: true,
                    confidenceOrStatus: 'verified',
                  }
                }])}
                title="Clear Session History"
                className="p-1 rounded-md text-[#787266] hover:text-[#0F2E24] hover:bg-gray-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dialogue Message List */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-4 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#1C4A3A] text-white rounded-br-xs'
                      : 'bg-[#F4F1EA] text-[#0F2E24] border border-[#E7E3D8] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  
                  {/* Provenance and Attribution metadata for Assistant responses */}
                  {msg.sender === 'assistant' && msg.provenance && (
                    <div className="mt-3 pt-2.5 border-t border-[#E7E3D8] space-y-1.5 text-[10px] text-[#787266]">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3 h-3 text-[#1C4A3A]" />
                          <span className="font-semibold text-[#0F2E24]">
                            {msg.provenance.sourceName}
                          </span>
                          {msg.provenance.sourceUrl && (
                            <a
                              href={msg.provenance.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#1C4A3A] hover:underline inline-flex items-center"
                            >
                              <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                            </a>
                          )}
                        </div>

                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          msg.provenance.confidenceOrStatus === 'verified'
                            ? 'bg-[#E2F0D9] text-[#1C4A3A]'
                            : msg.provenance.confidenceOrStatus === 'abstain'
                            ? 'bg-[#FEE2E2] text-[#8B0000]'
                            : 'bg-[#FEF3C7] text-[#8C6D1F]'
                        }`}>
                          {msg.provenance.confidenceOrStatus === 'verified'
                            ? t('voice.verifiedSource')
                            : msg.provenance.confidenceOrStatus === 'abstain'
                            ? t('voice.abstainNotice')
                            : t('voice.estimatedModel')}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px]">
                        <span className="italic">
                          {t('voice.timeObserved')}: {new Date(msg.provenance.retrievedAtIso).toLocaleDateString()}
                        </span>
                        {isSynthesisSupported && (
                          <button
                            type="button"
                            onClick={() => speakAssistantResponse(msg.text, language)}
                            className="inline-flex items-center gap-1 text-[#1C4A3A] hover:underline font-semibold"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>{t('voice.readAloud')}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-[#787266] mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {/* Interim Speech Indicator */}
            {interimTranscript && (
              <div className="flex flex-col items-end">
                <div className="max-w-[85%] rounded-2xl p-3 bg-[#1C4A3A]/70 text-white text-xs italic">
                  <span>{interimTranscript}…</span>
                </div>
              </div>
            )}

            {/* Processing State with Stop Option */}
            {voiceState === 'PROCESSING' && (
              <div className="flex items-center justify-between gap-3 p-3 bg-[#F4FBF4] text-[#1C4A3A] rounded-xl text-xs border border-[#C8E6C9] w-fit">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{t('voice.processing')}</span>
                </div>
                <button
                  type="button"
                  onClick={handleStopGeneration}
                  className="text-[10px] font-bold text-[#C8553D] hover:underline ml-2"
                >
                  {t('voice.stopGeneration')}
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Unified Text Input Bar */}
          <form 
            onSubmit={handleFormSubmit}
            className="p-3 bg-[#FAF9F5] border-t border-[#E7E3D8] flex items-center gap-2"
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={t('voice.inputPlaceholder')}
              disabled={voiceState === 'PROCESSING'}
              className="flex-1 bg-white border border-[#E7E3D8] focus:border-[#1C4A3A] rounded-xl px-4 py-2 text-xs text-[#0F2E24] placeholder-[#787266] outline-none shadow-2xs"
            />
            {voiceState === 'PROCESSING' ? (
              <button
                type="button"
                onClick={handleStopGeneration}
                className="px-4 py-2 rounded-xl bg-[#C8553D] hover:bg-[#B3452E] text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>{t('voice.stopGeneration')}</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!textInput.trim()}
                className="px-4 py-2 rounded-xl bg-[#0F2E24] hover:bg-[#1C4A3A] disabled:bg-[#787266]/40 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('voice.sendQuery')}</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}