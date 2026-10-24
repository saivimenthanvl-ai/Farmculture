const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'contexts', 'LanguageContext.tsx');
let content = fs.readFileSync(targetFile, 'utf8').replace(/\r\n/g, '\n');

const esDroneEntries = `    "drone.title": "Sistema de monitoreo con drones",
    "drone.subtitle": "Vigilancia aérea del dosel vegetal y mapeo de cultivos",
    "drone.connectingDrones": "Conectando con sistemas telemétricos aéreos…",
    "drone.telemetrySimulationMode": "Prototipo de demostración",
    "drone.demonstrationBanner": "Modo Demostración — Esta pantalla utiliza telemetría simulada y metraje pregrabado. Ningún dron físico está conectado.",
    "drone.activeDronesList": "Unidades de drones registradas",
    "drone.battery": "Batería",
    "drone.task": "Operación actual",
    "drone.coverage": "Cobertura del vuelo",
    "drone.lastUpdate": "Último contacto",
    "drone.altitude": "Altitud de vuelo",
    "drone.location": "Coordenadas GPS",
    "drone.recording4k": "Sensor óptico 4K",
    "drone.sampleFootage": "Metraje de demostración pregrabado",
    "drone.liveTransmission": "Transmisión del dosel (Demostración)",
    "drone.latestDetections": "Anomalías detectadas",
    "drone.allSystemsNormal": "No se detectaron anomalías críticas. Todos los sistemas nominales.",
    "drone.active": "En vuelo",
    "drone.charging": "Cargando",
    "drone.docked": "En base",
    "drone.maintenance": "Mantenimiento",
    "drone.priorityHigh": "Prioridad alta",
    "drone.priorityMedium": "Prioridad media",
    "drone.priorityLow": "Prioridad baja",
    "drone.detectionPest": "Detección de plagas",
    "drone.detectionDisease": "Detección de patógenos",
    "drone.detectionIrrigation": "Estrés hídrico detectado",
    "drone.detectionGrowth": "Estado vegetativo",
    "drone.pestInfectionDesc": "Clorosis foliar y sospecha de pulgones en el dosel superior.",
    "drone.irrigationDryDesc": "Deficiencia hídrica térmica detectada en el cuadrante radicular.",
    "drone.growthUniformDesc": "Crecimiento uniforme observado en el cultivo.",
    "drone.dockedRecharge": "Acoplado en la estación de recarga en tierra",
    "drone.patrollingActive": "Vuelo de demostración en curso",
    "drone.playDemo": "Ejecutar demostración",
    "drone.launch": "Lanzamiento físico (Bloqueado)",
    "drone.launchDisabledTooltip": "Controles de vuelo reales bloqueados en modo demostración.",
    "drone.minAgo": "minutos",
    "drone.evidenceUnavailable": "Evidencia visual no disponible",
    "drone.connectionError": "No se detectó hardware físico. Mostrando escenario de demostración.",
    "drone.retryConnection": "Reintentar escaneo de hardware",`;

const esBlockHeader = '\n  es: {\n';
if (!content.includes(esBlockHeader)) {
  console.error('es block header not found!');
  process.exit(1);
}

content = content.replace(esBlockHeader, `${esBlockHeader}${esDroneEntries}\n`);
fs.writeFileSync(targetFile, content.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully injected es drone entries into LanguageContext.tsx!');
