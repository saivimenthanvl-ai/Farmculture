import React from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  CloudSun,
  Activity,
  TrendingUp,
  FileText,
  Store,
  Layers,
  FileSpreadsheet,
  Thermometer,
  Headphones,
  LineChart,
  Plane,
  Droplets,
  QrCode,
  ShieldAlert,
  ArrowRight,
  Database,
  MapPin,
} from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import SEOHead from "@/components/SEOHead";

type CapabilityStatus = "AVAILABLE" | "BETA" | "DEMONSTRATION" | "PILOT" | "UNAVAILABLE";

interface ServiceItem {
  id: string;
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  status: CapabilityStatus;
  statusKey: string;
  descriptionKey: string;
  scopeKey: string;
  dataSource: string;
  geographicScope: string;
  isPrototype?: boolean;
}

interface ServiceCategory {
  titleKey: string;
  descKey: string;
  services: ServiceItem[];
}

export const ServicesPage: React.FC = () => {
  const { t } = useLocalization();

  const categories: ServiceCategory[] = [
    {
      titleKey: "services.catCore",
      descKey: "services.catCoreDesc",
      services: [
        {
          id: "crop-diagnosis",
          title: t("crop_diagnosis"),
          path: "/crop-diagnosis",
          icon: Camera,
          status: "AVAILABLE",
          statusKey: "services.statusAvailable",
          descriptionKey: "services.cropDiagDesc",
          scopeKey: "services.cropDiagScope",
          dataSource: "On-device / Cloud Image Inference Engine",
          geographicScope: "Global (Field Foliage Imagery)",
        },
        {
          id: "weather-insights",
          title: t("weather_insights"),
          path: "/weather",
          icon: CloudSun,
          status: "AVAILABLE",
          statusKey: "services.statusAvailable",
          descriptionKey: "services.weatherDesc",
          scopeKey: "services.weatherScope",
          dataSource: "Open-Meteo Numerical Prediction Telemetry",
          geographicScope: "Global Coordinates (Hyperlocal Lat/Lon)",
        },
        {
          id: "crop-health",
          title: t("crop_health_monitor"),
          path: "/crop-health",
          icon: Activity,
          status: "BETA",
          statusKey: "services.statusBeta",
          descriptionKey: "services.healthDesc",
          scopeKey: "services.healthScope",
          dataSource: "Multispectral Remote Sensing Simulation",
          geographicScope: "Selected Pilot Agricultural Zones",
        },
      ],
    },
    {
      titleKey: "services.catMarket",
      descKey: "services.catMarketDesc",
      services: [
        {
          id: "market-prices",
          title: t("market_prices"),
          path: "/market-prices",
          icon: TrendingUp,
          status: "AVAILABLE",
          statusKey: "services.statusAvailable",
          descriptionKey: "services.marketDesc",
          scopeKey: "services.marketScope",
          dataSource: "APMC State Mandis / DMI Agmarknet Bulletin",
          geographicScope: "India (State Mandis) + Global FX Benchmark",
        },
        {
          id: "govt-schemes",
          title: t("govt_schemes"),
          path: "/schemes",
          icon: FileText,
          status: "AVAILABLE",
          statusKey: "services.statusAvailable",
          descriptionKey: "services.schemesDesc",
          scopeKey: "services.schemesScope",
          dataSource: "Ministry of Agriculture & State Portals",
          geographicScope: "India (Central & State Level Grants)",
        },
        {
          id: "buyer-directory",
          title: t("restaurants"),
          path: "/restaurants",
          icon: Store,
          status: "AVAILABLE",
          statusKey: "services.statusAvailable",
          descriptionKey: "services.directoryDesc",
          scopeKey: "services.directoryScope",
          dataSource: "Verified Commercial Buyer Directory",
          geographicScope: "Participating Metro & Regional Markets",
        },
      ],
    },
    {
      titleKey: "services.catOperations",
      descKey: "services.catOperationsDesc",
      services: [
        {
          id: "farm-records",
          title: t("navigation.farms"),
          path: "/dashboard?tab=farms",
          icon: Layers,
          status: "AVAILABLE",
          statusKey: "services.statusAvailable",
          descriptionKey: "services.farmRecordsDesc",
          scopeKey: "services.farmRecordsScope",
          dataSource: "User-authenticated Cloud Database (Firestore)",
          geographicScope: "Global (Encrypted User Plots)",
        },
        {
          id: "crop-records",
          title: t("navigation.cropRecords"),
          path: "/dashboard?tab=crops",
          icon: FileSpreadsheet,
          status: "AVAILABLE",
          statusKey: "services.statusAvailable",
          descriptionKey: "services.cropRecordsDesc",
          scopeKey: "services.cropRecordsScope",
          dataSource: "Field Sowing Records & Harvest Timelines",
          geographicScope: "User Farm Plots",
        },
        {
          id: "cold-storage",
          title: t("cold_storage"),
          path: "/storage",
          icon: Thermometer,
          status: "AVAILABLE",
          statusKey: "services.statusAvailable",
          descriptionKey: "services.storageDesc",
          scopeKey: "services.storageScope",
          dataSource: "National Cold Chain Logistics Registry",
          geographicScope: "Regional Agricultural Warehouses",
        },
        {
          id: "support-center",
          title: t("footerNav.supportCommunity"),
          path: "/contact",
          icon: Headphones,
          status: "AVAILABLE",
          statusKey: "services.statusAvailable",
          descriptionKey: "services.supportDesc",
          scopeKey: "services.supportScope",
          dataSource: "Farmculture Support Desk",
          geographicScope: "Platform-wide Help Desk",
        },
      ],
    },
    {
      titleKey: "services.catExperimental",
      descKey: "services.catExperimentalDesc",
      services: [
        {
          id: "market-predictor",
          title: t("market_predictor"),
          path: "/market-predictor",
          icon: LineChart,
          status: "DEMONSTRATION",
          statusKey: "services.statusDemonstration",
          descriptionKey: "services.predictorDesc",
          scopeKey: "services.predictorScope",
          dataSource: "Seasonal Arrival Correlation Heuristic",
          geographicScope: "Selected Benchmark Commodities",
          isPrototype: true,
        },
        {
          id: "drone-monitoring",
          title: t("navigation.drones"),
          path: "/drones",
          icon: Plane,
          status: "PILOT",
          statusKey: "services.statusPilot",
          descriptionKey: "services.dronesDesc",
          scopeKey: "services.dronesScope",
          dataSource: "Synthetic Flight Trajectory & Survey Simulation",
          geographicScope: "Simulated Demonstration Flights",
          isPrototype: true,
        },
        {
          id: "smart-irrigation",
          title: t("navigation.irrigation"),
          path: "/smart-irrigation",
          icon: Droplets,
          status: "BETA",
          statusKey: "services.statusBeta",
          descriptionKey: "services.irrigationDesc",
          scopeKey: "services.irrigationScope",
          dataSource: "Moisture Threshold Algorithmic Model",
          geographicScope: "Simulated Automated Valve Systems",
          isPrototype: true,
        },
        {
          id: "product-passport",
          title: t("navigation.traceability"),
          path: "/traceability",
          icon: QrCode,
          status: "PILOT",
          statusKey: "services.statusPilot",
          descriptionKey: "services.traceabilityDesc",
          scopeKey: "services.traceabilityScope",
          dataSource: "Verifiable Batch Ledger Prototype",
          geographicScope: "Demonstration Supply Batches",
          isPrototype: true,
        },
      ],
    },
  ];

  const getStatusBadge = (status: CapabilityStatus, label: string) => {
    switch (status) {
      case "AVAILABLE":
        return <Badge variant="lime" dot>{label}</Badge>;
      case "BETA":
        return <Badge variant="warning" dot>{label}</Badge>;
      case "DEMONSTRATION":
        return <Badge variant="outline">{label}</Badge>;
      case "PILOT":
        return <Badge variant="warning">{label}</Badge>;
      default:
        return <Badge variant="default">{label}</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 text-[#0F2E24] py-4">
      <SEOHead
        title="Agricultural Service Portfolio & Operational Readiness"
        description="Comprehensive directory of Farmculture AI's agronomic capabilities, verification status, data sources, and precision models."
        canonicalPath="/services"
      />
      {/* Page Header — Aligned with Reference B */}
      <div className="space-y-3 pb-6 border-b border-[#E7E3D8]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C4A3A]/10 text-[#1C4A3A] text-xs font-semibold tracking-wide uppercase">
          <span>{t("services.badge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-[#0F2E24]">
          {t("services.title")}
        </h1>
        <p className="text-sm sm:text-base text-[#787266] max-w-3xl leading-relaxed">
          {t("services.subtitle")}
        </p>
      </div>

      {/* Categorized Sections */}
      <div className="space-y-12">
        {categories.map((cat, idx) => (
          <section key={idx} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F2E24]">
                {t(cat.titleKey)}
              </h2>
              <p className="text-xs sm:text-sm text-[#787266]">
                {t(cat.descKey)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.services.map((svc) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={svc.id}
                    className="agri-card p-5 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-3">
                      {/* Top Row: Icon + Truthful Status Badge */}
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#E8F3EE] flex items-center justify-center text-[#1C4A3A]">
                          <Icon className="w-5 h-5" />
                        </div>
                        {getStatusBadge(svc.status, t(svc.statusKey))}
                      </div>

                      {/* Service Name & Description */}
                      <div>
                        <h3 className="font-bold text-base text-[#0F2E24] font-display">
                          {svc.title}
                        </h3>
                        <p className="text-xs text-[#787266] mt-1.5 leading-relaxed">
                          {t(svc.descriptionKey)}
                        </p>
                      </div>

                      {/* Technical Provenance / Metadata */}
                      <div className="pt-2 border-t border-[#E7E3D8] space-y-1.5 text-[11px] text-[#787266]">
                        <div className="flex items-start gap-1.5">
                          <Database className="w-3.5 h-3.5 text-[#1C4A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-[#0F2E24]">{t("services.dataSource")}</strong>{" "}
                            {svc.dataSource}
                          </span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#1C4A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-[#0F2E24]">Coverage:</strong>{" "}
                            {svc.geographicScope}
                          </span>
                        </div>
                      </div>

                      {/* Operational Scope & Honest Limitations */}
                      <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-[#E7E3D8] flex items-start gap-2 text-[11px] text-[#787266]">
                        <ShieldAlert className="w-3.5 h-3.5 text-[#E9A23B] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#0F2E24]">{t("services.operationalScope")}</strong>{" "}
                          {t(svc.scopeKey)}
                        </span>
                      </div>
                    </div>

                    {/* Functional Navigation Action */}
                    <div className="pt-3 border-t border-[#E7E3D8]">
                      <Link to={svc.path}>
                        <Button
                          variant={svc.isPrototype ? "secondary" : "accent"}
                          size="sm"
                          className="w-full"
                          icon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          {svc.isPrototype ? t("services.explorePrototype") : t("services.accessTool")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
