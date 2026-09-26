export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Arduino' | 'PLC' | 'Automation' | 'Web Development' | 'IoT';
  clientType: string;
  year: string;
  problem: string;
  solution: string;
  architecture: string;
  components: string[];
  features: string[];
  safetyNotes: string[];
  outcome: string;
  technologies: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'automatic-water-tank-controller',
    title: 'Automatic Water Tank Controller',
    tagline: 'Dual-sensor microcontroller liquid level automation with opto-isolated relay & dry-run pump safeguard.',
    category: 'Arduino',
    clientType: 'Residential & Commercial Water Management',
    year: '2024',
    problem: 'Overhead water tanks frequently overflowed resulting in severe water and electricity wastage, while underground booster motors were repeatedly damaged by running dry during municipal water supply cuts.',
    solution: 'Designed and built a dedicated electronic controller featuring dual-level sensing (underground reservoir and overhead tank), automatic motor cycling, dry-run protection timeout, and physical manual override.',
    architecture: 'Water Level Sensors (Ultrasonic / Stainless float) → Arduino / ESP32 Microcontroller → Optocoupled 30A Relay Module → Motor / Water Pump (with 16x2 I2C Display & status LEDs).',
    components: [
      'Arduino Uno / Nano (or ESP32 wireless variant)',
      'JSN-SR04T Waterproof Ultrasonic Sensor / Corrosion-resistant Float Switches',
      '30A 250V AC Optocoupler-isolated High-power Relay Module',
      '16x2 I2C Character LCD with backlight timeout',
      '12V to 5V DC Step-down Buck Converter with transient filtering',
      'Industrial DIN-rail mounted polycarbonate enclosure with front toggle controls'
    ],
    features: [
      'Automatic Motor Start when overhead water drops below 25%',
      'Automatic Motor Cut-off when water reaches 95% (overflow prevention)',
      'Dry-run Protection: Halts pump within 15 seconds if underground reservoir is empty',
      '3-way Mode Switch: Auto, Manual Run, System Off',
      'Live liquid percentage display and pump run-time counter',
      'Sensor cable cut / disconnect fail-safe alarm'
    ],
    safetyNotes: [
      'Complete galvanic optical isolation between 5V DC microcontroller logic and 230V AC high-current motor wiring.',
      'RC snubber circuit across relay contacts to suppress inductive back-EMF arcing during motor switch-off.',
      'Fused AC mains input and grounded metallic or fire-retardant enclosure.'
    ],
    outcome: 'Eliminated water overflow incidents completely and safeguarded pumping equipment against dry-run burnout, saving significant monthly electricity costs.',
    technologies: ['Arduino C++', 'Optocoupled Relays', 'Ultrasonic Sensing', 'I2C Bus', 'Power Electronics']
  },
  {
    id: 'industrial-plc-motor-control-panel',
    title: 'Industrial Conveyor & Multi-Motor PLC Control Panel',
    tagline: 'Siemens S7-1200 automated sequencing, VFD speed modulation, and emergency interlock system.',
    category: 'PLC',
    clientType: 'Packaging & Manufacturing Facility',
    year: '2024',
    problem: 'Manual conveyor starting caused mechanical jams, high peak electrical current spikes, and lacked proper operator emergency interlocking along the packaging line.',
    solution: 'Engineered a custom automated control panel powered by a Siemens S7-1200 PLC, Delta VFDs with Modbus communication, and pull-cord safety emergency stop loops.',
    architecture: 'Inductive Sensors & Pushbuttons → Siemens S7-1200 PLC (Ladder Logic) → Delta VFD via RS-485 Modbus → 3-Phase Induction Motors (with HMI Touchscreen interface).',
    components: [
      'Siemens S7-1200 CPU 1214C DC/DC/DC',
      'Delta MS300 Variable Frequency Drives (VFD)',
      'Weintek 7-inch Color HMI Touchscreen',
      'Schneider Electric Contactors and Thermal Overload Relays',
      'Banner Optical Photoelectric Detection Sensors',
      'Dual-channel Safety Relay for Emergency Stop circuit'
    ],
    features: [
      'Sequential motor start and ramp-down to eliminate conveyor mechanical shock',
      'Automated jam detection using motor current feedback and optical sensors',
      'HMI screen with live speed control, batch counter, and alarm logging',
      'Cat-3 compliant Emergency Stop circuit with safety gate interlocks'
    ],
    safetyNotes: [
      'Hardwired fail-safe emergency stop circuit independent of PLC software logic.',
      'Separate trunking for 400V AC power cables and 24V DC sensor signals to prevent electromagnetic interference (EMI).'
    ],
    outcome: 'Reduced line stoppage by 74%, enabled variable packaging speeds, and secured full operator compliance with industrial workplace safety standards.',
    technologies: ['Siemens TIA Portal', 'Ladder Logic (LD)', 'Modbus RTU', 'VFD Tuning', 'Electrical CAD']
  },
  {
    id: 'esp32-iot-environmental-monitor',
    title: 'Smart IoT Environmental & Energy Telemetry Unit',
    tagline: 'Wi-Fi & MQTT cloud telemetry node for real-time temperature, humidity, and electrical load tracking.',
    category: 'IoT',
    clientType: 'Commercial Facility & Cold Storage',
    year: '2023',
    problem: 'Facility managers had no visibility into temperature fluctuations in storage chambers outside working hours, leading to product spoilage during power trips.',
    solution: 'Deployed an autonomous ESP32 IoT node transmitting real-time sensor metrics every 30 seconds over MQTT to a responsive web dashboard with instant WhatsApp alerts.',
    architecture: 'Sensors (SHT30 + PZEM-004T) → ESP32 Microcontroller → Wi-Fi / MQTT Broker → Cloud Dashboard & WhatsApp Webhook Bot.',
    components: [
      'ESP-WROOM-32 32-bit Dual-core module',
      'Industrial SHT30 High-accuracy Temp/Humidity Probe',
      'PZEM-004T Multi-function AC Power Energy Meter module',
      'Mean Well 5V 2A ultra-compact DIN-rail power supply',
      'MicroSD card shield for offline data logging during network outages'
    ],
    features: [
      'Continuous 24/7 temperature, humidity, voltage, and kilowatt-hour tracking',
      'Offline buffering: caches up to 72 hours of metrics on SD card if Wi-Fi disconnects',
      'Instant automated WhatsApp message when temperature exceeds safe threshold',
      'Mobile-friendly web dashboard with interactive historical charts and CSV export'
    ],
    safetyNotes: [
      'High-voltage AC current transformer (CT) clamp with galvanic optical isolation.',
      'Watchdog timer enabled in ESP32 firmware to auto-recover from any transient lockup.'
    ],
    outcome: 'Provided 24/7 real-time operational peace of mind and prevented two near-spoilage incidents by alerting the engineering team within 45 seconds of a chiller compressor trip.',
    technologies: ['ESP32', 'FreeRTOS', 'MQTT Protocol', 'ThingsBoard', 'Node.js Webhooks']
  },
  {
    id: 'corporate-business-web-portal',
    title: 'E-Commerce & Digital Inventory Web Platform',
    tagline: 'Modern responsive web store, automated quote builder, and WhatsApp direct checkout engine.',
    category: 'Web Development',
    clientType: 'Retail & Wholesale Supplier',
    year: '2024',
    problem: 'The client was taking manual phone orders and writing paper invoices, leading to pricing disputes, untracked inventory, and missed customer leads.',
    solution: 'Engineered a modern, responsive web catalog and order portal featuring real-time product filters, instant WhatsApp order generator, and an administrative inventory manager.',
    architecture: 'React + TypeScript SPA → Express REST API → SQLite / PostgreSQL Database → WhatsApp Business Link Generator.',
    components: [
      'React frontend with instant faceted search and category filtering',
      'Express.js backend with JWT authentication and audit trails',
      'Relational database tracking product variations, prices, and stock levels',
      'Automated PDF invoice generation and WhatsApp message formatting'
    ],
    features: [
      'Sub-second page loads with modern responsive mobile layout',
      'Instant One-Click Order via WhatsApp with formatted items and total',
      'Interactive project quote estimator allowing customers to calculate pricing',
      'Admin management portal for instant price updates and order tracking'
    ],
    safetyNotes: [
      'Strict input sanitization and parameterised database queries to block SQL injection.',
      'No sensitive credit card data stored; all links encrypted via HTTPS / SSL.'
    ],
    outcome: 'Increased order volume by 120% in the first quarter and reduced manual customer telephone order processing time by 80%.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Express.js', 'PostgreSQL / SQLite']
  },
  {
    id: 'digital-documentation-pdf-pipeline',
    title: 'Automated Document & Invoice Processing System',
    tagline: 'Streamlined online intake form with automated calculation, PDF certificate generation, and cloud sync.',
    category: 'Automation',
    clientType: 'Professional Service Practice',
    year: '2023',
    problem: 'Staff spent over 4 hours daily retyping customer registration data from paper forms into Excel sheets and creating Word certificates manually.',
    solution: 'Designed an automated digital intake form with validation, automatic tax/fee calculations, and single-click branded PDF certificate generation.',
    architecture: 'Interactive Digital Form → Cloud Database / Google Sheets API → Automated PDF Rendering Engine → Cloud Storage & Email Dispatch.',
    components: [
      'Mobile-ready digital intake form with live field validation',
      'Dynamic PDF document engine applying exact typography and logos',
      'Automated spreadsheet synchronization for real-time bookkeeping',
      'Cryptographically verifiable QR code stamped on issued certificates'
    ],
    features: [
      'Zero manual data re-entry: forms instantly populate master database',
      'Generates print-ready vector PDF documents in under 2 seconds',
      'Verification QR code allows clients to verify document authenticity online',
      'Automated email confirmation sent directly to the client'
    ],
    safetyNotes: [
      'SSL transmission encryption and strict permission access control for customer records.',
      'Automated encrypted off-site backups scheduled every night.'
    ],
    outcome: 'Saved the client 20+ staff hours weekly and completely eliminated data transcription errors from customer files.',
    technologies: ['Node.js', 'Google Sheets API', 'PDFKit', 'HTML5 Forms', 'Cloud Storage']
  }
];
