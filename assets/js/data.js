/* =====================================================================
   ΚΑΥΚΑΣ — Data layer: icons, categories, products, helpers
   ===================================================================== */

/* ----------  Lucide-style icon set (24x24 stroke paths)  ---------- */
const ICONS = {
  plug: '<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8zM12 17v5"/>',
  bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>',
  headphones: '<path d="M3 14v-2a9 9 0 0 1 18 0v2M3 14a3 3 0 0 0 3 3v0a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2v0a3 3 0 0 0-3 3zM21 14a3 3 0 0 1-3 3v0a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2v0a3 3 0 0 1 3 3z"/>',
  speaker: '<rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="6" r="1"/>',
  cable: '<path d="M4 9V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4M4 9h4M6 9v4a6 6 0 0 0 6 6h0a6 6 0 0 0 6-6V9M16 9V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4M16 9h4"/>',
  battery: '<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M21.5 10.5v3"/><path d="M11 9l-2 3.5h3l-2 3.5" stroke-linejoin="round"/>',
  charger: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
  watch: '<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 6l.5-3h5l.5 3M9 18l.5 3h5l.5-3M12 10v2.5l1.5 1"/>',
  camera: '<path d="M14 4h2l1.5 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.5L8 4h2"/><circle cx="12" cy="13" r="4"/>',
  cctv: '<path d="M3 7l16-3 1 5-16 3-1-5zM3 7l-1 5M5 12l2 4M9 20h6a3 3 0 0 0 3-3v-1"/>',
  keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>',
  mouse: '<rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 7v4"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  webcam: '<circle cx="12" cy="10" r="7"/><circle cx="12" cy="10" r="3"/><path d="M7 18h10l-1 3H8l-1-3z"/>',
  thermostat: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  router: '<rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 17h.01M11 17h.01M16 16v2M12 9a4 4 0 0 1 4 4M12 5a8 8 0 0 1 8 8"/>',
  smarthome: '<path d="M3 11l9-7 9 7M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/><circle cx="12" cy="14" r="2.5"/>',
  ledstrip: '<rect x="2" y="9" width="20" height="6" rx="3"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/>',
  floodlight: '<path d="M7 4h10l-1.5 8h-7L7 4zM9 12v3a3 3 0 0 0 6 0v-3M12 18v3M9 21h6"/>',
  desklamp: '<path d="M4 21h10M9 21v-7M9 14 7 7l8-3 1.5 4M16 8l3 2-2 3-3-2"/>',
  soundbar: '<rect x="2" y="9" width="20" height="6" rx="3"/><circle cx="7" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="17" cy="12" r="1.4"/>',
  stream: '<rect x="7" y="3" width="10" height="14" rx="2"/><path d="M12 17v4M9 21h6M12 7v3"/>',
  hub: '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2"/>',
  smoke: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 5v2M12 17v2M5 12h2M17 12h2"/>',
  usbhub: '<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M7 8V6M11 8V6M7 16v2M15 8V5l2 1M15 16v2"/>',
  powerstrip: '<rect x="2" y="9" width="20" height="6" rx="2"/><path d="M6 12h2M11 12h2M16 12h2M2 12H1"/>',
  wirelesscharge: '<circle cx="12" cy="12" r="8"/><path d="M13 8l-3 5h3l-1 4 3-5h-3l1-4z"/>',
  scale: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8c1.5 2 6.5 2 8 0M12 8v4" stroke-linecap="round"/>',
  drone: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/><path d="M7.7 7.7 9 9M16.3 7.7 15 9M7.7 16.3 9 15M16.3 16.3 15 15"/>',
  vacuum: '<path d="M3 20h18M6 20v-5a6 6 0 0 1 12 0v5M12 9V4M12 4h5"/><circle cx="12" cy="20" r="0"/>',
  fitness: '<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M12 9v6M9 12h6"/><path d="M9 6V4h6v2M9 18v2h6v-2"/>',
  // UI icons
  cart: '<circle cx="9" cy="21" r="1.6"/><circle cx="18" cy="21" r="1.6"/><path d="M2 3h3l2.4 12.4a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.2L22 7H6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-3.5-3.5"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  chevDown: '<path d="m6 9 6 6 6-6"/>',
  chevRight: '<path d="m9 6 6 6-6 6"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  star: '<path d="m12 2 2.9 6 6.6.6-5 4.3 1.5 6.5L12 16l-5.9 3.4L7.6 13l-5-4.3 6.6-.6L12 2z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  truck: '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7M5.5 18a1.5 1.5 0 1 0 0-.01M17.5 18a1.5 1.5 0 1 0 0-.01"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3z"/><path d="m9 12 2 2 4-4"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2zM20 14a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM18 16v1a3 3 0 0 1-3 3h-3"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  phone: '<path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 11l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  minus: '<path d="M5 12h14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v6M18 9v6"/>',
  paypal: '<path d="M7 21l2-12h5a3 3 0 0 1 0 6h-4M10 21l1.2-7"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8C9 8 8 3 12 3c4 0 3 5 0 5z"/>',
  filter: '<path d="M3 5h18l-7 8v5l-4 2v-7L3 5z"/>',
  sliders: '<path d="M4 6h16M4 12h16M4 18h16M9 4v4M16 10v4M7 16v4"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M9 14l-1.5 7L12 18l4.5 3L15 14"/>',
  zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
  facebook: '<path d="M16 8h-3a2 2 0 0 0-2 2v12M8 12h6" /><path d="M13 22V10a3 3 0 0 1 3-3h0"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  tiktok: '<path d="M10 8v8a3 3 0 1 1-3-3M10 8c0 2 1.5 4 4 4M14 5c0 3 0 0 0 0 .5 2 2 3 4 3"/>',
  youtube: '<rect x="2" y="6" width="20" height="12" rx="4"/><path d="m10 9 5 3-5 3V9z"/>'
};

