export interface VehicleSpec {
  icon: string
  label: string
  value: string
}

export interface Vehicle {
  id: string
  slug: string
  name: string
  brand: string
  tag: string
  category: 'suv' | 'berline' | 'pickup'
  price: number
  deposit: number
  available: boolean
  featured?: boolean
  rating: number
  reviewsCount: number
  year: number
  meta: string
  desc: string
  longDesc: string
  specs: VehicleSpec[]
  features: string[]
  imgs: string[]
}

export const VEHICLES: Vehicle[] = [
  {
    id: '1',
    slug: 'jetour-x70',
    name: 'Jetour X70 Executive Plus',
    brand: 'Jetour',
    tag: 'SUV Flagship • Millésime 2024',
    category: 'suv',
    price: 70000,
    deposit: 300000,
    available: true,
    featured: true,
    rating: 4.95,
    reviewsCount: 38,
    year: 2024,
    meta: '7 Places VIP • Boîte Auto 8 • Essence Turbo',
    desc: "Intérieur cuir Nappa, assistance de conduite niveau 2, suspensions calibrées pour le réseau routier camerounais.",
    longDesc: "Le Jetour X70 Executive Plus incarne l'alliance parfaite entre stature imposante et confort feutré. Spécialement équipé pour les exigences des axes routiers de Douala et Yaoundé, ce SUV 7 places offre une habitabilité généreuse, une climatisation bi-zone ultra-performante et une insonorisation acoustique remarquable.",
    specs: [
      { icon: 'users', label: 'Capacité', value: '7 Places VIP' },
      { icon: 'gauge', label: 'Boîte', value: 'Automatique 8 rapports' },
      { icon: 'fuel', label: 'Motorisation', value: '2.0L Turbo 254 ch' },
      { icon: 'wind', label: 'Climatisation', value: 'Dual Zone Tropicalisée' },
      { icon: 'sun', label: 'Toit', value: 'Panoramique ouvrant' },
      { icon: 'shield-check', label: 'Sécurité', value: 'Caméra 360° + Radars' },
    ],
    features: [
      'Intérieur cuir Nappa étendu',
      'Écran tactile 10.25 pouces avec Apple CarPlay & Android Auto',
      'Assistance au maintien de voie et régulateur adaptatif',
      'Ouverture de coffre électrique mains libres',
      'Chauffeur protocolaire accrédité disponible sur demande',
    ],
    imgs: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: '2',
    slug: 'toyota-fortuner',
    name: 'Toyota Fortuner 4x4 Légende',
    brand: 'Toyota',
    tag: 'SUV Robuste • Tout-Terrain Conquérant',
    category: 'suv',
    price: 65000,
    deposit: 250000,
    available: true,
    featured: true,
    rating: 4.98,
    reviewsCount: 64,
    year: 2024,
    meta: '7 Places • 4x4 Intégral • Diesel 2.8L',
    desc: "Le franchisseur souverain du Cameroun. Garde au sol surélevée, transmission intégrale et robustesse légendaire.",
    longDesc: "Véritable icône de fiabilité, le Toyota Fortuner est l'allié incontournable pour vos déplacements entre les capitales économique et politique, ainsi que pour les missions régionales. Son moteur Diesel 2.8L D-4D offre un couple généreux dès les bas régimes, tandis que ses 7 vraies places assurent un confort royal à tous les passagers.",
    specs: [
      { icon: 'users', label: 'Capacité', value: '7 Places' },
      { icon: 'gauge', label: 'Boîte', value: 'Automatique 6 rapports' },
      { icon: 'fuel', label: 'Motorisation', value: 'Diesel 2.8L D-4D 204 ch' },
      { icon: 'compass', label: 'Transmission', value: '4x4 Intégral avec blocage' },
      { icon: 'wind', label: 'Climatisation', value: 'Bi-zone avant / arrière' },
      { icon: 'shield-check', label: 'Assurance', value: 'Tous Risques Intégrale' },
    ],
    features: [
      'Suspension renforcée tropicale haute résistance',
      'Phares Bi-LED automatiques et antibrouillards',
      'Système audio tactile 9 pouces avec Bluetooth et USB',
      'Caméra de recul haute définition avec lignes de guidage',
      'Marchepieds latéraux et barres de toit aluminium',
    ],
    imgs: [
      '/images/vehicles/toyota-fortuner.jpg',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: '3',
    slug: 'mercedes-e220',
    name: 'Mercedes-Benz E 220 d Executive',
    brand: 'Mercedes-Benz',
    tag: 'Berline d\'Apparat • Prestige Absolu',
    category: 'berline',
    price: 90000,
    deposit: 350000,
    available: true,
    featured: true,
    rating: 5.0,
    reviewsCount: 42,
    year: 2024,
    meta: '5 Places VIP • Cuir Nappa • Diesel Micro-Hybride',
    desc: "Élégance magistrale et insonorisation d'exception pour réceptions diplomatiques, mariages et sommets.",
    longDesc: "La Mercedes-Benz Classe E incarne l'élégance statutaire par excellence. Prisée des personnalités diplomatiques et chefs d'entreprise à Douala et Yaoundé, elle associe raffinement intérieur en cuir Nappa, éclairage d'ambiance 64 coloris et la douceur inimitable de la boîte 9G-TRONIC.",
    specs: [
      { icon: 'users', label: 'Capacité', value: '5 Places VIP' },
      { icon: 'gauge', label: 'Boîte', value: 'Automatique 9G-TRONIC' },
      { icon: 'fuel', label: 'Motorisation', value: 'Diesel 2.0L 197 ch EQ Boost' },
      { icon: 'sparkles', label: 'Confort', value: 'Suspension pneumatique feutrée' },
      { icon: 'wind', label: 'Climatisation', value: 'Thermotronic 4 zones' },
      { icon: 'shield-check', label: 'Protocole', value: 'Chauffeur d\'honneur possible' },
    ],
    features: [
      'Double écran géant MBUX avec commande vocale intelligente',
      'Système audio haute fidélité Burmester Surround 3D',
      'Sièges avant et arrière chauffants et ventilés',
      'Vitrage latéral feuilleté acoustique haute discrétion',
      'Pack d\'assistance à la conduite autonome niveau 2',
    ],
    imgs: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: '4',
    slug: 'toyota-rav4',
    name: 'Toyota RAV4 Limited Hybrid AWD',
    brand: 'Toyota',
    tag: 'Hybride Intelligent & Confort Tropical',
    category: 'suv',
    price: 65000,
    deposit: 250000,
    available: true,
    rating: 4.92,
    reviewsCount: 29,
    year: 2024,
    meta: 'AWD • 5 Places • Motorisation Hybride 222 ch',
    desc: "Sobriété énergétique, motricité AWD permanente intelligente et système audio JBL haut de gamme.",
    longDesc: "Le Toyota RAV4 Hybride réunit le meilleur de deux mondes : la sobriété d'une motorisation électrifiée de pointe et la motricité sécurisante des 4 roues motrices intelligentes AWD-i. Parfait pour circuler dans les embouteillages urbains comme pour les longs trajets autoroutiers.",
    specs: [
      { icon: 'users', label: 'Capacité', value: '5 Places' },
      { icon: 'gauge', label: 'Boîte', value: 'Automatique e-CVT séquentielle' },
      { icon: 'fuel', label: 'Motorisation', value: 'Hybride 2.5L 222 ch AWD' },
      { icon: 'wind', label: 'Climatisation', value: 'Automatique Bi-Zone' },
      { icon: 'music', label: 'Audio', value: 'Système JBL Premium 9 HP' },
      { icon: 'shield-check', label: 'Sécurité', value: 'Toyota Safety Sense 2.5' },
    ],
    features: [
      'Transmission intégrale électrique AWD-i intelligente',
      'Sellerie cuir SoftTex surpiquée avec réglages électriques',
      'Rétroviseur intérieur avec affichage caméra numérique',
      'Recharge smartphone par induction rapide',
      'Consommation mixte maîtrisée (4.8L / 100km)',
    ],
    imgs: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: '5',
    slug: 'hyundai-tucson',
    name: 'Hyundai Tucson N-Line Executive',
    brand: 'Hyundai',
    tag: 'Aérodynamisme & Cockpit Digital',
    category: 'suv',
    price: 60000,
    deposit: 250000,
    available: true,
    rating: 4.88,
    reviewsCount: 24,
    year: 2024,
    meta: 'Auto 8 • 5 Places • Toit Pano • Pack Sport',
    desc: "Cockpit tout numérique, sièges sport massants ventilés, insonorisation acoustique double vitrage.",
    longDesc: "Le Hyundai Tucson N-Line séduit d'emblée par son look sculptural et ses projecteurs paramétriques dissimulés dans la calandre. L'intérieur offre une ambiance résolument high-tech avec un double écran de 10.25 pouces sans casquette et un sélecteur de vitesses par touches Shift-by-Wire.",
    specs: [
      { icon: 'users', label: 'Capacité', value: '5 Places' },
      { icon: 'gauge', label: 'Boîte', value: 'Automatique 8 rapports' },
      { icon: 'fuel', label: 'Motorisation', value: 'Essence 1.6 T-GDi 180 ch' },
      { icon: 'sun', label: 'Toit', value: 'Panoramique vitré ouvrant' },
      { icon: 'wind', label: 'Climatisation', value: 'Tri-zone avec mode Multi-Air' },
      { icon: 'shield-check', label: 'Assistance', value: 'Avertisseur d\'angle mort actif' },
    ],
    features: [
      'Finition sportive N-Line exclusive avec surpiqûres rouges',
      'Cockpit d\'instrumentation numérique personnalisable 10.25 pouces',
      'Sièges avant ventilés et chauffants à mémoire',
      'Système d\'évitement de collision frontale avec détection piétons',
      'Suspension pilotée électroniquement ECS',
    ],
    imgs: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: '6',
    slug: 'kia-sportage',
    name: 'Kia Sportage GT-Line Series',
    brand: 'Kia',
    tag: 'Ligne Contemporaine & Écran Incurvé',
    category: 'suv',
    price: 60000,
    deposit: 250000,
    available: true,
    rating: 4.90,
    reviewsCount: 31,
    year: 2024,
    meta: 'Automatique • Climatisation Dual Zone • Feux Matrix',
    desc: "Format urbain agile, feux Matrix LED intelligents, recharge à induction, assistance parking 360°.",
    longDesc: "Le nouveau Kia Sportage GT-Line transcende les codes du SUV familial. Sa double dalle panoramique incurvée plonge le conducteur dans une expérience cockpit ultra-intuitive, pendant que son châssis équilibré absorbe avec aisance les irrégularités de la chaussée.",
    specs: [
      { icon: 'users', label: 'Capacité', value: '5 Places' },
      { icon: 'gauge', label: 'Boîte', value: 'Automatique DCT 7 rapports' },
      { icon: 'fuel', label: 'Motorisation', value: 'Essence Turbo 177 ch' },
      { icon: 'wind', label: 'Climatisation', value: 'Dual Zone avec purificateur' },
      { icon: 'eye', label: 'Éclairage', value: 'Feux Matrix LED intelligents' },
      { icon: 'shield-check', label: 'Stationnement', value: 'Caméra panoramique 360°' },
    ],
    features: [
      'Double écran panoramique incurvé 2x 12.3 pouces',
      'Système de son Surround Harman Kardon',
      'Sellerie mixte suédine et cuir vegan GT-Line',
      'Sélecteur de mode de conduite Terrain Mode (Neige, Boue, Sable)',
      'Éclairage d\'ambiance interactif',
    ],
    imgs: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: '7',
    slug: 'ford-raptor',
    name: 'Ford F-150 Raptor High Performance',
    brand: 'Ford',
    tag: 'Pick-up Suprême & Puissance Hors-Normes',
    category: 'pickup',
    price: 85000,
    deposit: 350000,
    available: false,
    rating: 4.97,
    reviewsCount: 19,
    year: 2024,
    meta: 'V6 Twin-Turbo 450 ch • 4x4 • Amortisseurs Fox Racing',
    desc: "Prouesse d'ingénierie tout-terrain. Idéal pour convois sécurisés, escortes et pistes difficiles.",
    longDesc: "Le Ford F-150 Raptor est le pick-up le plus redoutable jamais conçu pour les expéditions extrêmes. Équipé d'amortisseurs Fox Live Valve à contrôle électronique et du monstrueux moteur V6 EcoBoost 450 ch, il transforme chaque trajet en démonstration d'autorité absolue.",
    specs: [
      { icon: 'users', label: 'Capacité', value: '5 Places' },
      { icon: 'gauge', label: 'Boîte', value: 'Automatique 10 rapports SelectShift' },
      { icon: 'fuel', label: 'Motorisation', value: 'V6 3.5L Twin-Turbo 450 ch' },
      { icon: 'compass', label: 'Châssis', value: 'Amortisseurs Fox Racing Live Valve' },
      { icon: 'wind', label: 'Climatisation', value: 'Dual Zone grand débit' },
      { icon: 'shield-check', label: 'Protection', value: 'Plaque de blindage sous-châssis' },
    ],
    features: [
      'Pneus tout-terrain BFGoodrich All-Terrain 37 pouces',
      'Échappement sport actif à clapets variables (4 sonorités)',
      'Caméra 360° tout-terrain avec vue directe sur les roues avant',
      'Benne arrière protégée Spray-in Bedliner avec prise 230V',
      '7 modes de conduite personnalisables Terrain Management',
    ],
    imgs: [
      'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: '8',
    slug: 'mercedes-classe-s',
    name: 'Mercedes-Benz Classe S 500 Limousine',
    brand: 'Mercedes-Benz',
    tag: 'Limousine d\'État • Sommet du Luxe Mondial',
    category: 'berline',
    price: 150000,
    deposit: 500000,
    available: true,
    featured: true,
    rating: 5.0,
    reviewsCount: 17,
    year: 2024,
    meta: '4 Places Première Classe • V6 Turbo 435 ch • Chauffeur Inclus',
    desc: "Le summum du protocole international. Fauteuils arrière inclinables First-Class et silence cathédrale.",
    longDesc: "Dédiée aux chefs d'État, ambassadeurs et présidents de grands groupes, la Classe S Limousine redéfinit l'art du voyage. Dotée de la suspension AIRMATIC active prédictive et de fauteuils arrière inclinables avec fonction massage aux pierres chaudes, elle garantit discrétion et sérénité absolues.",
    specs: [
      { icon: 'users', label: 'Capacité', value: '4 Places Première Classe' },
      { icon: 'gauge', label: 'Boîte', value: 'Automatique 9G-TRONIC 4MATIC' },
      { icon: 'fuel', label: 'Motorisation', value: 'V6 3.0L Turbo 435 ch + EQ Boost' },
      { icon: 'sparkles', label: 'Suspension', value: 'AIRMATIC prédictive active' },
      { icon: 'wind', label: 'Confort', value: 'Sièges massants chauffants / climatisés' },
      { icon: 'shield-check', label: 'Service VIP', value: 'Chauffeur de maître accrédité inclus' },
    ],
    features: [
      'Fauteuils arrière Executive inclinables à 43.5° avec repose-jambes',
      'Écrans multimédia OLED individuels haute définition aux places arrière',
      'Système audio Burmester High-End 4D avec transducteurs intégrés aux sièges',
      'Stores pare-soleil électriques latéraux et arrière pour intimité totale',
      'Frigo bar intégré dans l\'accoudoir arrière central',
    ],
    imgs: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    ],
  },
]

export const BRANDS = ['JETOUR', 'TOYOTA', 'MERCEDES-BENZ', 'HYUNDAI', 'KIA VIP', 'FORD RAPTOR']

export const WHY_US = [
  {
    icon: 'zap',
    title: '3 Minutes Chrono',
    desc: "Réservation sans lourdeur administrative. Validation instantanée par signature numérique sécurisée.",
    note: 'Zéro formulaire papier',
  },
  {
    icon: 'shield-check',
    title: 'Assurance Tous Risques',
    desc: "Couverture multirisque intégrale avec prise en charge corporelle, vol, tiers et bris de glace.",
    note: 'Tranquillité absolue',
  },
  {
    icon: 'plane',
    title: 'Livraison sur le Tarmac',
    desc: "Prise en main à la descente des avions aux aéroports de Douala & Yaoundé, ou à votre hôtel / résidence.",
    note: 'Mise en main VIP',
  },
  {
    icon: 'headphones',
    title: 'Assistance Dédiée 24/7',
    desc: "Superviseur d'astreinte permanent et véhicule de remplacement prioritaire déployé sans délai.",
    note: 'Permanence H24',
  },
]

export const STEPS = [
  {
    n: '01',
    icon: 'search',
    title: 'Choisissez votre monture',
    desc: "Parcourez notre flotte certifiée et optez pour un chauffeur de protocole ou la conduite autonome sécurisée.",
    note: 'Flotte 100% propriétaire',
  },
  {
    n: '02',
    icon: 'file-check',
    title: 'Réservez & Signez',
    desc: "Transmission rapide et chiffrée de vos pièces. Contrat certifié dématérialisé conforme aux règles OHADA.",
    note: 'Validation immédiate',
  },
  {
    n: '03',
    icon: 'credit-card',
    title: 'Réglez en toute sécurité',
    desc: "Paiement multicanal transparent : Virement bancaire, Cartes Visa / Mastercard, Orange Money & MTN MoMo.",
    note: 'Facture nette FCFA avec TVA',
  },
  {
    n: '04',
    icon: 'key',
    title: 'Prenez la route serein',
    desc: "Remise solennelle du véhicule, état des lieux contradictoire sur tablette et départ sans la moindre attente.",
    note: 'Mise en main protocolaire',
  },
]

export const FAQS = [
  {
    q: "Quelles sont les conditions requises pour louer un véhicule ?",
    a: "Pour la conduite autonome, il suffit d'être âgé d'au moins 21 ans, d'être titulaire d'un permis de conduire valide depuis plus de 2 ans et de présenter une pièce d'identité (CNI ou Passeport). Si vous choisissez l'option avec chauffeur accrédité Yamodrive, aucun permis n'est exigé de votre part.",
  },
  {
    q: "Comment fonctionne la livraison aux aéroports de Douala et Yaoundé ?",
    a: "Un agent de conciergerie Yamodrive vous accueille directement dans le hall des arrivées avec une pancarte personnalisée à l'aéroport international de Douala (DLA) ou Yaoundé-Nsimalen (NSI). La mise en main s'effectue en moins de 5 minutes sur le parking VIP réservé.",
  },
  {
    q: "Comment est gérée la caution de garantie ?",
    a: "La caution est un dépôt de garantie obligatoire (entre 250 000 et 500 000 FCFA selon la gamme du véhicule). Elle peut être déposée par pré-autorisation bancaire, virement ou espèces. Elle est intégralement restituée dès le retour du véhicule après l'état des lieux contradictoire.",
  },
  {
    q: "Puis-je voyager entre Douala et Yaoundé avec le véhicule ?",
    a: "Absolument. Nos véhicules sont parfaitement autorisés et assurés pour circuler sur l'axe lourd Douala-Yaoundé ainsi que dans toutes les principales agglomérations du Cameroun.",
  },
  {
    q: "Quels sont les modes de paiement acceptés ?",
    a: "Nous acceptons les règlements par Cartes Bancaires (Visa, Mastercard), virements bancaires professionnels, ainsi que les paiements mobiles Orange Money et MTN Mobile Money.",
  },
]
