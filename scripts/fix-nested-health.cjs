const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'contexts', 'LanguageContext.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

const oldBlock = `    health: {
      title: "Crop Health Monitor",
      subtitle: "Real-time satellite and drone-based crop analysis",
      aiScan: "AI Scan",
      yourFields: "Your Fields",
      cropType: "Crop Type",
      growthStage: "Growth Stage",
      predictedYield: "Predicted Yield",
      expectedHarvest: "Expected Harvest",
      cropIssues: "Crop Issues",
      recommendations: "Recommendations",
    },`;

const newBlock = `    health: {
      title: "Crop Health Monitor (Demonstration Prototype)",
      subtitle: "Simulated multispectral satellite vegetation indices & demonstration field analytics",
      simulationMode: "Demonstration / Simulation Mode",
      simulationNotice: "Educational & Demonstration Simulation Only — Displays sample field observations and benchmark NDVI calculations. Do not apply chemical pesticides or fertilizers without certified local agronomist diagnosis or laboratory tissue analysis.",
      aiScan: "Run Sample Simulation Scan",
      fieldNorth: "North Field — Plot 1",
      fieldSouth: "South Field — Plot 2",
      fieldEast: "East Orchard — Plot 3",
      lastScan: "Last Sample Run",
      issuesFound: "Simulated Flagged Conditions",
      allGood: "Nominal Benchmark Status",
      noIssuesDetected: "No anomalies detected in sample baseline dataset.",
      stageFlowering: "Flowering Stage",
      stageBulbDev: "Bulb Development Stage",
      stageHeadFormation: "Head Formation Stage",
      pestIssue: "Suspected Pest Infestation",
      nutrientIssue: "Suspected Nutrient Imbalance",
      issueAphids: "Simulated aphid cluster pattern",
      issueNitrogen: "Simulated nitrogen deficiency signature",
      issueLeafBlight: "Simulated fungal leaf blight indicators",
      recommendation: "Educational Agronomic Guidance",
      recoNeem: "Simulated recommendation: Apply organic neem seed kernel extract (5ml/L) upon visual pest confirmation.",
      recoUrea: "Simulated recommendation: Conduct soil mineral verification before applying split nitrogen dosage.",
      recoFungicide: "Simulated recommendation: Inspect canopy air circulation and spray bio-fungicide (Trichoderma viride).",
      disclaimer: "Simulated model demonstration only. Consult certified local agricultural extension officers for actionable field treatments.",
      confidenceNotice: "Simulated Diagnostic Model: Sample confidence calculated against synthetic benchmark curves.",
      spectralBands: "Multispectral Sample Bands",
      bandNdvi: "Simulated NDVI Index",
      bandNdwi: "Simulated NDWI (Moisture) Index",
      yourFields: "Your Fields (Sample Data)",
      cropType: "Crop Type",
      growthStage: "Growth Stage",
      predictedYield: "Simulated Estimated Yield",
      expectedHarvest: "Benchmark Harvest Window",
      cropIssues: "Sample Flagged Observations",
      recommendations: "Educational Recommendations",
      confidence: "Model Benchmark Confidence",
      scanTimestamp: "Sample Batch Timestamp",
      viewFullReport: "View Sample Analysis Report",
      exportAuditPdf: "Export Simulation Summary (PDF)",
    },`;

// Normalize \r\n to handle CRLF
const contentLf = content.replace(/\r\n/g, '\n');
const oldBlockLf = oldBlock.replace(/\r\n/g, '\n');

if (!contentLf.includes(oldBlockLf)) {
  console.error("Could not find oldBlock in LanguageContext.tsx");
  process.exit(1);
}

const updatedLf = contentLf.replace(oldBlockLf, newBlock.replace(/\r\n/g, '\n'));
// Preserve CRLF if original had it
const finalContent = content.includes('\r\n') ? updatedLf.replace(/\n/g, '\r\n') : updatedLf;

fs.writeFileSync(targetFile, finalContent, 'utf8');
console.log("Successfully updated nested health object in LanguageContext.tsx!");
