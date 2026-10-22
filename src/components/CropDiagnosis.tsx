import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload, AlertCircle, CheckCircle, Loader, ShieldAlert, Info, History, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  validateCropImage,
  analyzeCropLeaf,
  DiagnosisAssessment,
  AssessmentRecord,
  saveAssessmentRecord,
  uploadCropAssessmentImage,
  getUserAssessmentHistory,
} from "@/lib/cropDiagnosisService";

export const CropDiagnosis: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessment, setAssessment] = useState<DiagnosisAssessment | null>(null);
  const [persisting, setPersisting] = useState(false);
  const [persistedId, setPersistedId] = useState<string | null>(null);

  // History Tab / State
  const [history, setHistory] = useState<AssessmentRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageElementRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (user?.uid) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user?.uid) return;
    setHistoryLoading(true);
    try {
      const records = await getUserAssessmentHistory(user.uid);
      setHistory(records);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValidationError(null);
    setAssessment(null);
    setPersistedId(null);

    if (file) {
      const validation = validateCropImage(file);
      if (!validation.valid) {
        setValidationError(validation.error || "Invalid file");
        setSelectedImage(null);
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCrop = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setAssessment(null);
    setValidationError(null);
    setPersistedId(null);

    try {
      const img = imageElementRef.current;
      const result = await analyzeCropLeaf(img || {});
      setAssessment(result);

      // If user is authenticated and diagnosis was reached, persist to user's assessment history
      if (user?.uid && result.status !== "abstain") {
        setPersisting(true);
        try {
          let downloadUrl: string | null = null;
          if (selectedFile) {
            downloadUrl = await uploadCropAssessmentImage(selectedFile, user.uid, `diag_${Date.now()}`);
          }
          const saveRes = await saveAssessmentRecord(user.uid, result, downloadUrl);
          if (saveRes.success && saveRes.id) {
            setPersistedId(saveRes.id);
            await loadHistory();
          }
        } finally {
          setPersisting(false);
        }
      }
    } catch {
      setValidationError("Failed to process image. Please try again with another photo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityBadge = (severity?: "low" | "medium" | "high") => {
    switch (severity) {
      case "low":
        return <span className="px-3 py-1 rounded-full text-xs font-semibold text-green-700 bg-green-100">LOW RISK</span>;
      case "medium":
        return <span className="px-3 py-1 rounded-full text-xs font-semibold text-yellow-800 bg-yellow-100">MODERATE RISK</span>;
      case "high":
        return <span className="px-3 py-1 rounded-full text-xs font-semibold text-red-700 bg-red-100">HIGH RISK</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t("cropDiag.title")}
        </h2>
        <p className="text-gray-600">{t("cropDiag.subtitle")}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs rounded-full font-medium border border-emerald-200">
            <Info className="w-3.5 h-3.5" />
            <span>Evidence-Based Inspection &amp; Abstention Enabled</span>
          </div>
          {user?.uid && (
            <button
              onClick={() => setShowHistory((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full font-medium transition-colors"
              type="button"
            >
              <History className="w-3.5 h-3.5" />
              <span>{showHistory ? "Back to Scanner" : `My Diagnostic History (${history.length})`}</span>
            </button>
          )}
        </div>
      </div>

      {showHistory ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <h3 className="font-bold text-gray-800 text-base">Your Diagnostic Records</h3>
            <span className="text-xs text-gray-500 font-mono">Owner UID: {user?.uid.slice(0, 6)}...</span>
          </div>

          {historyLoading ? (
            <div className="py-8 text-center text-sm text-gray-500">
              <Loader className="w-6 h-6 animate-spin mx-auto text-emerald-600 mb-2" />
              <span>Retrieving authenticated assessment history...</span>
            </div>
          ) : history.length === 0 ? (
            <div className="py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">No previous assessments found</p>
              <p className="text-xs text-gray-500 mt-1">Scan a crop leaf photograph to store your first diagnostic record.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((record) => (
                <div key={record.id} className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-sm transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">{record.crop || "Unknown Crop"}</span>
                      <h4 className="font-bold text-gray-900">{record.condition}</h4>
                    </div>
                    {getSeverityBadge(record.severity)}
                  </div>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">{record.treatment}</p>
                  <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="font-mono">{new Date(record.createdAt).toLocaleDateString()}</span>
                    <span className="text-emerald-700 font-medium">Record ID: {record.id.slice(0, 10)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
      <div className="space-y-6">
        {/* Error message */}
        {validationError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-red-800">Validation Notice</h4>
              <p className="text-sm text-red-700 mt-0.5">{validationError}</p>
            </div>
          </div>
        )}

        {/* Image Upload Area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-500 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
        >
          {selectedImage ? (
            <div className="space-y-4">
              <img
                ref={imageElementRef}
                src={selectedImage}
                alt="Selected crop leaf"
                crossOrigin="anonymous"
                className="w-full max-h-80 object-contain mx-auto rounded-lg shadow-md"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="text-green-600 hover:text-green-700 font-medium text-sm inline-block"
                type="button"
              >
                Change Image
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <Camera className="w-12 h-12 text-gray-400" />
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">{t("cropDiag.dropPrompt")}</p>
              <p className="text-xs text-gray-400">Supported: JPEG, PNG, WebP (max 5MB)</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          onChange={handleImageUpload}
          className="hidden"
        />

        {!selectedImage && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            type="button"
          >
            {t("cropDiag.cta")}
          </button>
        )}

        {selectedImage && !assessment && (
          <button
            onClick={analyzeCrop}
            disabled={isAnalyzing}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            type="button"
          >
            {isAnalyzing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Evaluating Image Quality &amp; Foliage...</span>
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                <span>Analyze Plant Specimen</span>
              </>
            )}
          </button>
        )}

        {/* Abstention State */}
        {assessment && assessment.status === "abstain" && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-amber-800">
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
              <h3 className="text-lg font-bold">Diagnosis Abstained</h3>
            </div>
            <p className="text-sm text-amber-900 leading-relaxed">
              {assessment.explanation}
            </p>
            <div className="bg-white/80 p-3 rounded-lg border border-amber-200 text-xs text-amber-800 space-y-1">
              <p className="font-semibold">Guidelines for a valid diagnosis:</p>
              <ul className="list-disc list-inside space-y-0.5 text-gray-700">
                <li>Take a close-up photograph of an actual plant leaf or fruit.</li>
                <li>Avoid blurry shots, non-plant objects, animals, or dark environments.</li>
                <li>Ensure the affected spots or discoloration are clearly visible.</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setSelectedImage(null);
                setAssessment(null);
              }}
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline"
            >
              Upload another photograph
            </button>
          </div>
        )}

        {/* Diagnosis Results */}
        {assessment && assessment.status === "diagnosed" && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Crop: {assessment.crop}
                </span>
                <h3 className="text-xl font-bold text-gray-800">
                  {assessment.condition}
                </h3>
              </div>
              {getSeverityBadge(assessment.severity)}
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Confidence Rating</span>
                  <span className="font-semibold text-gray-700">{assessment.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${assessment.confidence}%` }}
                  />
                </div>
                <p className="text-xs text-amber-700 mt-2">
                  ⚠️ Preliminary heuristic assessment. Not a verified agronomic lab result.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Recommended Action</h4>
                <p className="text-gray-700 leading-relaxed">{assessment.treatment}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Preventive Practices</h4>
                <p className="text-gray-700 leading-relaxed">{assessment.prevention}</p>
              </div>

              <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
                <span>Engine: {assessment.provenance.engine}</span>
                <span className="text-gray-400 font-mono">{new Date(assessment.provenance.timestamp).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-700 text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Inspection complete</span>
              </div>
              {persisting ? (
                <span className="text-xs text-emerald-600 flex items-center gap-1">
                  <Loader className="w-3.5 h-3.5 animate-spin" /> Saving record...
                </span>
              ) : persistedId ? (
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-medium">
                  Persisted to History
                </span>
              ) : null}
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default CropDiagnosis;
