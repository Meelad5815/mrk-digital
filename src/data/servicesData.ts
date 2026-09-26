export interface ServiceItem {
  id: string;
  title: string;
  area: 'Web Development' | 'App & Software' | 'Digital Services' | 'PLC & Automation' | 'Arduino / ESP32 / IoT' | 'IT Services';
  shortDescription: string;
  problem: string;
  approach: string;
  deliverables: string[];
  technologies: string[];
  process: string[];
  suitableFor: string;
  faqs: { question: string; answer: string }[];
  startingBudgetPkr: string;
}

export const SERVICE_AREAS = [
  'All',
  'Web Development',
  'App & Software',
  'Digital Services',
  'PLC & Automation',
  'Arduino / ESP32 / IoT',
  'IT Services',
] as const;

export const SERVICES_CATALOG: ServiceItem[] = [
  // --- Web Development ---
  {
    id: 'website-development',
    title: 'Website Development',
    area: 'Web Development',
    shortDescription: 'Custom, high-performance responsive business websites built for modern devices and high conversion.',
    problem: 'Businesses struggle with slow, outdated, or unresponsive websites that fail to generate inquiries and lose visitors on mobile devices.',
    approach: 'We craft semantic, fast-loading, mobile-first websites structured around clear customer journeys, visible calls-to-action, and search-engine visibility.',
    deliverables: [
      'Fully responsive, mobile-optimised web pages',
      'Clean semantic HTML5, CSS3, modern JavaScript/TypeScript',
      'Fast loading speed and Core Web Vitals optimization',
      'Contact forms, WhatsApp integration, and call triggers',
      'On-page SEO foundations, schema markup, and metadata',
      'Deployment on secure, scalable cloud hosting'
    ],
    technologies: ['HTML5 / CSS3', 'React / Next.js', 'Tailwind CSS', 'Vite', 'Node.js', 'Cloudflare / Vercel'],
    process: [
      'Discovery & requirements analysis',
      'Wireframing and content architecture review',
      'Interactive design and frontend development',
      'Speed, mobile responsiveness, and browser testing',
      'Deployment, domain configuration, and launch handover'
    ],
    suitableFor: 'Small-to-medium enterprises, local businesses, contractors, and startups requiring a credible web presence.',
    faqs: [
      {
        question: 'Will my website work properly on mobile phones and tablets?',
        answer: 'Yes, every website is built with a responsive mobile-first approach, tested on various screen resolutions and modern browsers.'
      },
      {
        question: 'Can you assist with domain registration and hosting?',
        answer: 'Yes, we provide end-to-end guidance for selecting domains, DNS configuration, and fast cloud hosting setup.'
      }
    ],
    startingBudgetPkr: 'PKR 25,000'
  },
  {
    id: 'wordpress-development',
    title: 'WordPress Development',
    area: 'Web Development',
    shortDescription: 'Custom WordPress themes, clean template architecture, and easy-to-manage content workflows.',
    problem: 'Bloated themes and overloaded plugins lead to slow load times, security vulnerabilities, and difficult administration.',
    approach: 'We develop lean, custom WordPress themes using clean PHP templates, minimal dependencies, and native custom post types for maintainable growth.',
    deliverables: [
      'Custom lightweight theme built without heavy page builder bloat',
      'Custom post types & taxonomies for Services, Projects, and Portfolios',
      'Block editor (Gutenberg) custom components or intuitive customizer fields',
      'Enhanced security hardening, spam protection, and sanitization',
      'Speed optimization and caching configuration'
    ],
    technologies: ['WordPress 6+', 'PHP 8.1+', 'MySQL / MariaDB', 'Custom Gutenberg Blocks', 'Tailwind / Vanilla CSS'],
    process: [
      'Scope verification and content taxonomy design',
      'Local theme development and template coding',
      'Post type and custom metadata implementation',
      'Performance audit and security verification',
      'Pantheon / cPanel / VPS production deployment'
    ],
    suitableFor: 'Business owners wanting full editorial control over blog posts, portfolio items, and service updates without technical bottlenecks.',
    faqs: [
      {
        question: 'Will I be able to update text and images myself?',
        answer: 'Yes, WordPress provides an easy dashboard where you can add new articles, edit service descriptions, and change pictures.'
      },
      {
        question: 'Can you migrate my existing website to WordPress?',
        answer: 'Yes, we can migrate content, preserve URL permalinks for SEO continuity, and modernize the theme.'
      }
    ],
    startingBudgetPkr: 'PKR 30,000'
  },
  {
    id: 'shopify-development',
    title: 'Shopify Development',
    area: 'Web Development',
    shortDescription: 'Conversion-ready Shopify stores with localized payment channels, catalog setup, and optimized checkout.',
    problem: 'Online sellers face high checkout drop-offs, disorganized product collections, and difficult payment gateway setups.',
    approach: 'We configure and customize Shopify themes with clear product navigation, rapid checkout flows, and payment/courier integration.',
    deliverables: [
      'Store setup, theme customization, and branding integration',
      'Product catalog, variations, and collection structuring',
      'Payment gateway setup (COD, bank deposit, local & international gateways)',
      'Courier tracking and WhatsApp order notification integration',
      'Mobile checkout friction reduction and speed audit'
    ],
    technologies: ['Shopify Liquid', 'Theme Customizer', 'Shopify APIs', 'Responsive CSS'],
    process: [
      'Product catalog and operational requirements assessment',
      'Store theme customization and brand alignment',
      'Payment methods and shipping rates configuration',
      'Test orders and checkout UX optimization',
      'Live store handover and management training'
    ],
    suitableFor: 'Retailers, boutique brands, and manufacturers entering online sales.',
    faqs: [
      {
        question: 'Can you set up Cash on Delivery (COD) for Pakistan?',
        answer: 'Yes, Cash on Delivery is configured along with SMS/WhatsApp confirmation workflows to reduce returns.'
      }
    ],
    startingBudgetPkr: 'PKR 35,000'
  },
  {
    id: 'ecommerce-development',
    title: 'E-commerce Development',
    area: 'Web Development',
    shortDescription: 'Custom online shopping platforms and WooCommerce stores tailored to specific business models.',
    problem: 'Standard e-commerce packages often lack flexibility for wholesale pricing, bespoke invoice workflows, or specialized local logistics.',
    approach: 'We build tailored e-commerce solutions with custom cart logic, dynamic pricing, and inventory synchronization.',
    deliverables: [
      'Complete online store architecture (WooCommerce or Custom React/Node)',
      'Shopping cart, checkout, customer accounts, and order history',
      'Inventory control and automated stock warning triggers',
      'Multi-currency and localized tax handling',
      'Automated invoice generation and order status dispatch'
    ],
    technologies: ['WooCommerce', 'React / Next.js', 'Node.js', 'Stripe / Local Gateways', 'REST APIs'],
    process: [
      'Product specification and checkout flow planning',
      'Database schema and payment workflow integration',
      'Security audit (SSL, data encryption, PCI compliance basics)',
      'End-to-end checkout, fulfillment, and stress testing',
      'Production deployment and staff training'
    ],
    suitableFor: 'Businesses selling physical or digital products with specific order fulfillment requirements.',
    faqs: [
      {
        question: 'Is customer payment data secure?',
        answer: 'All payments run through PCI-compliant tokenized gateways with SSL encryption. Sensitive card data is never stored locally.'
      }
    ],
    startingBudgetPkr: 'PKR 45,000'
  },
  {
    id: 'web-application-development',
    title: 'Web Application Development',
    area: 'Web Development',
    shortDescription: 'Dynamic interactive web apps, client portals, internal dashboards, and workflow automation.',
    problem: 'Static sites cannot handle user authentication, real-time database queries, calculations, or internal company workflows.',
    approach: 'We build single-page and full-stack web applications with modern reactive interfaces, secure APIs, and persistent database storage.',
    deliverables: [
      'Modular React frontend with real-time UI states',
      'Secure backend API endpoints with authentication and role-based access',
      'Database schemas (PostgreSQL / SQLite / Firebase)',
      'Exportable reporting (Excel, PDF, CSV)',
      'Automated error handling and audit logging'
    ],
    technologies: ['React 19', 'TypeScript', 'Express.js', 'Tailwind CSS', 'PostgreSQL / SQLite'],
    process: [
      'Architecture design and data entity modelling',
      'RESTful API development with security validations',
      'Frontend component engineering and state management',
      'Integration testing and edge-case handling',
      'Cloud container deployment and backup scheduling'
    ],
    suitableFor: 'Companies seeking custom SaaS tools, client tracking portals, or automated internal operational tools.',
    faqs: [
      {
        question: 'Can the web app scale as our users grow?',
        answer: 'Yes, modern modular code architecture allows seamless scaling across serverless or containerized environments.'
      }
    ],
    startingBudgetPkr: 'PKR 55,000'
  },
  {
    id: 'python-django-development',
    title: 'Python / Django Development',
    area: 'Web Development',
    shortDescription: 'Robust backend development, data processing, REST APIs, and admin dashboard systems using Python.',
    problem: 'Complex business calculations, high-security requirements, and large datasets require a structured backend framework.',
    approach: 'We leverage Python and Django to deliver clean ORM architectures, secure authentication, and powerful administrative consoles.',
    deliverables: [
      'Django project architecture with customized admin interface',
      'Django REST Framework (DRF) APIs for mobile or frontend clients',
      'Database schema design, indexing, and migrations',
      'Background task workers and automated data processing',
      'Security configurations against CSRF, SQLi, and XSS'
    ],
    technologies: ['Python 3.11+', 'Django / DRF', 'PostgreSQL', 'Celery', 'Docker', 'Nginx / Gunicorn'],
    process: [
      'Database entity-relationship mapping',
      'Core business logic implementation and API tests',
      'Admin interface customization for operators',
      'Performance profiling and query optimization',
      'Production server deployment'
    ],
    suitableFor: 'Organizations needing data-intensive web services, scientific computations, or enterprise backend systems.',
    faqs: [
      {
        question: 'Why choose Python/Django over other stacks?',
        answer: 'Django includes built-in security, a batteries-included admin dashboard, and strong suitability for data processing.'
      }
    ],
    startingBudgetPkr: 'PKR 50,000'
  },
  {
    id: 'business-website-development',
    title: 'Business Website Development',
    area: 'Web Development',
    shortDescription: 'Turnkey corporate websites showcasing credibility, services, company profile, and verified customer contact channels.',
    problem: 'Companies lose high-value contracts because their digital presence does not convey trustworthiness or professional capability.',
    approach: 'We craft comprehensive business identity websites with clear service descriptions, team credibility, and direct inquiry funnels.',
    deliverables: [
      'Complete multi-page corporate website (Home, About, Services, Projects, Contact)',
      'Interactive quote calculator or custom enquiry form',
      'Google Maps, WhatsApp, and verified business schema',
      'Downloadable company profile PDF brochure integration',
      'Brand consistency and typography hierarchy'
    ],
    technologies: ['React / Vite', 'WordPress / Headless', 'Tailwind CSS', 'Schema.org JSON-LD'],
    process: [
      'Company branding and service offerings review',
      'Content layout and lead-generation strategy',
      'Responsive development and cross-browser QA',
      'Corporate email and WhatsApp routing integration',
      'Handover and ongoing support guidelines'
    ],
    suitableFor: 'Industrial firms, consultancy practices, service contractors, and commercial businesses.',
    faqs: [
      {
        question: 'How long does a typical business website take?',
        answer: 'Depending on scope and content readiness, typically 1 to 3 weeks from approved specification.'
      }
    ],
    startingBudgetPkr: 'PKR 35,000'
  },

  // --- App & Software ---
  {
    id: 'app-development',
    title: 'App Development',
    area: 'App & Software',
    shortDescription: 'Modern responsive web applications and cross-platform digital tools built for speed and reliability.',
    problem: 'Traditional desktop software is bound to single machines and difficult to maintain across teams.',
    approach: 'We engineer cloud-accessible web apps with responsive UIs that run smoothly across desktop, tablet, and mobile browsers.',
    deliverables: [
      'Progressive Web App (PWA) with offline capability',
      'Interactive data visualization and user dashboards',
      'Secure session management and encrypted local storage',
      'API connectors for external services'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PWA / Service Workers', 'Node.js'],
    process: ['User workflow mapping', 'Prototype design', 'Frontend development', 'End-to-end testing', 'Deployment'],
    suitableFor: 'Businesses needing mobile-accessible field tools, customer self-service portals, or interactive tools.',
    faqs: [{ question: 'Can users install this on their phone?', answer: 'Yes, as a PWA it can be added directly to the home screen without app store friction.' }],
    startingBudgetPkr: 'PKR 60,000'
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    area: 'App & Software',
    shortDescription: 'Tailored desktop and web software solutions engineered to automate unique business processes.',
    problem: 'Off-the-shelf software is either too bloated, excessively expensive, or fails to fit specific local business rules.',
    approach: 'We design bespoke software matching exact operating procedures, cutting wasted time and eliminating recurring license fees.',
    deliverables: [
      'Custom business logic and rules engine',
      'User-friendly data entry forms and validation',
      'Automated batch operations and reporting',
      'Installation guide and full documentation'
    ],
    technologies: ['Python', 'Node.js / Electron', 'SQLite / PostgreSQL', 'React UI'],
    process: ['Requirement workshop', 'System specification', 'Agile development', 'User acceptance testing', 'Deployment'],
    suitableFor: 'Wholesalers, workshops, repair centres, and specialized businesses requiring custom operational software.',
    faqs: [{ question: 'Who owns the software and data?', answer: 'You own 100% of the deployed code, database, and business data with zero vendor lock-in.' }],
    startingBudgetPkr: 'PKR 65,000'
  },
  {
    id: 'database-applications',
    title: 'Database Applications',
    area: 'App & Software',
    shortDescription: 'Structured relational database design, query optimization, data migration, and reporting tools.',
    problem: 'Companies running on cluttered Excel sheets suffer from data loss, duplicate records, and lack of multi-user concurrency.',
    approach: 'We migrate spreadsheets into normalized relational databases with intuitive data entry interfaces, backup routines, and audit histories.',
    deliverables: [
      'Normalized relational schema design with foreign key integrity',
      'Multi-user web-based entry portal with permission control',
      'Automated daily database backups',
      'Comprehensive search, filter, and analytical reporting views'
    ],
    technologies: ['PostgreSQL', 'MySQL', 'Prisma / Drizzle', 'React / TypeScript'],
    process: ['Spreadsheet/legacy data audit', 'Schema normalization', 'Data migration scripts', 'UI interface build', 'Security validation'],
    suitableFor: 'Trading houses, inventory managers, clinics, and educational institutes outgrowing spreadsheets.',
    faqs: [{ question: 'Can multiple staff members enter data at the same time?', answer: 'Yes, modern databases prevent record collisions and manage simultaneous multi-user transactions smoothly.' }],
    startingBudgetPkr: 'PKR 50,000'
  },

  // --- Digital Services ---
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    area: 'Digital Services',
    shortDescription: 'Professional brand identity, marketing collateral, social media banners, and commercial vectors.',
    problem: 'Inconsistent and amateur visuals undermine brand credibility and fail to capture attention on modern channels.',
    approach: 'We design clean, modern visual assets aligned with your business identity, ready for print and high-res digital display.',
    deliverables: ['Logo design & vector source files', 'Social media promotional post templates', 'Business cards and letterheads', 'Flyers, banners, and advertising creatives'],
    technologies: ['Adobe Illustrator', 'Photoshop', 'Vector Graphics', 'Canva Pro'],
    process: ['Brand brief and style discussion', 'Concept sketches and variations', 'Revisions and refinement', 'Final asset export in PDF, PNG, SVG, AI'],
    suitableFor: 'New ventures establishing brand presence and established companies refreshing their visual identity.',
    faqs: [{ question: 'Do I get vector files for printing?', answer: 'Yes, all print collateral is supplied in print-ready vector PDF and high-res formats.' }],
    startingBudgetPkr: 'PKR 15,000'
  },
  {
    id: 'canva-design',
    title: 'Canva Design',
    area: 'Digital Services',
    shortDescription: 'Editable Canva templates and promotional assets that your internal team can easily update.',
    problem: 'Small businesses need to post frequent social updates but cannot afford graphic designers for every minor text tweak.',
    approach: 'We create polished, custom-branded Canva templates with locked styles so your team can produce daily content in minutes.',
    deliverables: ['Custom editable Canva master templates', 'Brand kit setup (colors, fonts, logo placement)', 'Instagram, Facebook, and WhatsApp status pack', 'Usage guidelines'],
    technologies: ['Canva Pro', 'Brand Kits', 'Typography & Palette Design'],
    process: ['Identify recurring content needs', 'Design custom master templates', 'Share editable template links', 'Walkthrough tutorial'],
    suitableFor: 'Social media managers, small shops, educators, and content creators.',
    faqs: [{ question: 'Can I edit the text from my smartphone?', answer: 'Yes, you can edit the Canva templates directly via the free Canva mobile app.' }],
    startingBudgetPkr: 'PKR 10,000'
  },
  {
    id: 'cv-resume-design',
    title: 'CV / Resume Design',
    area: 'Digital Services',
    shortDescription: 'ATS-compliant, beautifully structured professional resumes and executive CVs that secure interviews.',
    problem: 'Job seekers are filtered out by automated Applicant Tracking Systems (ATS) due to improper formatting and unparsed layouts.',
    approach: 'We format and design clear, ATS-friendly resumes highlighting technical strengths, career achievements, and proper keyword hierarchy.',
    deliverables: ['ATS-optimized editable Word (.docx) file', 'Print-ready high-resolution PDF', 'Cover letter template', 'LinkedIn profile summary recommendations'],
    technologies: ['Microsoft Word', 'Adobe InDesign', 'ATS Parsing Standards'],
    process: ['Review existing CV and target role', 'Content restructuring and keyword optimization', 'Clean typographic layout', 'Final polish and proofreading'],
    suitableFor: 'Graduates, engineers, technical specialists, and professionals seeking career advancement.',
    faqs: [{ question: 'Will the CV pass automated ATS screeners?', answer: 'Yes, our designs adhere to standard heading hierarchies, single-column parsing, and clean fonts.' }],
    startingBudgetPkr: 'PKR 5,000'
  },
  {
    id: 'pdf-word-excel-services',
    title: 'PDF / Word / Excel Services',
    area: 'Digital Services',
    shortDescription: 'Advanced spreadsheet formulas, automated Word documentation, fillable forms, and PDF cleanup.',
    problem: 'Messy spreadsheets with broken formulas and manual document creation waste dozens of productive hours every week.',
    approach: 'We build automated Excel workbooks with VLOOKUP/XLOOKUP, pivot tables, macros, and fillable PDF forms.',
    deliverables: ['Automated Excel sheets with dynamic formulas', 'Interactive fillable PDF documents with signature fields', 'Word document formatting and automated numbering', 'Data cleansing and formatting'],
    technologies: ['Microsoft Excel (Advanced)', 'Microsoft Word', 'Adobe Acrobat Pro', 'VBA / Google Sheets'],
    process: ['Sample document evaluation', 'Formula engineering and form building', 'Calculation verification', 'Delivery and testing'],
    suitableFor: 'Offices, schools, accounting clerks, and businesses dealing with repetitive document workflows.',
    faqs: [{ question: 'Can you lock formula cells so staff don’t accidentally delete them?', answer: 'Yes, we protect formula ranges while leaving input fields unlocked for clean data entry.' }],
    startingBudgetPkr: 'PKR 8,000'
  },
  {
    id: 'online-forms',
    title: 'Online Forms',
    area: 'Digital Services',
    shortDescription: 'Custom digital registration, survey, inspection, and customer onboarding forms connected to cloud sheets.',
    problem: 'Paper forms lead to lost records, transcription errors, and slow turnaround times.',
    approach: 'We configure digital forms with conditional logic, file upload capabilities, and automatic notification dispatch.',
    deliverables: ['Custom online form with conditional branch logic', 'Real-time synchronization with Google Sheets / Excel', 'Instant email / WhatsApp notification triggers', 'Embed code for websites and QR codes for print'],
    technologies: ['Google Forms', 'Tally / Typeform', 'Custom React Forms', 'Zapier / Webhooks'],
    process: ['Survey/registration question flow mapping', 'Form setup with validation rules', 'Notification and spreadsheet linking', 'Testing and link distribution'],
    suitableFor: 'Schools, event organizers, clinic appointments, and client intake workflows.',
    faqs: [{ question: 'Can customers upload photos or documents via the form?', answer: 'Yes, file upload fields can be enabled to collect PDF, JPEG, or other documents.' }],
    startingBudgetPkr: 'PKR 8,000'
  },
  {
    id: 'digital-documentation',
    title: 'Digital Documentation',
    area: 'Digital Services',
    shortDescription: 'Technical manuals, SOPs, standard operating procedures, and professional business documentation.',
    problem: 'Teams lack standardized operating procedures, leading to operational mistakes and training difficulties.',
    approach: 'We write and format clear technical documentation, step-by-step manuals, and compliance records.',
    deliverables: ['Standard Operating Procedure (SOP) manuals', 'User and operator guide documentation', 'Formatted policies and contracts', 'Searchable digital PDF format'],
    technologies: ['Markdown', 'Adobe Acrobat', 'DocuSign Integration', 'MS Word'],
    process: ['Information gathering with team leads', 'Drafting step-by-step instructions', 'Visual diagrams and callouts integration', 'Final review and publication'],
    suitableFor: 'Manufacturers, engineering firms, IT departments, and growing teams.',
    faqs: [{ question: 'Can you include screenshots and diagrams?', answer: 'Yes, step-by-step visual illustrations are included to ensure clarity for all operators.' }],
    startingBudgetPkr: 'PKR 15,000'
  },
  {
    id: 'computer-services',
    title: 'Computer Services',
    area: 'Digital Services',
    shortDescription: 'Comprehensive digital assistance, online government/portal filings, data conversion, and administrative tech support.',
    problem: 'Individuals and small organizations struggle with online portal submissions, format conversions, and technical submissions.',
    approach: 'We offer reliable, secure assistance for online applications, digital verifications, and document processing.',
    deliverables: ['Online portal registration and submission support', 'File format conversions and compression', 'Digital signature processing', 'Accurate data entry'],
    technologies: ['Government/Utility Portals', 'OCR Tools', 'Secure Data Utilities'],
    process: ['Requirement verification', 'Document preparation', 'Secure online processing', 'Confirmation slip generation'],
    suitableFor: 'Citizens, students, merchants, and contractors needing reliable online portal assistance.',
    faqs: [{ question: 'Is my personal data kept confidential?', answer: 'Yes, we adhere to strict privacy practices. No personal data is stored beyond submission completion.' }],
    startingBudgetPkr: 'PKR 5,000'
  },

  // --- PLC & Automation ---
  {
    id: 'plc-programming',
    title: 'PLC Programming',
    area: 'PLC & Automation',
    shortDescription: 'Professional PLC programming (Ladder Logic, FBD) for Siemens, Delta, Mitsubishi, and Omron controllers.',
    problem: 'Industrial machines suffer from unreliable sequence control, poor error handling, and unoptimized cycle times.',
    approach: 'We write structured, modular Ladder Logic and Functional Block Diagrams with safety interlocks, status diagnostics, and clean commenting.',
    deliverables: [
      'Structured PLC program file (TIA Portal, GX Works, ISPSoft, etc.)',
      'I/O allocation table (Digital & Analog)',
      'Safety interlock logic and emergency stop sequencing',
      'Alarm handling and fault diagnostic logic',
      'Ladder logic documentation and simulation verification'
    ],
    technologies: ['Siemens TIA Portal (S7-1200 / S7-200)', 'Delta ISPSoft (DVP Series)', 'Mitsubishi GX Works', 'Omron CX-Programmer', 'Ladder Diagram (LD)'],
    process: [
      'Machine operational cycle and safety requirement review',
      'I/O mapping and sensor/actuator hardware confirmation',
      'Ladder programming with step sequencing and safety traps',
      'Offline simulation and safety verification',
      'On-site or remote commissioning and tuning'
    ],
    suitableFor: 'Industrial packaging lines, water treatment plants, conveyors, textile machinery, and batching plants.',
    faqs: [
      {
        question: 'Which PLC brands do you support?',
        answer: 'We primarily work with Siemens (S7-1200, S7-200 SMART), Delta (DVP series), Mitsubishi (FX series), and Fatek.'
      },
      {
        question: 'Can you troubleshoot an existing PLC with no source code documentation?',
        answer: 'We can upload the available binary logic, map hardware inputs/outputs, and recreate clean, documented ladder code.'
      }
    ],
    startingBudgetPkr: 'PKR 50,000'
  },
  {
    id: 'plc-troubleshooting',
    title: 'PLC Troubleshooting',
    area: 'PLC & Automation',
    shortDescription: 'Diagnostic fault finding, sensor signal verification, communication errors, and program debugging.',
    problem: 'Unexpected machine downtime costs money every hour when PLC alarms trigger or inputs fail to register.',
    approach: 'We systematically diagnose PLC faults by tracing physical sensor loops, checking 24V DC power rails, monitoring online status, and repairing logic bugs.',
    deliverables: [
      'Fault root-cause analysis report',
      'Restored PLC operation with verified input/output firing',
      'Corrected ladder program with safety limits',
      'Preventive maintenance recommendations'
    ],
    technologies: ['Multimeter / Signal Generators', 'Online Diagnostic Tools', 'TIA Portal / WPLSoft', 'Modbus / RS485 Sniffers'],
    process: ['Examine machine symptoms and error codes', 'Test physical wiring and sensor signal levels', 'Online PLC monitoring to detect logic blockages', 'Implement fix and run test cycle'],
    suitableFor: 'Factory managers and plant operators experiencing sudden machine stoppage or intermittent faults.',
    faqs: [{ question: 'How quickly can you attend to a breakdown?', answer: 'We offer rapid remote diagnostic guidance via WhatsApp/video and planned on-site visits in our regional service areas.' }],
    startingBudgetPkr: 'PKR 25,000'
  },
  {
    id: 'industrial-automation',
    title: 'Industrial Automation',
    area: 'PLC & Automation',
    shortDescription: 'Complete automation architecture for manufacturing lines, automated batching, and pneumatic/hydraulic systems.',
    problem: 'Manual processes result in product inconsistencies, high labor dependency, and hazardous operator conditions.',
    approach: 'We design end-to-end industrial automation solutions integrating PLCs, HMIs, sensors, motor drives, and pneumatic valves.',
    deliverables: [
      'System automation architecture & electrical wiring diagram',
      'Sensor and actuator specification schedule',
      'Integrated PLC logic and HMI touch interface design',
      'Emergency stop and interlock compliance layout'
    ],
    technologies: ['PLC Controllers', 'HMI Panels (Weintek, Kinco, Siemens)', 'VFD Drives', 'Pneumatics & Solenoids'],
    process: ['Process flow analysis', 'Hardware specification and procurement guidance', 'Control panel assembly and wiring', 'Software programming and integration', 'Commissioning and operator training'],
    suitableFor: 'Factories upgrading manual machinery into automated, repeatable production units.',
    faqs: [{ question: 'Can an older mechanical machine be automated?', answer: 'Yes, retrofitting manual equipment with sensors, pneumatics, and a modern PLC is one of our primary specialties.' }],
    startingBudgetPkr: 'PKR 85,000'
  },
  {
    id: 'motor-automation',
    title: 'Motor Automation',
    area: 'PLC & Automation',
    shortDescription: 'VFD speed control, soft starters, star-delta starters, and servo motor precision positioning.',
    problem: 'Direct-on-line motor starting causes mechanical shock, high inrush currents, and lack of speed modulation.',
    approach: 'We implement Variable Frequency Drives (VFDs), soft starters, and smart protection relays with thermal and overload safeguards.',
    deliverables: [
      'VFD parameterization and multi-speed configuration',
      'Forward/Reverse, braking resistor, and ramp time tuning',
      'Motor protection wiring (thermal overload, phase failure)',
      'PLC-to-VFD Modbus communication or 0-10V analog speed control'
    ],
    technologies: ['Delta VFD', 'Schneider Altivar', 'ABB Drives', 'Invertek', '3-Phase Induction Motors'],
    process: ['Motor rating & load torque calculation', 'VFD/Starter selection', 'Power wiring and noise suppression', 'Parameter tuning and load testing'],
    suitableFor: 'Pumping stations, blowers, extruders, conveyor belts, and heavy industrial machinery.',
    faqs: [{ question: 'Does a VFD save electricity?', answer: 'Yes, on centrifugal pumps and fans, reducing speed even by 20% can save up to 40% in electrical consumption.' }],
    startingBudgetPkr: 'PKR 35,000'
  },
  {
    id: 'control-systems',
    title: 'Control Systems',
    area: 'PLC & Automation',
    shortDescription: 'Closed-loop PID control for temperature, pressure, flow, and liquid level regulation.',
    problem: 'Process variables fluctuating outside tolerances cause product defects and wasteful material scrap.',
    approach: 'We implement closed-loop PID control loops with proper feedback sensor calibration and autotuning.',
    deliverables: [
      'PID control algorithm implementation on PLC / MCU',
      'Analog input scaling (4-20mA, 0-10V, PT100 RTD)',
      'PWM or analog output drive configuration',
      'Tuning documentation with setpoint tracking graphs'
    ],
    technologies: ['PID Algorithms', 'Analog Signal Transmitters', 'Solid State Relays (SSR)', 'Proportional Valves'],
    process: ['Process dynamics evaluation', 'Sensor and final control element calibration', 'PID parameter tuning (Kp, Ki, Kd)', 'Step response testing under load'],
    suitableFor: 'Ovens, chillers, chemical mixing tanks, plastic extruders, and pressure vessels.',
    faqs: [{ question: 'What is PID control?', answer: 'PID (Proportional-Integral-Derivative) control continuously calculates an error value and applies accurate corrections to maintain an exact target temperature or pressure.' }],
    startingBudgetPkr: 'PKR 45,000'
  },
  {
    id: 'sensor-systems',
    title: 'Sensor Systems',
    area: 'PLC & Automation',
    shortDescription: 'Industrial proximity sensors, optical, ultrasonic, load cells, encoders, and level transmitter integration.',
    problem: 'Inappropriate sensor selection leads to false triggering in dusty, humid, or electrically noisy environments.',
    approach: 'We select and calibrate industrial-grade sensors with proper shielding, optical isolation, and robust mechanical mounting.',
    deliverables: [
      'Sensor selection guide matching environment ratings (IP65/IP67)',
      'Optical isolation and signal conditioning circuits',
      'Rotary encoder high-speed pulse counter programming',
      'Load cell amplifier calibration (HX711 or industrial weight transmitters)'
    ],
    technologies: ['Inductive & Capacitive Proximity', 'Photoelectric Sensors', 'Ultrasonic Transducers', 'Rotary Encoders', 'Load Cells'],
    process: ['Environmental and measurement requirement analysis', 'Sensor hardware sourcing', 'Electrical isolation and noise filtration', 'Signal scaling and calibration'],
    suitableFor: 'Automated counting, position detection, level monitoring, and weighing scales.',
    faqs: [{ question: 'How do you prevent electrical noise from causing false sensor pulses?', answer: 'We use shielded twisted-pair cables, proper earthing, optoisolators, and software debounce filtering.' }],
    startingBudgetPkr: 'PKR 30,000'
  },
  {
    id: 'control-panels',
    title: 'Control Panels',
    area: 'PLC & Automation',
    shortDescription: 'Custom electrical control panel design, component layout, ferrule labelling, and neat cable routing.',
    problem: 'Tangled, unlabelled control boxes are a fire hazard and make maintenance a nightmare during breakdowns.',
    approach: 'We assemble structured control panels with DIN-rail layout, cable trunking, circuit breakers, surge arrestors, and numbered wire ferrules.',
    deliverables: [
      'Single-line diagram (SLD) and electrical schematic',
      'Assembled IP-rated steel/polycarbonate enclosure',
      'Neat wire ducting with standard color coding & wire markers',
      'Front-door pilot lamps, push buttons, and digital meters'
    ],
    technologies: ['Schneider / ABB Switchgear', 'Mean Well Power Supplies', 'Finder Relays', 'CAD Schematics'],
    process: ['Load calculation and enclosure sizing', 'Schematic drafting', 'Component mounting and ferrule wiring', 'Insulation and continuity testing', 'Final dispatch/installation'],
    suitableFor: 'Water supply pumps, industrial machinery, generator changeovers, and motor control centres.',
    faqs: [{ question: 'Do you provide electrical schematics with the panel?', answer: 'Yes, every built panel comes with a complete wiring schematic diagram for future maintenance.' }],
    startingBudgetPkr: 'PKR 60,000'
  },

  // --- Arduino / ESP32 / IoT ---
  {
    id: 'arduino-projects',
    title: 'Arduino Projects',
    area: 'Arduino / ESP32 / IoT',
    shortDescription: 'Microcontroller programming, sensor integration, actuator control, and custom hardware prototyping.',
    problem: 'Commercial equipment may be too expensive or inflexible for unique prototype and custom automation concepts.',
    approach: 'We build robust microcontroller systems using Arduino Uno/Nano/Mega with non-blocking code, state machines, and proper relay isolation.',
    deliverables: [
      'Clean, commented C/C++ Arduino code with millis() non-blocking logic',
      'Circuit schematic diagram and wiring pinout chart',
      'Tested prototype hardware with breadboard/perfboard assembly',
      'Component bill of materials (BOM) with local availability'
    ],
    technologies: ['Arduino IDE', 'AVR C/C++', 'Arduino Uno / Nano / Mega', 'Sensors & Relays', 'I2C / SPI Displays'],
    process: ['Concept discussion & hardware selection', 'Circuit simulation and breadboard testing', 'Code development with state machine architecture', 'Hardware testing under real operating conditions', 'Delivery with documentation'],
    suitableFor: 'Engineering students, innovators, hobbyists, and businesses testing specialized hardware automation.',
    faqs: [{ question: 'Can Arduino run 24/7 reliably?', answer: 'Yes, when paired with an optocoupled relay, a filtered DC power supply, and watchdog timer code, it runs continuously without hanging.' }],
    startingBudgetPkr: 'PKR 15,000'
  },
  {
    id: 'esp32-projects',
    title: 'ESP32 Projects',
    area: 'Arduino / ESP32 / IoT',
    shortDescription: 'High-speed 32-bit dual-core processing with built-in Wi-Fi and Bluetooth for smart wireless projects.',
    problem: 'Standard 8-bit microcontrollers lack memory and wireless connectivity for modern web-connected projects.',
    approach: 'We harness the ESP32 dual-core processor to handle real-time sensor reading on Core 0 and Wi-Fi communication on Core 1.',
    deliverables: [
      'ESP32 firmware supporting local web server or BLE control',
      'Wi-Fi auto-reconnect with non-volatile memory credential storage',
      'Over-the-Air (OTA) firmware update capability',
      'Circuit schematic and pin assignment chart'
    ],
    technologies: ['ESP32 (NodeMCU-32S, ESP-WROOM-32)', 'ESP-IDF / Arduino Framework', 'FreeRTOS Tasks', 'BLE / Wi-Fi'],
    process: ['Pinout selection avoiding strapping pins', 'Dual-core task structuring', 'Web server / BLE interface coding', 'Stress and wireless range testing', 'Delivery with code repository'],
    suitableFor: 'Smart home projects, wireless telemetry, remote parameter controllers, and Bluetooth sensor beacons.',
    faqs: [{ question: 'What is the Wi-Fi range of an ESP32?', answer: 'Typically 30-50 meters indoors and up to 100 meters with external antenna modules.' }],
    startingBudgetPkr: 'PKR 25,000'
  },
  {
    id: 'iot-projects',
    title: 'IoT Projects',
    area: 'Arduino / ESP32 / IoT',
    shortDescription: 'Cloud-connected telemetry, MQTT brokers, mobile dashboards, and remote sensor monitoring.',
    problem: 'Remote facilities and equipment require physical visits to inspect status, causing delayed responses to failures.',
    approach: 'We connect edge hardware to cloud dashboards (Blynk, ThingsBoard, Adafruit IO, or custom web APIs) using secure MQTT/HTTPS.',
    deliverables: [
      'Cloud telemetry dashboard with live gauges and historical charts',
      'Automated WhatsApp / Email / SMS alert triggers on threshold breach',
      'Edge microcontroller firmware with offline data buffering',
      'End-to-end cloud setup and mobile app configuration'
    ],
    technologies: ['MQTT Protocol', 'ThingsBoard', 'Blynk IoT', 'ESP32 / SIM800L GSM', 'Webhooks'],
    process: ['Telemetry data points specification', 'Cloud broker & database setup', 'Edge device firmware development', 'Threshold alert testing', 'Mobile dashboard deployment'],
    suitableFor: 'Cold storage monitoring, solar plant telemetry, agricultural irrigation, and remote generator monitoring.',
    faqs: [{ question: 'What if the Internet goes down at the site?', answer: 'We buffer data onto local EEPROM / SD cards and upload automatically once the connection is restored.' }],
    startingBudgetPkr: 'PKR 35,000'
  },
  {
    id: 'sensor-automation',
    title: 'Sensor Automation',
    area: 'Arduino / ESP32 / IoT',
    shortDescription: 'Automated switching based on temperature, humidity, ultrasonic distance, PIR motion, and light levels.',
    problem: 'Manual switching of fans, heaters, lights, and pumps results in high energy waste and human error.',
    approach: 'We design autonomous sensor-driven controllers with adjustable threshold potentiometers and LCD status displays.',
    deliverables: [
      'Autonomous microcontroller circuit with sensor input',
      'Adjustable hysteresis to prevent rapid cycling on threshold margins',
      'Relay output rated for target electrical load',
      'Enclosure and wiring diagram'
    ],
    technologies: ['Ultrasonic (JSN-SR04T / HC-SR04)', 'DHT22 / SHT30', 'LDR Optical', 'Current Transformers (ACS712)'],
    process: ['Requirement analysis and sensor selection', 'Circuit prototype build', 'Hysteresis and debounce logic calibration', 'Load testing with actual appliances'],
    suitableFor: 'Agricultural green houses, incubators, smart lighting, and exhaust ventilation.',
    faqs: [{ question: 'Can the threshold be adjusted without rewriting code?', answer: 'Yes, we provide physical rotary potentiometers, push buttons, or a simple web interface to adjust setpoints.' }],
    startingBudgetPkr: 'PKR 20,000'
  },
  {
    id: 'smart-automation',
    title: 'Smart Automation',
    area: 'Arduino / ESP32 / IoT',
    shortDescription: 'Smart home and building automation: mobile app control, voice assistants, and schedule timers.',
    problem: 'Generic off-the-shelf smart switches often break when local Wi-Fi drops and rely on foreign cloud servers.',
    approach: 'We build hybrid smart automation solutions that work locally offline with physical wall switches while still offering mobile app control.',
    deliverables: [
      'Multi-channel relay controller box',
      'Local web portal and smartphone dashboard',
      'Physical manual override compatibility',
      'Scheduled timer routines (sunrise, sunset, time-of-day)'
    ],
    technologies: ['ESPHome / Tasmota', 'Home Assistant', 'ESP32 / ESP8266', 'Relay Arrays'],
    process: ['House/office electrical survey', 'Modular smart switch configuration', 'Local network setup', 'Commissioning and app testing'],
    suitableFor: 'Offices, farmhouses, residential homes, and commercial showrooms.',
    faqs: [{ question: 'Does it work if the Internet is disconnected?', answer: 'Yes! The local network continues operating all physical switches, local timers, and internal phone apps without the internet.' }],
    startingBudgetPkr: 'PKR 30,000'
  },
  {
    id: 'automatic-water-tank-controller',
    title: 'Automatic Water Tank Controller',
    area: 'Arduino / ESP32 / IoT',
    shortDescription: 'Smart water level automation system with dual-level sensing, dry-run protection, and motor safety switching.',
    problem: 'Overhead tanks overflow wasting precious water and electricity, while underground pumps burn out when run dry.',
    approach: 'We build a dedicated automatic controller using waterproof sensors, an Arduino or ESP32 MCU, optical relay isolation, and dry-run safety logic.',
    deliverables: [
      'Complete controller unit with heavy-duty 30A motor relay',
      'Waterproof stainless steel / ultrasonic water level sensors',
      'Dry-run protection module (halts motor if underground tank is empty)',
      'Front-panel LED / LCD display showing exact water percentage',
      'Manual override switch (Auto / Off / Manual)'
    ],
    technologies: ['Arduino / ESP32', 'Optocoupled 30A Relay', 'Stainless Steel Probes / Ultrasonic JSN-SR04T', '16x2 I2C Display', 'Metal IP-Rated Box'],
    process: [
      'Assess tank depth, motor horsepower, and wiring distance',
      'Program safety timing logic, debouncing, and dry-run timeouts',
      'Assemble control enclosure with surge and fuse protection',
      'Pre-commissioning test and installation wiring guidelines'
    ],
    suitableFor: 'Residential homes, commercial plazas, hotels, mosques, and agricultural storage reservoirs.',
    faqs: [
      {
        question: 'What happens if a sensor cable is cut?',
        answer: 'The system defaults to a fail-safe OFF condition and sounds an alarm rather than risk tank overflow or dry running.'
      },
      {
        question: 'Can this control a 1 HP or 2 HP motor pump?',
        answer: 'Yes, our controllers feature high-current optocoupled relays designed specifically for inductive motor inrush currents.'
      }
    ],
    startingBudgetPkr: 'PKR 18,000'
  },
  {
    id: 'custom-electronics-projects',
    title: 'Custom Electronics Projects',
    area: 'Arduino / ESP32 / IoT',
    shortDescription: 'Custom PCB design, circuit prototyping, power regulation, and custom electronic hardware.',
    problem: 'Breadboards and loose wire connections become unreliable over time in production environments.',
    approach: 'We design custom printed circuit boards (PCBs) in EasyEDA / KiCAD, assemble components, and enclose them in durable cases.',
    deliverables: [
      'Schematic and PCB Gerber design files ready for fabrication',
      'Assembled and soldered prototype board',
      'Power supply filtering and reverse-polarity protection',
      'Bill of materials with Mouser/LCSC/local vendor part numbers'
    ],
    technologies: ['KiCAD / EasyEDA', 'SMD / THT Soldering', 'Voltage Regulators (Buck/Boost)', 'Optocouplers'],
    process: ['Circuit schematic design', 'PCB track routing and design rule checks', 'Board fabrication and component soldering', 'Bench testing under maximum electrical load'],
    suitableFor: 'Product designers, engineering students, hardware startups, and custom device developers.',
    faqs: [{ question: 'Can you design the PCB for low-cost mass production?', answer: 'Yes, we optimize trace routing, use standardized SMD components, and provide complete pick-and-place files.' }],
    startingBudgetPkr: 'PKR 25,000'
  },

  // --- IT Services ---
  {
    id: 'windows-pc-support',
    title: 'Windows / PC Support',
    area: 'IT Services',
    shortDescription: 'Operating system installation, malware removal, performance optimization, and hardware upgrades.',
    problem: 'Sluggish computers, crashing Windows systems, and driver conflicts cripple daily workplace productivity.',
    approach: 'We clean, optimize, and repair Windows installations, eliminate background bloatware, and install genuine security protection.',
    deliverables: ['Clean Windows 11/10 installation & driver updates', 'Malware, spyware, and virus removal', 'SSD upgrade and data cloning for 5x speed boost', 'Thermal paste replacement and internal dust cleaning'],
    technologies: ['Windows 10/11 Pro', 'Cloning Utilities', 'Sysinternals', 'Hardware Diagnostics'],
    process: ['Hardware health diagnosis (RAM, SSD, CPU)', 'Backup critical user data', 'OS repair or clean reinstallation', 'Stress testing and driver optimization'],
    suitableFor: 'Offices, students, retail POS workstations, and home desktop/laptop users.',
    faqs: [{ question: 'Will I lose my files during a Windows reinstall?', answer: 'No, we perform a complete verified backup of your documents, photos, and databases before any system changes.' }],
    startingBudgetPkr: 'PKR 3,000'
  },
  {
    id: 'software-installation',
    title: 'Software Installation',
    area: 'IT Services',
    shortDescription: 'Professional software deployment, configuration, licensing guidance, and essential toolkits.',
    problem: 'Improper software installation can corrupt registry files, introduce security risks, and cause software conflicts.',
    approach: 'We install and properly configure industry software suites, design programs, accounting tools, and CAD packages.',
    deliverables: ['Software installation and proper path configuration', 'Activation and licensing assistance', 'Database connection configuration', 'Desktop shortcuts and backup template setup'],
    technologies: ['Office Suites', 'AutoCAD / Engineering Software', 'Graphic Suites', 'Accounting Software'],
    process: ['Verify system requirements', 'Clean installation of target software', 'Configure plugins and licensing', 'Test file export and stability'],
    suitableFor: 'Engineers, accountants, graphic designers, and office administrators.',
    faqs: [{ question: 'Can you set this up remotely via AnyDesk or TeamViewer?', answer: 'Yes, software installations and configuration can be handled remotely with high-speed remote desktop support.' }],
    startingBudgetPkr: 'PKR 2,500'
  },
  {
    id: 'technical-troubleshooting',
    title: 'Technical Troubleshooting',
    area: 'IT Services',
    shortDescription: 'In-depth diagnostic resolution for mysterious system crashes, blue screens (BSOD), and printer/peripheral errors.',
    problem: 'Persistent Blue Screen errors, frozen apps, or peripheral communication failures that standard IT fixes fail to resolve.',
    approach: 'We analyze Windows Event Viewer logs, memory dump files, and hardware IRQs to pinpoint the exact failure cause.',
    deliverables: ['Root-cause failure diagnosis', 'Crash dump log analysis and resolution', 'Driver rollback / upgrade and conflict resolution', 'Stability stress test verification'],
    technologies: ['WinDbg', 'Event Viewer', 'Hardware Stress Tools', 'Diagnostic Scanners'],
    process: ['Analyze crash codes and error symptoms', 'Inspect hardware logs and thermal parameters', 'Apply targeted driver or OS fix', 'Run 24-hour stability loop'],
    suitableFor: 'Users dealing with chronic crashes, accounting software lockups, or critical office workstations.',
    faqs: [{ question: 'What is causing my Blue Screen of Death (BSOD)?', answer: 'BSODs are usually caused by bad RAM, failing storage drives, or corrupted hardware drivers. We test each component systematically.' }],
    startingBudgetPkr: 'PKR 4,000'
  },
  {
    id: 'basic-networking',
    title: 'Basic Networking',
    area: 'IT Services',
    shortDescription: 'Local area network (LAN) setup, Wi-Fi router optimization, network printer sharing, and file storage.',
    problem: 'Wi-Fi dead zones, intermittent connectivity, and inability to share printers across office computers.',
    approach: 'We wire, configure, and secure office and home networks with proper IP subnetting, Wi-Fi access points, and shared network storage.',
    deliverables: [
      'Wi-Fi router and range extender setup',
      'Cat6 network cabling and RJ45 crimping',
      'Network printer sharing across all office PCs',
      'Local network shared folders with user permissions',
      'Wi-Fi password encryption and guest isolation'
    ],
    technologies: ['MikroTik / TP-Link', 'Cat6 Cabling', 'Samba / Windows Share', 'DHCP & DNS Configuration'],
    process: ['Site layout survey for signal coverage', 'Cable routing and router placement', 'IP assignment and printer sharing', 'Speed and coverage verification'],
    suitableFor: 'Small offices, retail shops, multi-room houses, and schools.',
    faqs: [{ question: 'Can you fix Wi-Fi dead spots in my building?', answer: 'Yes, we set up wired access points or mesh extenders to provide seamless roaming coverage throughout the premises.' }],
    startingBudgetPkr: 'PKR 8,000'
  },
  {
    id: 'software-solutions',
    title: 'Software Solutions',
    area: 'IT Services',
    shortDescription: 'Business software consultation, workflow integration, automated backup routines, and digital tool selection.',
    problem: 'Companies spend money on mismatched software packages that do not talk to each other and waste staff time.',
    approach: 'We evaluate your daily operations and recommend or assemble the most practical, cost-effective digital software setup.',
    deliverables: [
      'Comprehensive IT workflow evaluation',
      'Automated cloud and local backup routine setup',
      'Integration between accounting, inventory, and sales sheets',
      'Staff training documentation and operational procedures'
    ],
    technologies: ['Cloud Sync Utilities', 'Database Automation', 'Cross-Platform Integrations'],
    process: ['Evaluate current business workflow bottleneck', 'Design practical software architecture', 'Implement tools and automated sync', 'Train users and verify backups'],
    suitableFor: 'Growing commercial firms aiming to eliminate manual paperwork and safeguard company data.',
    faqs: [{ question: 'How do we protect our business data against ransomware?', answer: 'We set up 3-2-1 automated backup routines where copies are kept both locally and on encrypted off-site cloud storage.' }],
    startingBudgetPkr: 'PKR 15,000'
  }
];
