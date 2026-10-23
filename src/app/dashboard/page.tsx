import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import { StatTile } from "@/components/ui/StatTile";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState, ErrorState } from "@/components/ui/EmptyState";
import { Skeleton, CardSkeleton } from "@/components/ui/Skeleton";
import {
  CloudSun,
  TrendingUp,
  AlertTriangle,
  Camera,
  ArrowRight,
  Plus,
  Tractor,
  FileSpreadsheet,
  History,
  Layers,
  MapPin,
  Calendar,
  Sparkles,
  Trash2,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

import { formatCurrencyAmount } from "@/lib/currencyService";
import {
  FarmRecord,
  CropRecord,
  getUserFarms,
  saveFarm,
  deleteFarm,
  getUserCropRecords,
  saveCropRecord,
} from "@/lib/farmService";
import {
  getUserAssessmentHistory,
  AssessmentRecord,
} from "@/lib/cropDiagnosisService";

export default function DashboardPage() {
  const { user, friendlyName } = useAuth();
  const { t, interfaceLocale, displayCurrency } = useLocalization();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab state derived from URL ?tab=farms | crops | overview
  const activeTab = searchParams.get("tab") || "overview";
  const setActiveTab = (tab: string) => {
    setSearchParams(tab === "overview" ? {} : { tab });
  };

  // Farmer Real Data States
  const [farms, setFarms] = useState<FarmRecord[]>([]);
  const [crops, setCrops] = useState<CropRecord[]>([]);
  const [assessments, setAssessments] = useState<AssessmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [isFarmModalOpen, setIsFarmModalOpen] = useState(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Farm Form State
  const [farmName, setFarmName] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [farmState, setFarmState] = useState("");
  const [farmAcres, setFarmAcres] = useState<number>(5);
  const [farmCrops, setFarmCrops] = useState("Tomato, Wheat");

  // Crop Form State
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [cropName, setCropName] = useState("Tomato");
  const [cropArea, setCropArea] = useState<number>(2.5);
  const [cropPlantingDate, setCropPlantingDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const farmerName = friendlyName || user?.displayName || user?.email?.split("@")[0] || "Farmer";

  // Load real user records from Firestore
  const loadUserData = async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [fetchedFarms, fetchedCrops, fetchedAssessments] = await Promise.all([
        getUserFarms(user.uid),
        getUserCropRecords(user.uid),
        getUserAssessmentHistory(user.uid),
      ]);
      setFarms(fetchedFarms);
      setCrops(fetchedCrops);
      setAssessments(fetchedAssessments);
      if (fetchedFarms.length > 0 && !selectedFarmId) {
        setSelectedFarmId(fetchedFarms[0].id);
      }
    } catch (err: any) {
      console.error("[Dashboard] Error fetching farm data:", err);
      setError("Unable to load cloud farm records. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [user]);

  // Handle Farm Creation
  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid || !farmName.trim()) return;
    setSubmitting(true);
    try {
      const res = await saveFarm(user.uid, {
        name: farmName.trim(),
        location: farmLocation.trim() || "Local Agro Zone",
        state: farmState.trim() || "National",
        totalAcres: Number(farmAcres) || 1,
        primaryCrops: farmCrops.split(",").map((c) => c.trim()).filter(Boolean),
        soilType: "Loamy alluvial",
        irrigationType: "Drip & Canal",
      });
      if (res.success) {
        setIsFarmModalOpen(false);
        setFarmName("");
        setFarmLocation("");
        await loadUserData();
      } else {
        alert(res.error || "Failed to create farm");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Crop Record Creation
  const handleCreateCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid || !cropName.trim()) return;
    setSubmitting(true);
    try {
      const res = await saveCropRecord(user.uid, {
        farmId: selectedFarmId || "default",
        cropName: cropName.trim(),
        areaAcres: Number(cropArea) || 1,
        plantingDate: cropPlantingDate,
        status: "vegetative",
      });
      if (res.success) {
        setIsCropModalOpen(false);
        await loadUserData();
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Farm Deletion
  const handleDeleteFarm = async (farmId: string) => {
    if (!user?.uid) return;
    if (window.confirm("Are you sure you want to remove this farm plot?")) {
      await deleteFarm(user.uid, farmId);
      await loadUserData();
    }
  };

  // Derived real KPIs (no imaginary numbers)
  const totalAcreage = farms.reduce((acc, f) => acc + (f.totalAcres || 0), 0);
  const totalPlots = farms.length;
  const activeCropCount = crops.length;
  const recentDiagnosticCount = assessments.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header and Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E3D8]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C4A3A]">
              Farmer Portal
            </span>
            <span className="text-[#A8A092]">·</span>
            <Badge variant="lime" dot>
              {user ? "Cloud Synchronized" : "Guest Mode"}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2E24] tracking-tight font-display">
            Welcome back, {farmerName}
          </h1>
          <p className="text-xs sm:text-sm text-[#787266] mt-0.5">
            Your centralized agricultural operational center. Real farm plots, crop health records, and mandi intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsFarmModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Farm Plot
          </Button>
          <Link to="/crop-diagnosis">
            <Button
              variant="primary"
              size="sm"
              icon={<Camera className="w-4 h-4" />}
            >
              Scan Foliage
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs (Overview, Farms, Crop Records) */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: "overview", label: "Farm Overview", icon: <Tractor className="w-3.5 h-3.5" /> },
          { id: "farms", label: "Registered Farms", count: totalPlots, icon: <Layers className="w-3.5 h-3.5" /> },
          { id: "crops", label: "Active Crop Records", count: activeCropCount, icon: <FileSpreadsheet className="w-3.5 h-3.5" /> },
        ]}
      />

      {error && (
        <ErrorState
          title="Data Synchronization Notice"
          message={error}
          onRetry={loadUserData}
        />
      )}

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Top Row: Authentic User KPIs (No synthetic claims) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile
              title="Registered Farms"
              value={loading ? "…" : totalPlots}
              unit="Plots"
              delta={totalPlots === 0 ? "No plots added" : "Active production"}
              deltaType="neutral"
              icon={Tractor}
              subtitle="Owner authenticated"
            />
            <StatTile
              title="Total Cultivated Land"
              value={loading ? "…" : totalAcreage}
              unit="Acres"
              delta={totalAcreage > 0 ? "Under management" : "Awaiting farm entry"}
              deltaType="neutral"
              icon={Layers}
              subtitle="Registered area"
            />
            <StatTile
              title="Active Crop Cycles"
              value={loading ? "…" : activeCropCount}
              unit="Crops"
              delta={activeCropCount > 0 ? "Field monitoring active" : "No crops tracked"}
              deltaType="neutral"
              icon={FileSpreadsheet}
              subtitle="Seasonal plantings"
            />
            <StatTile
              title="Foliar Inspections"
              value={loading ? "…" : recentDiagnosticCount}
              unit="Scans"
              delta={recentDiagnosticCount > 0 ? "Assessment log active" : "Zero diagnostic history"}
              deltaType="neutral"
              icon={History}
              subtitle="AI vision log"
            />
          </div>

          {/* If farmer has no farms, show actionable empty state */}
          {!loading && totalPlots === 0 ? (
            <EmptyState
              icon={<Tractor className="w-8 h-8 text-[#1C4A3A]" />}
              title="Welcome to Your Farm Hub! No Farms Registered Yet"
              description="Register your first agricultural land plot to track cultivated acreage, monitor localized weather telemetry, and log crop health."
              action={{
                label: "Register First Farm Plot",
                onClick: () => setIsFarmModalOpen(true),
                icon: <Plus className="w-4 h-4" />,
              }}
            />
          ) : (
            /* Farm Overview Details */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Registered Plots List (2 cols) */}
              <div className="agri-card p-5 lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E3D8]">
                  <div>
                    <h3 className="text-sm font-bold text-[#0F2E24]">Your Agricultural Land Holdings</h3>
                    <p className="text-[11px] text-[#787266]">Authenticated cloud records</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFarmModalOpen(true)}
                    icon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Add Plot
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {farms.map((f) => (
                    <div
                      key={f.id}
                      className="p-4 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] hover:bg-white transition-all space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-bold text-[#0F2E24]">{f.name}</h4>
                          <span className="text-[10px] font-mono font-bold text-[#1C4A3A] bg-white px-2 py-0.5 rounded border border-[#E7E3D8]">
                            {f.totalAcres} Acres
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-[#787266] mt-1">
                          <MapPin className="w-3 h-3 text-[#1C4A3A]" />
                          <span>{f.location}, {f.state}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {f.primaryCrops.map((c, i) => (
                            <Badge key={i} variant="outline">
                              {c}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#E7E3D8] flex items-center justify-between text-[11px]">
                        <span className="text-[#A8A092]">ID: {f.id.slice(0, 8)}</span>
                        <button
                          onClick={() => handleDeleteFarm(f.id)}
                          className="text-[#C8553D] hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Recent Foliar Inspections (1 col) */}
              <div className="agri-card p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#E7E3D8]">
                    <div>
                      <h3 className="text-sm font-bold text-[#0F2E24]">Recent Diagnostics</h3>
                      <p className="text-[11px] text-[#787266]">Saved plant health logs</p>
                    </div>
                    <Link to="/crop-diagnosis" className="text-xs font-bold text-[#1C4A3A] hover:underline">
                      New Scan
                    </Link>
                  </div>

                  {assessments.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#787266]">
                      <Camera className="w-6 h-6 text-[#A8A092] mx-auto mb-2 opacity-60" />
                      <span>No plant inspections logged yet.</span>
                    </div>
                  ) : (
                    <div className="space-y-2.5 mt-3">
                      {assessments.slice(0, 3).map((a) => (
                        <div
                          key={a.id}
                          className="p-3 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#0F2E24]">{a.crop || "Plant"}</span>
                            <Badge
                              variant={
                                a.severity === "high"
                                  ? "danger"
                                  : a.severity === "medium"
                                  ? "warning"
                                  : "success"
                              }
                            >
                              {a.severity?.toUpperCase()} RISK
                            </Badge>
                          </div>
                          <p className="text-[#787266] truncate">{a.condition}</p>
                          <div className="text-[10px] text-[#A8A092] font-mono">
                            {new Date(a.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/crop-diagnosis?tab=history"
                  className="mt-4 pt-3 border-t border-[#E7E3D8] flex items-center justify-between text-xs font-bold text-[#1C4A3A] hover:text-[#0F2E24]"
                >
                  <span>View Complete History ({assessments.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Quick Production Tools Strip */}
          <div className="agri-card p-5">
            <h3 className="text-sm font-bold text-[#0F2E24] mb-3">Quick Agronomic Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link
                to="/market-prices"
                className="p-3.5 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] hover:bg-white hover:border-[#9BE564] transition-all text-left group"
              >
                <TrendingUp className="w-5 h-5 text-[#1C4A3A] group-hover:text-[#2F9E6B] mb-2" />
                <div className="text-xs font-bold text-[#0F2E24]">Mandi Prices</div>
                <div className="text-[10px] text-[#787266]">Official Agmarknet rates</div>
              </Link>
              <Link
                to="/weather"
                className="p-3.5 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] hover:bg-white hover:border-[#9BE564] transition-all text-left group"
              >
                <CloudSun className="w-5 h-5 text-[#3E8E8A] mb-2" />
                <div className="text-xs font-bold text-[#0F2E24]">Weather Telemetry</div>
                <div className="text-[10px] text-[#787266]">Spray windows &amp; rain</div>
              </Link>
              <Link
                to="/schemes"
                className="p-3.5 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] hover:bg-white hover:border-[#9BE564] transition-all text-left group"
              >
                <Sparkles className="w-5 h-5 text-[#E9A23B] mb-2" />
                <div className="text-xs font-bold text-[#0F2E24]">Government Schemes</div>
                <div className="text-[10px] text-[#787266]">Verified subsidy portals</div>
              </Link>
              <button
                onClick={() => setIsCropModalOpen(true)}
                className="p-3.5 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] hover:bg-white hover:border-[#9BE564] transition-all text-left group"
              >
                <FileSpreadsheet className="w-5 h-5 text-[#2F9E6B] mb-2" />
                <div className="text-xs font-bold text-[#0F2E24]">Log Crop Cycle</div>
                <div className="text-[10px] text-[#787266]">Track planting to harvest</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTERED FARMS */}
      {activeTab === "farms" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7E3D8]">
            <div>
              <h2 className="text-base font-bold text-[#0F2E24]">Agricultural Holdings &amp; Plots</h2>
              <p className="text-xs text-[#787266]">Owner-partitioned land records stored in Firestore</p>
            </div>
            <Button
              variant="accent"
              size="sm"
              onClick={() => setIsFarmModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Plot
            </Button>
          </div>

          {farms.length === 0 ? (
            <EmptyState
              icon={<Tractor className="w-8 h-8 text-[#1C4A3A]" />}
              title="No Farms Registered"
              description="You have not created any farm plots yet. Add your land coordinates and crop history."
              action={{
                label: "Add Farm Plot",
                onClick: () => setIsFarmModalOpen(true),
                icon: <Plus className="w-4 h-4" />,
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {farms.map((farm) => (
                <div key={farm.id} className="agri-card p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-bold text-[#0F2E24]">{farm.name}</h3>
                      <span className="text-xs font-mono font-bold text-[#1C4A3A] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#E7E3D8]">
                        {farm.totalAcres} Acres
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#787266] mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1C4A3A]" />
                      <span>{farm.location}, {farm.state}</span>
                    </div>
                    <div className="mt-3 space-y-1 text-xs text-[#787266]">
                      <div><strong>Soil Profile:</strong> {farm.soilType || "Standard Alluvial"}</div>
                      <div><strong>Irrigation:</strong> {farm.irrigationType || "Drip system"}</div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {farm.primaryCrops.map((c, i) => (
                        <Badge key={i} variant="outline">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E7E3D8] flex items-center justify-between text-xs">
                    <span className="text-[#A8A092] font-mono text-[10px]">
                      Created {new Date(farm.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDeleteFarm(farm.id)}
                      className="text-[#C8553D] hover:underline font-bold text-xs"
                    >
                      Delete Plot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CROP RECORDS */}
      {activeTab === "crops" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7E3D8]">
            <div>
              <h2 className="text-base font-bold text-[#0F2E24]">Active Field Crop Cycles</h2>
              <p className="text-xs text-[#787266]">Sowing dates, stage tracking, and harvest expectations</p>
            </div>
            <Button
              variant="accent"
              size="sm"
              onClick={() => setIsCropModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Log New Crop
            </Button>
          </div>

          {crops.length === 0 ? (
            <EmptyState
              icon={<FileSpreadsheet className="w-8 h-8 text-[#1C4A3A]" />}
              title="No Active Crop Cycles Logged"
              description="Record your seed variety, sowing date, and field acreage to track crop progress."
              action={{
                label: "Log Crop Record",
                onClick: () => setIsCropModalOpen(true),
                icon: <Plus className="w-4 h-4" />,
              }}
            />
          ) : (
            <div className="agri-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F5] border-b border-[#E7E3D8] text-[11px] uppercase font-bold text-[#787266]">
                    <tr>
                      <th className="p-3.5">Crop Name</th>
                      <th className="p-3.5">Area (Acres)</th>
                      <th className="p-3.5">Sowing Date</th>
                      <th className="p-3.5">Growth Stage</th>
                      <th className="p-3.5">Record Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F1E9]">
                    {crops.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FAF9F5] transition-colors">
                        <td className="p-3.5 font-bold text-[#0F2E24]">{c.cropName}</td>
                        <td className="p-3.5 font-mono text-[#0F2E24]">{c.areaAcres}</td>
                        <td className="p-3.5 text-[#787266]">{c.plantingDate}</td>
                        <td className="p-3.5">
                          <Badge variant="lime">
                            {c.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-3.5 text-[#A8A092] font-mono text-[10px]">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CREATE FARM MODAL DIALOG */}
      <Dialog
        isOpen={isFarmModalOpen}
        onClose={() => setIsFarmModalOpen(false)}
        title="Register Farm Plot"
        description="Add a new agricultural parcel to track crops, soil health, and weather."
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsFarmModalOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateFarm}
              loading={submitting}
            >
              Save Plot
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateFarm} className="space-y-3.5">
          <div>
            <label className="agri-label block mb-1">Farm / Plot Name</label>
            <input
              type="text"
              required
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              placeholder="e.g. North Orchard, Plot 4B"
              className="w-full px-3 py-2 rounded-xl border border-[#D3CDC0] bg-white text-xs font-semibold text-[#0F2E24] focus:outline-none focus:ring-2 focus:ring-[#3E8E8A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="agri-label block mb-1">Taluka / Village</label>
              <input
                type="text"
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                placeholder="e.g. Niphad, Nashik"
                className="w-full px-3 py-2 rounded-xl border border-[#D3CDC0] bg-white text-xs font-semibold text-[#0F2E24] focus:outline-none focus:ring-2 focus:ring-[#3E8E8A]"
              />
            </div>
            <div>
              <label className="agri-label block mb-1">State / Province</label>
              <input
                type="text"
                value={farmState}
                onChange={(e) => setFarmState(e.target.value)}
                placeholder="e.g. Maharashtra"
                className="w-full px-3 py-2 rounded-xl border border-[#D3CDC0] bg-white text-xs font-semibold text-[#0F2E24] focus:outline-none focus:ring-2 focus:ring-[#3E8E8A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="agri-label block mb-1">Total Acreage</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={farmAcres}
                onChange={(e) => setFarmAcres(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-[#D3CDC0] bg-white text-xs font-semibold text-[#0F2E24] focus:outline-none focus:ring-2 focus:ring-[#3E8E8A]"
              />
            </div>
            <div>
              <label className="agri-label block mb-1">Primary Crops</label>
              <input
                type="text"
                value={farmCrops}
                onChange={(e) => setFarmCrops(e.target.value)}
                placeholder="e.g. Tomato, Onion, Wheat"
                className="w-full px-3 py-2 rounded-xl border border-[#D3CDC0] bg-white text-xs font-semibold text-[#0F2E24] focus:outline-none focus:ring-2 focus:ring-[#3E8E8A]"
              />
            </div>
          </div>
        </form>
      </Dialog>

      {/* CREATE CROP RECORD MODAL DIALOG */}
      <Dialog
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        title="Log Active Crop Cycle"
        description="Record current plantings to track germination, flowering, and harvest."
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsCropModalOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateCrop}
              loading={submitting}
            >
              Log Crop
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateCrop} className="space-y-3.5">
          {farms.length > 0 && (
            <div>
              <label className="agri-label block mb-1">Select Farm Plot</label>
              <select
                value={selectedFarmId}
                onChange={(e) => setSelectedFarmId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D3CDC0] bg-white text-xs font-semibold text-[#0F2E24] focus:outline-none focus:ring-2 focus:ring-[#3E8E8A]"
              >
                {farms.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.totalAcres} Acres)
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="agri-label block mb-1">Crop Name &amp; Variety</label>
            <input
              type="text"
              required
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              placeholder="e.g. Tomato (Hybrid Abhinav)"
              className="w-full px-3 py-2 rounded-xl border border-[#D3CDC0] bg-white text-xs font-semibold text-[#0F2E24] focus:outline-none focus:ring-2 focus:ring-[#3E8E8A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="agri-label block mb-1">Planted Area (Acres)</label>
              <input
                type="number"
                min="0.25"
                step="0.25"
                value={cropArea}
                onChange={(e) => setCropArea(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-[#D3CDC0] bg-white text-xs font-semibold text-[#0F2E24] focus:outline-none focus:ring-2 focus:ring-[#3E8E8A]"
              />
            </div>
            <div>
              <label className="agri-label block mb-1">Sowing Date</label>
              <input
                type="date"
                value={cropPlantingDate}
                onChange={(e) => setCropPlantingDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D3CDC0] bg-white text-xs font-semibold text-[#0F2E24] focus:outline-none focus:ring-2 focus:ring-[#3E8E8A]"
              />
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
