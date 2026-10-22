import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Camera,
  TrendingUp,
  FileText,
  Cloud,
  Thermometer,
  Brain,
  Satellite,
  Plane,
  Droplets,
  Package,
  Store,
  Mic,
  ShieldCheck,
  User,
} from "lucide-react";

export default function DashboardPage() {
  const { user, friendlyName } = useAuth();

  const farmerName = friendlyName || user?.displayName || user?.email?.split("@")[0] || "Farmer";

  const tools = [
    { name: "Crop Diagnosis", path: "/crop-diagnosis", icon: Camera, color: "text-emerald-600 bg-emerald-50", desc: "Detect plant diseases and view genuine health assessments" },
    { name: "Live Market Prices", path: "/market-prices", icon: TrendingUp, color: "text-blue-600 bg-blue-50", desc: "Check verified commodity rates and arrival markets" },
    { name: "Hyperlocal Weather", path: "/weather", icon: Cloud, color: "text-sky-600 bg-sky-50", desc: "Real meteorological readings and agricultural advisories" },
    { name: "Government Schemes", path: "/schemes", icon: FileText, color: "text-amber-600 bg-amber-50", desc: "Verified subsidies and financial assistance programs" },
    { name: "Voice Assistant", path: "/assistant", icon: Mic, color: "text-purple-600 bg-purple-50", desc: "Multilingual hands-free voice agricultural guidance" },
    { name: "Smart Irrigation", path: "/irrigation", icon: Droplets, color: "text-cyan-600 bg-cyan-50", desc: "Water-efficiency monitoring and field management" },
    { name: "Cold Storage", path: "/storage", icon: Thermometer, color: "text-indigo-600 bg-indigo-50", desc: "Post-harvest preservation and warehouse locator" },
    { name: "Produce Direct (Buyer Connect)", path: "/restaurants", icon: Store, color: "text-rose-600 bg-rose-50", desc: "Direct farm-to-table sales and wholesale channels" },
    { name: "Traceability & Blockchain", path: "/traceability", icon: Package, color: "text-violet-600 bg-violet-50", desc: "Batch provenance and consumer supply chain verification" },
    { name: "Market Predictor", path: "/predictor", icon: Brain, color: "text-teal-600 bg-teal-50", desc: "Simulated market projections and decision factors" },
    { name: "Crop Health Monitor", path: "/crop-health", icon: Satellite, color: "text-lime-600 bg-lime-50", desc: "Satellite and vegetation index analytics" },
    { name: "Drone Monitoring", path: "/drones", icon: Plane, color: "text-fuchsia-600 bg-fuchsia-50", desc: "Aerial field diagnostics and telemetry" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-emerald-100">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">Farmer Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {farmerName}!</h1>
            <p className="mt-2 text-emerald-100 max-w-xl text-sm md:text-base">
              Your centralized dashboard for agricultural intelligence, wholesale market rates, crop disease inspection, and field tools.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <User className="w-5 h-5 text-emerald-200" />
              <span className="font-semibold text-sm">Account Status</span>
            </div>
            <p className="text-xs text-emerald-200 font-mono">{user?.email}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400 text-emerald-950">
              Signed in
            </span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Agricultural Intelligence Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">{tool.desc}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm font-medium text-emerald-600">
                  <span>Open Tool</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