function icon(name, cls) {
  const p = ICONS[name] || '';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="${cls || ''}" aria-hidden="true">${p}</svg>`;
}

/* ----------  Categories  ---------- */
const CATEGORIES = [
  { slug: 'smart-home',  name: 'Smart Home',            icon: 'smarthome',  tint: 'rgba(94,136,194,0.22)' },
  { slug: 'lighting',    name: 'Φωτισμός',              icon: 'bulb',       tint: 'rgba(210,175,110,0.20)' },
  { slug: 'audio-video', name: 'Ήχος & Εικόνα',         icon: 'headphones', tint: 'rgba(120,142,186,0.20)' },
  { slug: 'cables',      name: 'Καλώδια & Αντάπτορες',  icon: 'cable',      tint: 'rgba(94,136,194,0.18)' },
  { slug: 'power',       name: 'Ενέργεια & Μπαταρίες',  icon: 'battery',    tint: 'rgba(190,168,118,0.18)' },
  { slug: 'gadgets',     name: 'Gadgets',               icon: 'watch',      tint: 'rgba(120,142,186,0.20)' },
  { slug: 'accessories', name: 'Αξεσουάρ Υπ. & Κιν.',   icon: 'keyboard',   tint: 'rgba(94,136,194,0.20)' },
  { slug: 'security',    name: 'Ασφάλεια & Κάμερες',    icon: 'cctv',       tint: 'rgba(150,160,182,0.18)' }
];

function catBySlug(slug) { return CATEGORIES.find(c => c.slug === slug); }

/* ----------  Products  ---------- */
const PRODUCTS = [
  // Smart Home
  { id:'sh1', name:'Έξυπνη Πρίζα Wi-Fi 16A', cat:'smart-home', icon:'plug', price:19.90, old:26.90, rating:4.7, reviews:212, brand:'KX Home', badge:'sale', desc:'Ελέγξτε κάθε συσκευή από το κινητό σας. Χρονοπρογραμματισμός, μέτρηση κατανάλωσης και φωνητικός έλεγχος.', specs:[['Σύνδεση','Wi-Fi 2.4GHz'],['Μέγιστο φορτίο','16A / 3680W'],['Φωνητικός έλεγχος','Alexa, Google'],['Εφαρμογή','iOS & Android'],['Εγγύηση','2 έτη']] },
  { id:'sh2', name:'Έξυπνος Θερμοστάτης Pro', cat:'smart-home', icon:'thermostat', price:89.00, old:0, rating:4.8, reviews:96, brand:'KX Home', badge:'new', desc:'Εξοικονομήστε έως 23% στη θέρμανση με αυτόματη εκμάθηση συνηθειών και γεωγραφικό εντοπισμό.', specs:[['Οθόνη','LCD αφής'],['Συμβατότητα','Λέβητας/Boiler'],['Σύνδεση','Wi-Fi'],['Αισθητήρες','Θερμ./Υγρασία'],['Εγγύηση','3 έτη']] },
  { id:'sh3', name:'Smart Hub Κέντρο Ελέγχου', cat:'smart-home', icon:'hub', price:59.00, old:69.00, rating:4.6, reviews:78, brand:'KX Home', badge:'', desc:'Ενώστε όλες τις έξυπνες συσκευές σας σε ένα σημείο. Υποστηρίζει Zigbee, Z-Wave και Wi-Fi.', specs:[['Πρωτόκολλα','Zigbee, Z-Wave'],['Συσκευές','έως 100'],['Θύρες','Ethernet, USB'],['Εφαρμογή','KX Home'],['Εγγύηση','2 έτη']] },
  { id:'sh4', name:'Έξυπνη Κλειδαριά Δακτυλικού', cat:'smart-home', icon:'lock', price:149.00, old:0, rating:4.9, reviews:54, brand:'SecureGo', badge:'new', desc:'Ξεκλειδώστε με δακτυλικό αποτύπωμα, κωδικό, κάρτα ή εφαρμογή. Ειδοποιήσεις σε πραγματικό χρόνο.', specs:[['Άνοιγμα','5 τρόποι'],['Αποτυπώματα','έως 50'],['Μπαταρία','6-8 μήνες'],['Υλικό','Ατσάλι'],['Εγγύηση','3 έτη']] },
  // Lighting
  { id:'li1', name:'Έξυπνη Λάμπα RGB E27', cat:'lighting', icon:'bulb', price:12.90, old:17.90, rating:4.7, reviews:340, brand:'Lumio', badge:'sale', desc:'16 εκατομμύρια χρώματα, ρυθμιζόμενη ένταση και σκηνές διάθεσης — όλα από το κινητό.', specs:[['Ισχύς','9W (60W ισοδ.)'],['Χρώματα','16M RGBW'],['Φωτεινότητα','806 lm'],['Σύνδεση','Wi-Fi'],['Διάρκεια','25.000 ώρες']] },
  { id:'li2', name:'Ταινία LED 5m RGB Smart', cat:'lighting', icon:'ledstrip', price:24.90, old:0, rating:4.5, reviews:188, brand:'Lumio', badge:'', desc:'Κόβεται στο μήκος που θέλετε, συγχρονίζεται με μουσική και αλλάζει χρώμα με ένα άγγιγμα.', specs:[['Μήκος','5 μέτρα'],['LED','150 RGB'],['Έλεγχος','App + Τηλεχ.'],['Μουσική','Συγχρονισμός'],['Τροφοδοσία','USB/Πρίζα']] },
  { id:'li3', name:'Φωτιστικό Γραφείου LED', cat:'lighting', icon:'desklamp', price:34.90, old:42.00, rating:4.6, reviews:129, brand:'Lumio', badge:'', desc:'Προστασία ματιών, 5 θερμοκρασίες φωτός και ασύρματη φόρτιση κινητού στη βάση.', specs:[['Λειτουργίες','5 σκηνές'],['Φόρτιση','Qi 10W'],['Ισχύς','12W'],['Έλεγχος','Αφής'],['Εγγύηση','2 έτη']] },
  { id:'li4', name:'Προβολέας LED 50W IP66', cat:'lighting', icon:'floodlight', price:29.90, old:0, rating:4.8, reviews:74, brand:'Lumio', badge:'new', desc:'Ισχυρός εξωτερικός φωτισμός με αντοχή σε βροχή και σκόνη. Ιδανικός για αυλή και είσοδο.', specs:[['Ισχύς','50W'],['Φωτεινότητα','4500 lm'],['Στεγανότητα','IP66'],['Χρώμα','6500K'],['Διάρκεια','30.000 ώρες']] },
  // Audio & Video
  { id:'av1', name:'Ασύρματα Ακουστικά ANC', cat:'audio-video', icon:'headphones', price:79.00, old:99.00, rating:4.8, reviews:415, brand:'Sonora', badge:'sale', desc:'Ενεργή ακύρωση θορύβου, 40 ώρες αυτονομία και κρυστάλλινος ήχος Hi-Res.', specs:[['Τύπος','Over-ear ANC'],['Αυτονομία','40 ώρες'],['Bluetooth','5.3'],['Φόρτιση','USB-C γρήγορη'],['Μικρόφωνο','ENC κλήσεων']] },
  { id:'av2', name:'Ηχείο Bluetooth Αδιάβροχο', cat:'audio-video', icon:'speaker', price:45.00, old:0, rating:4.6, reviews:267, brand:'Sonora', badge:'', desc:'360° ήχος, βαθιά μπάσα και αντοχή στο νερό IPX7 για παραλία και πισίνα.', specs:[['Ισχύς','20W'],['Αυτονομία','18 ώρες'],['Στεγανότητα','IPX7'],['Σύζευξη','TWS διπλό'],['Bluetooth','5.3']] },
  { id:'av3', name:'Soundbar 2.1 με Subwoofer', cat:'audio-video', icon:'soundbar', price:129.00, old:159.00, rating:4.7, reviews:142, brand:'Sonora', badge:'hot', desc:'Κινηματογραφικός ήχος για την τηλεόρασή σας με ασύρματο subwoofer και HDMI ARC.', specs:[['Ισχύς','120W'],['Κανάλια','2.1'],['Σύνδεση','HDMI ARC, Optical'],['Subwoofer','Ασύρματο'],['Λειτουργίες','Movie/Music']] },
  { id:'av4', name:'Streaming Stick 4K', cat:'audio-video', icon:'stream', price:39.90, old:0, rating:4.5, reviews:203, brand:'Sonora', badge:'new', desc:'Μετατρέψτε κάθε τηλεόραση σε Smart TV με 4K HDR και όλες τις δημοφιλείς εφαρμογές.', specs:[['Ανάλυση','4K HDR'],['Σύνδεση','HDMI + Wi-Fi'],['Τηλεχειριστήριο','Φωνητικό'],['Εφαρμογές','Netflix, YouTube+'],['RAM','2GB']] },
  // Cables & Adapters
  { id:'ca1', name:'Καλώδιο USB-C 100W 2m', cat:'cables', icon:'cable', price:11.90, old:0, rating:4.8, reviews:521, brand:'CoreLink', badge:'', desc:'Πλεκτό νάιλον, γρήγορη φόρτιση 100W και μεταφορά δεδομένων 480Mbps. Σχεδόν άφθαρτο.', specs:[['Ισχύς','100W PD'],['Μήκος','2 μέτρα'],['Υλικό','Πλεκτό νάιλον'],['Δεδομένα','480 Mbps'],['Αντοχή','25.000 λυγίσματα']] },
  { id:'ca2', name:'Καλώδιο HDMI 2.1 8K 2m', cat:'cables', icon:'monitor', price:14.90, old:19.90, rating:4.7, reviews:188, brand:'CoreLink', badge:'sale', desc:'Υποστηρίζει 8K@60Hz και 4K@120Hz με eARC — ιδανικό για κονσόλες νέας γενιάς.', specs:[['Ανάλυση','8K@60Hz'],['Bandwidth','48 Gbps'],['eARC','Ναι'],['Μήκος','2 μέτρα'],['VRR','Ναι']] },
  { id:'ca3', name:'Πολύπριζο 5 Θέσεων + USB', cat:'cables', icon:'powerstrip', price:22.90, old:0, rating:4.6, reviews:96, brand:'CoreLink', badge:'', desc:'5 πρίζες σούκο, 3 θύρες USB και προστασία υπέρτασης για τις συσκευές σας.', specs:[['Πρίζες','5 σούκο'],['USB','2x A + 1x C'],['Καλώδιο','1.8 μέτρα'],['Προστασία','Υπέρταση'],['Διακόπτης','Ναι']] },
  { id:'ca4', name:'USB-C Hub 7-σε-1', cat:'cables', icon:'usbhub', price:34.90, old:44.90, rating:4.7, reviews:154, brand:'CoreLink', badge:'hot', desc:'Επεκτείνετε το laptop σας: HDMI 4K, 3x USB, ανάγνωση καρτών και Power Delivery.', specs:[['Θύρες','7-σε-1'],['Βίντεο','HDMI 4K'],['USB','3x 3.0'],['Κάρτες','SD/microSD'],['PD','100W pass-through']] },
  // Power & Batteries
  { id:'pw1', name:'Power Bank 20.000mAh', cat:'power', icon:'battery', price:29.90, old:0, rating:4.8, reviews:389, brand:'VoltX', badge:'', desc:'Φορτίστε το κινητό σας έως 4 φορές. Γρήγορη φόρτιση 22.5W και οθόνη ένδειξης.', specs:[['Χωρητικότητα','20.000 mAh'],['Έξοδος','22.5W'],['Θύρες','USB-C + 2x USB-A'],['Οθόνη','LED ποσοστού'],['Φόρτιση','PD/QC']] },
  { id:'pw2', name:'Φορτιστής GaN 65W', cat:'power', icon:'charger', price:27.90, old:34.90, rating:4.9, reviews:276, brand:'VoltX', badge:'sale', desc:'Φορτίστε laptop, tablet και κινητό ταυτόχρονα από έναν συμπαγή φορτιστή GaN.', specs:[['Ισχύς','65W'],['Θύρες','2x USB-C + USB-A'],['Τεχνολογία','GaN II'],['Μέγεθος','Συμπαγής'],['Ασφάλεια','Πολλαπλή']] },
  { id:'pw3', name:'Μπαταρίες AA Επαναφορτ. 4τμχ', cat:'power', icon:'battery', price:13.90, old:0, rating:4.6, reviews:142, brand:'VoltX', badge:'', desc:'2.600mAh, έως 1.200 κύκλοι φόρτισης. Έτοιμες για χρήση κατευθείαν από τη συσκευασία.', specs:[['Τύπος','AA NiMH'],['Χωρητικότητα','2600 mAh'],['Κύκλοι','έως 1200'],['Τεμάχια','4'],['Pre-charged','Ναι']] },
  { id:'pw4', name:'Ασύρματος Φορτιστής 15W', cat:'power', icon:'wirelesscharge', price:18.90, old:0, rating:4.5, reviews:118, brand:'VoltX', badge:'new', desc:'Απλά ακουμπήστε το κινητό και φορτίστε. Συμβατός με όλες τις Qi συσκευές.', specs:[['Ισχύς','15W Qi'],['Συμβατότητα','iPhone/Android'],['Προστασία','Υπερθέρμανση'],['Ένδειξη','LED'],['Καλώδιο','USB-C']] },
  // Gadgets
  { id:'gd1', name:'Smartwatch Fitness AMOLED', cat:'gadgets', icon:'fitness', price:59.00, old:79.00, rating:4.7, reviews:298, brand:'Pulse', badge:'sale', desc:'Παρακολούθηση καρδιακών παλμών, SpO2, ύπνου και 100+ αθλημάτων. Οθόνη AMOLED.', specs:[['Οθόνη','1.43" AMOLED'],['Αυτονομία','14 ημέρες'],['Στεγανότητα','5 ATM'],['Αισθητήρες','HR/SpO2'],['Αθλήματα','100+']] },
  { id:'gd2', name:'Mini Drone HD με Κάμερα', cat:'gadgets', icon:'drone', price:69.00, old:0, rating:4.4, reviews:87, brand:'Pulse', badge:'new', desc:'Σταθερές λήψεις HD, αυτόματη αιώρηση και έλεγχος από κινητό. Ιδανικό για αρχάριους.', specs:[['Κάμερα','1080p HD'],['Αυτονομία','15 λεπτά'],['Εμβέλεια','100 μέτρα'],['Λειτουργίες','Hover/Flip'],['Μπαταρίες','2 στο κουτί']] },
  { id:'gd3', name:'Ηλεκτρική Σκούπα Χειρός', cat:'gadgets', icon:'vacuum', price:49.00, old:64.00, rating:4.6, reviews:165, brand:'Pulse', badge:'hot', desc:'Ισχυρή αναρρόφηση για αυτοκίνητο και σπίτι. Ασύρματη, ελαφριά και επαναφορτιζόμενη.', specs:[['Αναρρόφηση','8000 Pa'],['Αυτονομία','30 λεπτά'],['Βάρος','0.5 kg'],['Φίλτρο','HEPA'],['Φόρτιση','USB-C']] },
  { id:'gd4', name:'Έξυπνη Ζυγαριά Σώματος', cat:'gadgets', icon:'scale', price:29.90, old:0, rating:4.5, reviews:112, brand:'Pulse', badge:'', desc:'13 μετρήσεις σώματος με ανάλυση στην εφαρμογή. Συγχρονισμός με Apple Health & Google Fit.', specs:[['Μετρήσεις','13 δείκτες'],['Σύνδεση','Bluetooth'],['Χρήστες','Απεριόριστοι'],['Επιφάνεια','Tempered glass'],['App','iOS/Android']] },
  // Accessories
  { id:'ac1', name:'Μηχανικό Πληκτρολόγιο RGB', cat:'accessories', icon:'keyboard', price:54.90, old:69.90, rating:4.8, reviews:231, brand:'Forge', badge:'sale', desc:'Hot-swappable διακόπτες, RGB φωτισμός ανά πλήκτρο και αντοχή για εκατομμύρια πατήματα.', specs:[['Τύπος','Μηχανικό TKL'],['Διακόπτες','Hot-swap'],['Φωτισμός','RGB per-key'],['Σύνδεση','USB-C / 2.4G'],['Keycaps','PBT']] },
  { id:'ac2', name:'Ασύρματο Ποντίκι Silent', cat:'accessories', icon:'mouse', price:19.90, old:0, rating:4.6, reviews:184, brand:'Forge', badge:'', desc:'Αθόρυβα κλικ, εργονομικός σχεδιασμός και αισθητήρας 4000 DPI για ακρίβεια.', specs:[['DPI','έως 4000'],['Σύνδεση','2.4G + BT'],['Πλήκτρα','6'],['Μπαταρία','18 μήνες'],['Κλικ','Silent']] },
  { id:'ac3', name:'Βάση Laptop Αλουμινίου', cat:'accessories', icon:'monitor', price:27.90, old:0, rating:4.7, reviews:143, brand:'Forge', badge:'', desc:'Εργονομική ανύψωση και καλύτερος εξαερισμός. Πτυσσόμενη και φορητή.', specs:[['Υλικό','Αλουμίνιο'],['Συμβατότητα','11"-17"'],['Ύψος','Ρυθμιζόμενο'],['Πτυσσόμενη','Ναι'],['Αντιολισθητική','Ναι']] },
  { id:'ac4', name:'Webcam 1080p με Μικρόφωνο', cat:'accessories', icon:'webcam', price:24.90, old:32.90, rating:4.5, reviews:97, brand:'Forge', badge:'sale', desc:'Κρυστάλλινη εικόνα Full HD με αυτόματη εστίαση και διπλό μικρόφωνο μείωσης θορύβου.', specs:[['Ανάλυση','1080p 30fps'],['Εστίαση','Auto'],['Μικρόφωνο','Διπλό'],['Σύνδεση','USB plug & play'],['Κάλυμμα','Privacy']] },
  // Security
  { id:'se1', name:'Κάμερα Wi-Fi Εσωτ. 2K', cat:'security', icon:'webcam', price:34.90, old:0, rating:4.7, reviews:256, brand:'SecureGo', badge:'', desc:'Παρακολούθηση σε 2K, νυχτερινή λήψη, ανίχνευση κίνησης και αμφίδρομη ομιλία.', specs:[['Ανάλυση','2K QHD'],['Νύχτα','Υπέρυθρες'],['Ανίχνευση','Κίνηση/Άνθρωπος'],['Ήχος','Αμφίδρομος'],['Αποθήκευση','microSD/Cloud']] },
  { id:'se2', name:'Κάμερα Εξωτ. Μπαταρίας', cat:'security', icon:'cctv', price:79.00, old:99.00, rating:4.8, reviews:134, brand:'SecureGo', badge:'hot', desc:'Πλήρως ασύρματη με μπαταρία 6 μηνών, αντοχή IP65 και έγχρωμη νυχτερινή λήψη.', specs:[['Ανάλυση','2K'],['Μπαταρία','6 μήνες'],['Στεγανότητα','IP65'],['Νύχτα','Έγχρωμη'],['Σειρήνα','Ναι']] },
  { id:'se3', name:'Κουδούνι με Κάμερα', cat:'security', icon:'camera', price:69.00, old:0, rating:4.6, reviews:108, brand:'SecureGo', badge:'new', desc:'Δείτε ποιος χτυπά από το κινητό σας, μιλήστε και λάβετε ειδοποιήσεις παντού.', specs:[['Ανάλυση','2K'],['Οπτικό πεδίο','160°'],['Ήχος','Αμφίδρομος'],['Τροφοδοσία','Μπαταρία/Ρεύμα'],['Ανίχνευση','PIR']] },
  { id:'se4', name:'Έξυπνος Ανιχνευτής Καπνού', cat:'security', icon:'smoke', price:24.90, old:0, rating:4.7, reviews:73, brand:'SecureGo', badge:'', desc:'Άμεση ειδοποίηση στο κινητό σε περίπτωση καπνού. Δοκιμή και σίγαση από την εφαρμογή.', specs:[['Αισθητήρας','Φωτοηλεκτρικός'],['Ειδοποίηση','App + Σειρήνα'],['Μπαταρία','έως 3 έτη'],['Σύνδεση','Wi-Fi'],['Πιστοποίηση','CE/EN14604']] }
];

/* ----------  Helpers  ---------- */
function getProduct(id) { return PRODUCTS.find(p => p.id === id); }
function fmt(n) { return '€' + n.toFixed(2).replace('.', ','); }
function catCount(slug) { return PRODUCTS.filter(p => p.cat === slug).length; }

/* Build the generated product visual (no external images) */
/* Real product photos: map product id -> filename in assets/img/products/.
   Add an entry per photo (any format), e.g.  av1: 'av1.webp'
   Products without an entry show the clean white-background icon. */
const PRODUCT_PHOTOS = {
  // sh1: 'sh1.jpg', av1: 'av1.jpg', ...
};

function productVisual(p, variant) {
  const file = PRODUCT_PHOTOS[p.id] || p.img;
  const inner = file
    ? `<img src="assets/img/products/${file}" alt="${p.name}" loading="lazy">`
    : `<span class="device">${icon(p.icon)}</span>`;
  return `<div class="pv">${inner}</div>`;
}

function starsHtml(rating) {
  let s = '';
  for (let i = 0; i < 5; i++) {
    const fill = i < Math.round(rating) ? 'var(--gold)' : 'rgba(255,255,255,0.15)';
    s += `<svg viewBox="0 0 24 24" fill="${fill}" stroke="none" aria-hidden="true">${ICONS.star}</svg>`;
  }
  return `<span class="stars">${s}</span>`;
}

/* Product card markup */
function productCard(p) {
  const badge = p.badge ? `<div class="badges"><span class="badge ${p.badge}">${p.badge === 'sale' ? 'Προσφορά' : p.badge === 'new' ? 'Νέο' : 'Best seller'}</span></div>` : '';
  const was = p.old ? `<span class="was">${fmt(p.old)}</span>` : '';
  const cat = catBySlug(p.cat);
  return `<article class="product-card reveal" data-id="${p.id}">
    <div class="pv-wrap">
      ${badge}
      <a href="product.html?id=${p.id}" aria-label="${p.name}">${productVisual(p)}</a>
    </div>
    <div class="pc-body">
      <span class="pc-cat">${cat ? cat.name : ''}</span>
      <h3 class="pc-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="pc-rating">${starsHtml(p.rating)}<span>${p.rating.toFixed(1)} · ${p.reviews}</span></div>
      <div class="pc-foot">
        <div class="price"><span class="now">${fmt(p.price)}</span>${was}</div>
        <button class="add-btn" data-add="${p.id}" aria-label="Προσθήκη στο καλάθι">${icon('cart')}</button>
      </div>
    </div>
  </article>`;
}
