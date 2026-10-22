import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Upload,
  AlertCircle,
  CheckCircle,
  Loader,
  ShieldAlert,
  Info,
  History,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  Leaf,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
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
  const { t } = useLocalization();
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
        setValidationError(validation.error || "Invalid file format");
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E3D8]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C4A3A]">
              Agronomic Pathology Lab
            </span>
            <span className="text-[#A8A092]">·</span>
            <Badge variant="lime" dot>
              AI Vision Model Active
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2E24] tracking-tight font-display">
            {t("cropDiag.title") || "Crop Disease Foliar Diagnosis"}
          </h1>
          <p className="text-xs sm:text-sm text-[#787266] mt-0.5">
            {t("cropDiag.subtitle") || "Instant chromatic leaf diagnostic scanning with KVK agronomist advisory workflows."}
          </p>
        </div>

        {user?.uid && (
          <button
            onClick={() => setShowHistory((v) => !v)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E7E3D8] hover:border-[#1C4A3A] text-xs font-bold text-[#0F2E24] transition-colors shadow-2xs self-start sm:self-auto"
          >
            <History className="w-4 h-4 text-[#1C4A3A]" />
            <span>{showHistory ? "Diagnostic Scanner" : `History (${history.length})`}</span>
          </button>
        )}
      </div>

      {showHistory ? (
        /* Authenticated History View */
        <div className="agri-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E3D8]">
            <h3 className="font-bold text-[#0F2E24] text-sm">Your Diagnostic Inspection Records</h3>
            <span className="text-[11px] text-[#787266] font-mono">Owner UID: {user?.uid.slice(0, 8)}...</span>
          </div>

          {historyLoading ? (
            <div className="py-12 text-center text-xs text-[#787266]">
              <Loader className="w-6 h-6 animate-spin mx-auto text-[#1C4A3A] mb-2" />
              <span>Retrieving cloud-verified assessment history...</span>
            </div>
          ) : history.length === 0 ? (
            <div className="py-12 text-center rounded-xl border border-dashed border-[#D3CDC0] bg-[#FAF9F5]">
              <Camera className="w-8 h-8 text-[#A8A092] mx-auto mb-2" />
              <p className="text-xs font-bold text-[#0F2E24]">No previous assessments found</p>
              <p className="text-[11px] text-[#787266] mt-1">Scan a crop leaf photograph to store your first diagnostic record.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((record) => (
                <div key={record.id} className="p-4 bg-[#FAF9F5] hover:bg-white rounded-xl border border-[#E7E3D8] text-xs transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#787266] uppercase">{record.crop || "Specimen"}</span>
                      <h4 className="font-bold text-[#0F2E24] text-sm mt-0.5">{record.condition}</h4>
                    </div>
                    <Badge variant={record.severity === "high" ? "danger" : record.severity === "medium" ? "warning" : "success"}>
                      {record.severity?.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <p className="text-[#787266] mt-2 line-clamp-2 leading-relaxed">{record.treatment}</p>
                  <div className="mt-3 pt-2 border-t border-[#E7E3D8] flex items-center justify-between text-[11px] text-[#A8A092]">
                    <span className="font-mono">{new Date(record.createdAt).toLocaleDateString()}</span>
                    <span className="text-[#1C4A3A] font-semibold">Record: {record.id.slice(0, 10)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Main Diagnostic Scanner */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Drag & Drop Upload Area (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="agri-card p-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#787266] mb-3">
                Specimen Leaf Photography
              </h2>

              {validationError && (
                <div className="p-3 mb-3 bg-[#FAECE9] border border-[#C8553D]/40 rounded-xl flex items-start gap-2.5 text-xs text-[#C8553D]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Upload Drop Zone */}
              <div
                className="border-2 border-dashed border-[#D3CDC0] hover:border-[#1C4A3A] rounded-2xl p-6 text-center cursor-pointer transition-all bg-[#FAF9F5] hover:bg-white"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                }}
              >
                {selectedImage ? (
                  <div className="space-y-3">
                    <img
                      ref={imageElementRef}
                      src={selectedImage}
                      alt="Selected crop leaf"
                      crossOrigin="anonymous"
                      className="w-full max-h-64 object-contain mx-auto rounded-xl shadow-xs"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="text-xs font-bold text-[#1C4A3A] hover:underline"
                      type="button"
                    >
                      Change Specimen Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 py-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#E7E3D8] flex items-center justify-center mx-auto text-[#1C4A3A] shadow-xs">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0F2E24]">{t("cropDiag.dropPrompt") || "Drop leaf photo or tap to capture"}</p>
                      <p className="text-[11px] text-[#787266] mt-0.5">JPEG, PNG, WebP up to 5MB</p>
                    </div>
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

              {/* Action Button */}
              {selectedImage && !assessment && (
                <button
                  onClick={analyzeCrop}
                  disabled={isAnalyzing}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0F2E24] hover:bg-[#1C4A3A] disabled:bg-[#A8A092] text-white text-xs font-bold transition-all shadow-xs"
                  type="button"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Inspecting Chlorophyll &amp; Lesions...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#9BE564]" />
                      <span>Execute Foliar Diagnostic Scan</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Specimen Tips */}
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] text-xs text-[#787266] space-y-1.5">
              <span className="font-bold text-[#0F2E24] block">Foliar Inspection Standard</span>
              <p>• Photograph leaf in natural indirect daylight.</p>
              <p>• Center visible pustules, blight halos, or necrotic lesions.</p>
              <p>• Avoid photographing soil, boots, or shadowed canopy.</p>
            </div>
          </div>

          {/* Right Column: Diagnostic Results & Treatment Card (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Initial Blank State */}
            {!assessment && !isAnalyzing && (
              <div className="agri-card p-8 text-center space-y-3">
                <Leaf className="w-10 h-10 text-[#3E8E8A] mx-auto opacity-70" />
                <h3 className="text-sm font-bold text-[#0F2E24]">Diagnostic Assessment Waiting</h3>
                <p className="text-xs text-[#787266] max-w-sm mx-auto leading-relaxed">
                  Upload a crop photograph on the left to initiate computer vision foliar analysis with automated diagnostic abstention.
                </p>
              </div>
            )}

            {/* Abstention Card */}
            {assessment && assessment.status === "abstain" && (
              <div className="agri-card p-6 border-l-4 border-l-[#E9A23B] space-y-4">
                <div className="flex items-center gap-3 text-[#E9A23B]">
                  <ShieldAlert className="w-6 h-6 shrink-0" />
                  <h3 className="text-base font-bold text-[#0F2E24]">Diagnostic Abstention Triggered</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
                  {assessment.explanation}
                </p>
                <Callout variant="warning" title="Quality Assurance Rule">
                  To prevent pesticide misapplication, our vision engine refuses to diagnose images that lack clear botanical foliage or distinct lesion patterns.
                </Callout>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setAssessment(null);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1C4A3A] hover:underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Upload another photograph</span>
                </button>
              </div>
            )}

            {/* Diagnosed Results Card */}
            {assessment && assessment.status === "diagnosed" && (
              <div className="agri-card p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E3D8]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#787266]">
                      Host Crop: {assessment.crop}
                    </span>
                    <h3 className="text-lg font-bold text-[#0F2E24] mt-0.5">
                      {assessment.condition}
                    </h3>
                  </div>
                  <Badge
                    variant={
                      assessment.severity === "high"
                        ? "danger"
                        : assessment.severity === "medium"
                        ? "warning"
                        : "success"
                    }
                  >
                    {assessment.severity?.toUpperCase()} SEVERITY
                  </Badge>
                </div>

                {/* Confidence Bar */}
                <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#787266] font-medium">Confidence Rating</span>
                    <span className="font-mono font-bold text-[#0F2E24]">{assessment.confidence}%</span>
                  </div>
                  <div className="w-full bg-[#E7E3D8] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#2F9E6B] h-2 rounded-full"
                      style={{ width: `${assessment.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Recommended Treatment Steps */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#787266] mb-1">
                      Agronomic Treatment Plan
                    </h4>
                    <p className="text-xs sm:text-sm text-[#0F2E24] bg-[#FAF9F5] p-3 rounded-xl border border-[#E7E3D8] leading-relaxed">
                      {assessment.treatment}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#787266] mb-1">
                      Preventive Canopy Management
                    </h4>
                    <p className="text-xs sm:text-sm text-[#787266] leading-relaxed">
                      {assessment.prevention}
                    </p>
                  </div>
                </div>

                {/* Ask a KVK Expert CTA */}
                <div className="p-4 rounded-xl bg-[#0F2E24] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-[#9BE564]">Need In-Person Verification?</div>
                    <div className="text-[11px] text-emerald-100">
                      Connect directly with your nearest Krishi Vigyan Kendra (KVK) Agronomist.
                    </div>
                  </div>
                  <a
                    href="tel:18001801551"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#9BE564] text-[#0F2E24] font-bold text-xs hover:bg-[#8BD853] transition-colors shrink-0"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Kisan Helpline</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropDiagnosis;
