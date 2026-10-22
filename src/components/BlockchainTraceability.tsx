import React, { useState, useEffect } from 'react';
import { Package, Truck, Store, QrCode, Shield, Clock, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocalization } from '../contexts/LocalizationContext';

interface TraceabilityRecord {
  id: string;
  productName: string;
  batchId: string;
  farmer: {
    name: string;
    location: string;
    certification: string[];
  };
  journey: Array<{
    stage: string;
    stageKey: 'planting' | 'harvesting' | 'processing' | 'transportation' | 'retail';
    timestamp: string;
    location: string;
    handler: string;
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

  useEffect(() => {
    fetchTraceabilityData();
  }, []);

  const fetchTraceabilityData = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockProducts: TraceabilityRecord[] = [
      {
        id: '1',
        productName: t("trace.productLabel") || 'Organic Tomatoes',
        batchId: 'TOM-2025-001',
        farmer: {
          name: 'Rohit Pandey',
          location: 'Thane, Maharashtra',
          certification: [
            t("trace.tags.organic") || 'Organic',
            t("trace.tags.fairTrade") || 'Fair Trade',
            t("trace.tags.sustainable") || 'Sustainable'
          ]
        },
        journey: [
          {
            stage: t("trace.stages.planting") || 'Planting',
            stageKey: 'planting',
            timestamp: '2024-11-15T08:00:00Z',
            location: 'Farm - Thane',
            handler: 'Rohit Pandey',
            quality: 100,
            verified: true
          },
          {
            stage: t("trace.stages.harvesting") || 'Harvesting',
            stageKey: 'harvesting',
            timestamp: '2025-01-10T06:30:00Z',
            location: 'Farm - Thane',
            handler: 'Rohit Pandey',
            temperature: 24,
            quality: 98,
            verified: true
          },
          {
            stage: t("trace.stages.processing") || 'Processing',
            stageKey: 'processing',
            timestamp: '2025-01-10T14:00:00Z',
            location: 'Processing Unit - Nashik',
            handler: 'AgriPack Facilities',
            temperature: 18,
            quality: 96,
            verified: true
          },
          {
            stage: t("trace.stages.transportation") || 'Transportation',
            stageKey: 'transportation',
            timestamp: '2025-01-11T09:00:00Z',
            location: 'In Transit - NH 48',
            handler: 'ColdChain Logistics Ltd',
            temperature: 4,
            quality: 96,
            verified: true
          },
          {
            stage: t("trace.stages.retail") || 'Retail',
            stageKey: 'retail',
            timestamp: '2025-01-12T11:00:00Z',
            location: 'Wholesale Hub - Mumbai',
            handler: 'FarmFresh Outlets',
            temperature: 5,
            quality: 95,
            verified: true
          }
        ],
        currentStatus: t("trace.statusAvailable") || 'Available for Purchase',
        qrCode: 'TOM-2025-001-QR',
        certificates: [
          t("trace.certList.organic") || 'Organic Certificate',
          t("trace.certList.quality") || 'Quality Assurance',
          t("trace.certList.coldChain") || 'Cold Chain Compliance'
        ],
        sustainabilityScore: 92
      }
    ];
    
    setSelectedProduct(mockProducts[0]);
    setLoading(false);
  };

  const getStageIcon = (stageKey: string) => {
    switch (stageKey) {
      case 'planting': return <Package className="w-5 h-5" />;
      case 'harvesting': return <Package className="w-5 h-5" />;
      case 'processing': return <Package className="w-5 h-5" />;
      case 'transportation': return <Truck className="w-5 h-5" />;
      case 'retail': return <Store className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600 text-sm">{t("trace.loadingRecords") || "Loading blockchain records..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold text-gray-800">{t("trace.title")}</h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-300">
            {t("trace.prototypeBadge")}
          </span>
        </div>
        <p className="text-gray-600 text-xs">{t("trace.subtitle")} (Sample Batch TOM-2025-001)</p>
      </div>

      {selectedProduct && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Info */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedProduct.productName}</h3>
                <div className="text-xs text-gray-500 mb-3">{t("trace.batch")}: {selectedProduct.batchId}</div>
                
                <motion.button
                  onClick={() => setShowQR(!showQR)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 mx-auto transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <QrCode className="w-4 h-4" />
                  <span>{showQR ? t("trace.hideQr") || 'Hide QR Code' : t("trace.showQr")}</span>
                </motion.button>
                
                {showQR && (
                  <motion.div 
                    className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-28 h-28 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                      <QrCode className="w-14 h-14 text-gray-600" />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 font-mono">{selectedProduct.qrCode}</p>
                  </motion.div>
                )}
              </div>

              <div className="space-y-4 text-xs">
                <div className="border-t border-gray-100 pt-3">
                  <h4 className="font-bold text-gray-800 mb-1.5">{t("trace.farmerDetails")}</h4>
                  <p className="font-medium text-gray-700">{selectedProduct.farmer.name}</p>
                  <div className="flex items-center space-x-1 text-gray-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-600" />
                    <span>{selectedProduct.farmer.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedProduct.farmer.certification.map((cert, index) => (
                      <span key={index} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <h4 className="font-bold text-gray-800 mb-1.5">{t("trace.sustainabilityScore")}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-emerald-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedProduct.sustainabilityScore}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                    <span className="font-bold text-emerald-700">{selectedProduct.sustainabilityScore}%</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <h4 className="font-bold text-gray-800 mb-1.5">{t("trace.certificates")}</h4>
                  <div className="space-y-1">
                    {selectedProduct.certificates.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-1.5 text-gray-600">
                        <Shield className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Journey Timeline */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-5">{t("trace.delivery")}</h3>
              
              <div className="relative">
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-5">
                  {selectedProduct.journey.map((step, index) => (
                    <motion.div 
                      key={index}
                      className="relative flex items-start space-x-4"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full shadow-xs ${
                        step.verified ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {getStageIcon(step.stageKey)}
                        {step.verified && (
                          <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-emerald-600 bg-white rounded-full" />
                        )}
                      </div>
                      
                      <div className="flex-1 bg-gray-50 border border-gray-100 rounded-lg p-3.5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800 text-sm">{step.stage}</h4>
                          <div className="flex items-center space-x-1 text-gray-500 text-xs">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                              {new Date(step.timestamp).toLocaleDateString(interfaceLocale)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase font-bold">{t("trace.fields.location")}</span>
                            <p className="font-semibold text-gray-800 mt-0.5">{step.location}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase font-bold">{t("trace.fields.handler")}</span>
                            <p className="font-semibold text-gray-800 mt-0.5">{step.handler}</p>
                          </div>
                          {step.temperature !== undefined && (
                            <div>
                              <span className="text-gray-400 block text-[10px] uppercase font-bold">{t("trace.fields.temperature")}</span>
                              <p className="font-semibold text-gray-800 mt-0.5">{step.temperature}°C</p>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase font-bold">{t("trace.fields.quality")}</span>
                            <div className="flex items-center space-x-1.5 mt-1">
                              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-emerald-500 h-1.5 rounded-full"
                                  style={{ width: `${step.quality}%` }}
                                />
                              </div>
                              <span className="text-[11px] font-bold text-emerald-700">{step.quality}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-bold text-emerald-900">{t("trace.status.current")}: {selectedProduct.currentStatus}</span>
                </div>
                <p className="text-emerald-700 mt-1 pl-6">
                  {t("trace.status.verifiedLine")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainTraceability;