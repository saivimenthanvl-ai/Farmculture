import React, { useState, useEffect } from "react";
import {
  Package,
  Truck,
  Store,
  QrCode,
  Shield,
  Clock,
  MapPin,
  CheckCircle,
  Copy,
  ExternalLink,
  Check,
  X,
  FileCheck2,
} from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";

interface TraceabilityRecord {
  id: string;
  productName: string;
  batchId: string;
  farmer: {
    name: string;
    location: string;
    avatar: string;
    certification: string[];
  };
  journey: Array<{
    stage: string;
    stageKey: "planting" | "harvesting" | "processing" | "transportation" | "retail";
    timestamp: string;
    location: string;
    handler: string;
    txHash: string;
    temperature?: number;
    quality: number;
    verified: boolean;
  }>;
  currentStatus: string;
  qrCode: string;
  certificates: string[];
  sustainabilityScore: number;
}

export const BlockchainTraceability: React.FC = () => {
  const { t, interfaceLocale } = useLocalization();
  const [selectedProduct, setSelectedProduct] = useState<TraceabilityRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const mockRecord: TraceabilityRecord = {
      id: "1",
      productName: t("trace.productLabel") || "Organic Table Tomatoes",
      batchId: "TOM-2026-IN-482",
      farmer: {
        name: "Rohit Pandey",
        location: "Thane Rural, Maharashtra, India",
        avatar: "RP",
        certification: [
          t("trace.tags.organic") || "NPOP Organic India",
          t("trace.tags.fairTrade") || "Fair Trade Certified",
          t("trace.tags.sustainable") || "Zero Chemical Residue",
        ],
      },
      journey: [
        {
          stage: t("trace.stages.planting") || "Planting & Organic Soil Prep",
          stageKey: "planting",
          timestamp: "2026-08-15T08:00:00Z",
          location: "Plot 4A, Thane Agro Zone",
          handler: "Rohit Pandey (Lead Agronomist)",
          txHash: "0x8f2a9d18c4e61b72a095f3cdb71410889c20a4b1",
          quality: 100,
          verified: true,
        },
        {
          stage: t("trace.stages.harvesting") || "Harvesting & Sorting",
          stageKey: "harvesting",
          timestamp: "2026-10-10T06:30:00Z",
          location: "Farm Packhouse - Thane",
          handler: "Rohit Pandey & Harvest Crew",
          txHash: "0x3c7e41b9d09a56f2e811ca4790b52e391cf81903",
          temperature: 23,
          quality: 98,
          verified: true,
        },
        {
          stage: t("trace.stages.processing") || "Cleaning, Grading & QR Tagging",
          stageKey: "processing",
          timestamp: "2026-10-10T14:00:00Z",
          location: "AgriPack Center, Nashik Hub",
          handler: "AgriPack Grading Unit 2",
          txHash: "0x91d4e082cb75f190e381ca09f4852934bda1024e",
          temperature: 18,
          quality: 97,
          verified: true,
        },
        {
          stage: t("trace.stages.transportation") || "Reefer Cold Chain Transport",
          stageKey: "transportation",
          timestamp: "2026-10-11T09:00:00Z",
          location: "In Transit: NH-48 Express Corridor",
          handler: "ColdChain Logistics Fleet #14",
          txHash: "0x4e0819fa2b73cd68190bda33246a89c204918e77",
          temperature: 4.8,
          quality: 96,
          verified: true,
        },
        {
          stage: t("trace.stages.retail") || "Wholesale Mandi & Retail Ingestion",
          stageKey: "retail",
          timestamp: "2026-10-12T11:00:00Z",
          location: "Vashi APMC Terminal 3, Navi Mumbai",
          handler: "FarmFresh Wholesale Outlets",
          txHash: "0x1b72a095f3cdb71410889c20a4b18f2a9d18c4e6",
          temperature: 5.2,
          quality: 95,
          verified: true,
        },
      ],
      currentStatus: t("trace.statusAvailable") || "Verified Available for Delivery",
      qrCode: "FC-PASSPORT-TOM-2026-IN-482",
      certificates: [
        t("trace.certList.organic") || "NPOP National Programme for Organic Production",
        t("trace.certList.quality") || "FSSAI Food Safety Compliance Certificate",
        t("trace.certList.coldChain") || "ISO 22000 Cold Chain Provenance",
      ],
      sustainabilityScore: 92,
    };

    const timer = setTimeout(() => {
      setSelectedProduct(mockRecord);
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [t]);

  const copyToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 1800);
  };

  const getStageIcon = (stageKey: string) => {
    switch (stageKey) {
      case "planting":
        return <Package className="w-4 h-4" />;
      case "harvesting":
        return <FileCheck2 className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "transportation":
        return <Truck className="w-4 h-4" />;
      case "retail":
        return <Store className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  if (loading || !selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center">
        <div className="w-10 h-10 border-3 border-[#9BE564] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-[#787266] font-medium">
          {t("trace.loadingRecords") || "Loading batch verification telemetry..."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Subtle dismissible prototype disclaimer */}
      {!bannerDismissed && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] text-xs text-[#787266]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E9A23B]" />
            <span>
              <strong>Sample Product Passport:</strong> This batch demonstrates immutable cryptographic ledger verification for agricultural commodities.
            </span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="p-1 text-[#A8A092] hover:text-[#0F2E24] rounded-md transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E3D8]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C4A3A]">
              Supply Chain Provenance
            </span>
            <span className="text-[#A8A092]">·</span>
            <Badge variant="lime" dot>
              {t("trace.statusAvailable") || "Verified Active"}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2E24] tracking-tight font-display">
            {t("trace.title") || "Agricultural Product Passport"}
          </h1>
          <p className="text-xs sm:text-sm text-[#787266] mt-0.5">
            Cryptographic batch history from seed preparation to terminal mandi ingestion.
          </p>
        </div>

        <button
          onClick={() => setShowQR(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9BE564] text-[#0F2E24] font-bold text-xs hover:bg-[#8BD853] transition-all shadow-xs self-start sm:self-auto"
        >
          <QrCode className="w-4 h-4" />
          <span>{t("trace.showQr") || "View QR Passport"}</span>
        </button>
      </div>

      {/* 2-Column Passport Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sticky Rail: Batch Passport & Farmer Credentials (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="agri-card p-5 space-y-4 sticky top-20">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#787266]">
                  Batch Identifier
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#E7E3D8] text-[#1C4A3A]">
                  {selectedProduct.batchId}
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#0F2E24] mt-1">{selectedProduct.productName}</h2>
            </div>

            {/* Farmer Card with Avatar */}
            <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1C4A3A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {selectedProduct.farmer.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F2E24]">{selectedProduct.farmer.name}</div>
                  <div className="flex items-center gap-1 text-[11px] text-[#787266]">
                    <MapPin className="w-3 h-3 text-[#1C4A3A]" />
                    <span>{selectedProduct.farmer.location}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {selectedProduct.farmer.certification.map((cert, i) => (
                  <Badge key={i} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sustainability Radial Score */}
            <div className="p-4 rounded-xl border border-[#E7E3D8] bg-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0F2E24] block">Sustainability Index</span>
                <span className="text-[11px] text-[#787266]">Water &amp; soil conservation</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-[#9BE564] flex items-center justify-center text-xs font-mono font-extrabold text-[#0F2E24]">
                {selectedProduct.sustainabilityScore}%
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#787266] mb-2">
                Audited Certifications
              </h3>
              <div className="space-y-1.5">
                {selectedProduct.certificates.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-[#FAF9F5] border border-[#E7E3D8] text-[11px] text-[#0F2E24]"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#2F9E6B] shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Vertical Timeline with Cryptographic Hashes (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="agri-card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E7E3D8]">
              <div>
                <h3 className="text-sm font-bold text-[#0F2E24]">
                  {t("trace.delivery") || "Chain of Custody & Batch Lifecycle"}
                </h3>
                <p className="text-[11px] text-[#787266]">
                  5 verified checkpoints recorded on distributed ledger
                </p>
              </div>
              <Badge variant="success">All Checkpoints Verified</Badge>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#E7E3D8] space-y-6 ml-3">
              {selectedProduct.journey.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Status dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#1C4A3A] flex items-center justify-center text-[#1C4A3A] shadow-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-[#2F9E6B]" />
                  </div>

                  {/* Stage card */}
                  <div className="p-4 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] hover:bg-white transition-all space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-white border border-[#E7E3D8] text-[#1C4A3A]">
                          {getStageIcon(step.stageKey)}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0F2E24]">{step.stage}</h4>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#787266]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {new Date(step.timestamp).toLocaleDateString(interfaceLocale, {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#A8A092] block">
                          Facility / Location
                        </span>
                        <span className="font-semibold text-[#0F2E24]">{step.location}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#A8A092] block">
                          Handler / Unit
                        </span>
                        <span className="font-semibold text-[#0F2E24]">{step.handler}</span>
                      </div>
                      {step.temperature !== undefined && (
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#A8A092] block">
                            Cold Chain Temp
                          </span>
                          <span className="font-mono font-bold text-[#1C4A3A]">
                            {step.temperature}°C
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Cryptographic Hash Chip */}
                    <div className="pt-2 border-t border-[#E7E3D8] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#787266]">
                        <span className="text-[#A8A092]">Hash:</span>
                        <span className="font-semibold text-[#0F2E24] bg-white px-2 py-0.5 rounded border border-[#E7E3D8]">
                          {step.txHash.slice(0, 8)}...{step.txHash.slice(-6)}
                        </span>
                        <button
                          onClick={() => copyToClipboard(step.txHash)}
                          className="p-1 text-[#787266] hover:text-[#0F2E24] transition-colors"
                          title="Copy ledger hash"
                          aria-label="Copy ledger hash"
                        >
                          {copiedHash === step.txHash ? (
                            <Check className="w-3 h-3 text-[#2F9E6B]" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>

                      <a
                        href={`https://etherscan.io/tx/${step.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1C4A3A] hover:underline"
                      >
                        <span>View Ledger Block</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Callout variant="success" title="End-to-End Cryptographic Seal">
            This batch has completed all 5 audited checkpoints. The consumer can scan the box QR code in any retail store to inspect soil quality test results and cold-chain temperature telemetry.
          </Callout>
        </div>
      </div>

      {/* QR Code Modal Dialog */}
      {showQR && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowQR(false)}
        >
          <div
            className="bg-white rounded-2xl border border-[#E7E3D8] shadow-2xl p-6 max-w-sm w-full text-center space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E7E3D8] pb-3">
              <h3 className="text-sm font-bold text-[#0F2E24]">Product Passport QR Code</h3>
              <button
                onClick={() => setShowQR(false)}
                className="p-1 rounded-md text-[#787266] hover:text-[#0F2E24]"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QR Mockup */}
            <div className="p-6 bg-[#FAF9F5] rounded-xl border border-[#E7E3D8] inline-block mx-auto">
              <div className="w-36 h-36 border-4 border-[#0F2E24] rounded-lg p-2 flex flex-col items-center justify-center bg-white">
                <QrCode className="w-24 h-24 text-[#0F2E24]" />
                <span className="text-[8px] font-mono font-bold mt-1 text-[#1C4A3A]">
                  SCAN FOR AUDIT
                </span>
              </div>
            </div>

            <div className="text-xs text-[#787266] space-y-1">
              <p className="font-mono font-bold text-[#0F2E24]">{selectedProduct.qrCode}</p>
              <p>Printable label for crates, bushel baskets, and retail packs.</p>
            </div>

            <button
              onClick={() => setShowQR(false)}
              className="w-full py-2.5 rounded-xl bg-[#0F2E24] text-white text-xs font-bold hover:bg-[#1C4A3A] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainTraceability;