import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { VEHICLES, BRANDS, WHY_US, STEPS, FAQS } from '@/data/vehicles'
import Icon from '@/components/ui/Icon'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: 'easeOut' as const },
})

export default function HomePage() {
  const featuredVehicles = VEHICLES.filter((v) => v.featured || v.available).slice(0, 3)
  const [heroIndex, setHeroIndex] = useState(0)
  const currentHeroVehicle = featuredVehicles[heroIndex] || featuredVehicles[0]

  // Category filter state for "Nos Modèles" section
  const [activeCategory, setActiveCategory] = useState<'all' | 'suv' | 'berline' | 'pickup'>('all')

  const filteredVehicles = VEHICLES.filter(
    (v) => activeCategory === 'all' || v.category === activeCategory
  )

  const mainFeatured = filteredVehicles[0] || VEHICLES[0]
  const sideVehicles = filteredVehicles.slice(1, 4)

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handlePrevSlide = () => {
    setHeroIndex((prev) => (prev === 0 ? featuredVehicles.length - 1 : prev - 1))
  }

  const handleNextSlide = () => {
    setHeroIndex((prev) => (prev === featuredVehicles.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="bg-[#F8F8F8] text-zinc-950 overflow-hidden">

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="relative w-full pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden min-h-[92vh] flex flex-col justify-between">
        {/* Ambient lighting glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] pointer-events-none rounded-full"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.045) 0%, transparent 65%)' }}
        />
        <div
          className="absolute top-1/4 -right-40 w-[600px] h-[600px] pointer-events-none rounded-full"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.03) 0%, transparent 70%)' }}
        />
        {/* Grid floor pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:32px_32px] opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#F8F8F8] to-transparent pointer-events-none" />

        <div className="page-container relative z-10 flex-1 flex flex-col justify-center">

          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full liquid-glass border border-black/[0.08] font-label-status text-[11px] tracking-widest uppercase text-zinc-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
              <span>Service Exécutif Privé &bull; Chauffeurs d'État Accrédités</span>
            </div>

            <div className="flex items-center gap-3 font-label-data text-xs text-zinc-500 tracking-wider">
              <span className="font-semibold text-zinc-800">DOUALA (DLA)</span>
              <span className="text-zinc-300">|</span>
              <span className="font-semibold text-zinc-800">YAOUNDÉ (NSI)</span>
              <span className="text-zinc-300">|</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                DISPONIBLE 24/7
              </span>
            </div>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">

            {/* Left Hero Content */}
            <motion.div
              className="lg:col-span-6 flex flex-col gap-space-md"
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <div>
                <span className="inline-flex items-center gap-2 font-label-data text-[12px] uppercase text-zinc-500 tracking-[0.28em] mb-3">
                  <Icon name="sparkles" size={13} className="text-zinc-700" />
                  Flotte Souveraine d'Exception
                </span>
                <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-zinc-950 tracking-tighter uppercase font-extrabold leading-[0.98]">
                  LOUEZ<br />
                  <span className="bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-500 bg-clip-text text-transparent">
                    L'EXCEPTION.
                  </span>
                </h1>
              </div>

              <p className="font-body-lg text-body-md md:text-body-lg text-zinc-600 font-light max-w-xl leading-relaxed">
                SUV de prestige et berlines d'apparat livrés sur le tarmac de Douala ou dans vos résidences à Yaoundé. Chauffeurs de maître accrédités ou conduite autonome sécurisée.
              </p>

              {/* Price Callout */}
              <div className="flex items-baseline gap-2 py-1">
                <span className="font-label-status text-xs uppercase tracking-widest text-zinc-500">À partir de</span>
                <span className="font-price-display text-2xl md:text-3xl text-zinc-950 font-extrabold tracking-tight">
                  {currentHeroVehicle.price.toLocaleString('fr-FR')} FCFA
                </span>
                <span className="font-label-data text-xs text-zinc-500 uppercase tracking-wider">/ jour net TTC</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={`/vehicules/${currentHeroVehicle.slug}`}
                  className="liquid-btn-primary px-8 py-4 rounded-full font-headline-sm text-[15px] font-bold tracking-wide shadow-lg"
                >
                  <span>Réserver ce modèle</span>
                  <Icon name="arrow-right" size={18} />
                </Link>

                <Link
                  to="/vehicules"
                  className="liquid-btn-glass px-7 py-4 rounded-full font-headline-sm text-[15px] font-semibold tracking-wide"
                >
                  <Icon name="car" size={18} />
                  <span>Explorer toute la flotte</span>
                </Link>
              </div>

              {/* Metrics */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-zinc-200 mt-2">
                {[
                  ['0 km', 'État Concours Certifié'],
                  ['3 min', 'Réservation Numérique'],
                  ['100%', 'Discrétion Diplomatique'],
                ].map(([val, label]) => (
                  <div key={label} className="flex flex-col border-l border-zinc-200 pl-4 first:border-l-0 first:pl-0">
                    <p className="font-price-display text-xl md:text-2xl text-zinc-950 font-extrabold tracking-tight">
                      {val}
                    </p>
                    <p className="font-label-status text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Hero Vehicle Presentation */}
            <motion.div
              className="lg:col-span-6 relative mt-8 lg:mt-0 flex items-center justify-center"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
            >
              <div
                className="absolute inset-0 pointer-events-none rounded-full blur-3xl opacity-40"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.08) 0%, transparent 70%)' }}
              />

              <div className="relative w-full aspect-[16/10] flex items-center justify-center group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentHeroVehicle.id}
                    src={currentHeroVehicle.imgs[0]}
                    alt={currentHeroVehicle.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] group-hover:scale-[1.03] transition-transform duration-700 select-none"
                  />
                </AnimatePresence>

                {/* Floating vehicle badge */}
                <div className="absolute bottom-2 left-2 md:left-6 px-4 py-3 rounded-2xl liquid-glass border border-black/[0.08] flex items-center gap-3 shadow-md">
                  <div className="w-10 h-10 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                    <Icon name="diamond" size={17} />
                  </div>
                  <div>
                    <p className="font-label-status text-[10px] uppercase tracking-widest text-zinc-500">
                      {currentHeroVehicle.tag}
                    </p>
                    <p className="font-headline-sm text-sm text-zinc-950 font-bold">
                      {currentHeroVehicle.name}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Interactive Carousel Footer */}
          <div className="pt-10 flex items-center justify-between border-t border-zinc-200">
            <div className="flex items-center gap-3 font-price-display text-sm tracking-wider">
              <span className="text-zinc-950 font-extrabold text-base">0{heroIndex + 1}</span>
              <span className="text-zinc-400">/</span>
              <span className="text-zinc-400 text-sm">0{featuredVehicles.length}</span>
              <span className="ml-2 font-body-sm text-xs text-zinc-500 hidden sm:inline uppercase">
                &bull; {currentHeroVehicle.name}
              </span>
            </div>

            {/* Slide dots */}
            <div className="flex items-center gap-2">
              {featuredVehicles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === heroIndex ? 'w-10 bg-zinc-950' : 'w-3 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                  aria-label={`Afficher le véhicule ${i + 1}`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevSlide}
                className="w-10 h-10 rounded-full liquid-btn-glass flex items-center justify-center hover:bg-black/[0.08] active:scale-95 transition-all"
                aria-label="Véhicule précédent"
              >
                <Icon name="arrow-left" size={16} />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-10 h-10 rounded-full liquid-btn-glass flex items-center justify-center hover:bg-black/[0.08] active:scale-95 transition-all"
                aria-label="Véhicule suivant"
              >
                <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── MARQUEE BRANDS SECTION ───────────────────────── */}
      <section className="w-full bg-zinc-100 py-6 border-y border-zinc-200 overflow-hidden">
        <p className="font-label-status text-[10px] uppercase tracking-[0.3em] text-zinc-500 text-center mb-3">
          Partenaires Constructeurs Accrédités &bull; Flotte Officielle 2025
        </p>
        <div className="relative flex overflow-x-hidden w-full items-center">
          <div className="marquee-track whitespace-nowrap flex items-center gap-16 font-headline-md text-base md:text-lg uppercase tracking-[0.25em] text-zinc-400 font-bold select-none">
            {[...BRANDS, ...BRANDS].flatMap((brand, i) => [
              ...(i > 0 ? [<span key={`sep-${i}`} className="text-zinc-300">&bull;</span>] : []),
              <span key={`brand-${i}`} className="hover:text-zinc-950 transition-colors cursor-default">
                {brand}
              </span>,
            ])}
          </div>
        </div>
      </section>

      {/* ── CATALOGUE / BENTO GRID SHOWCASE ─────────────── */}
      <section className="w-full bg-[#F8F8F8] py-space-3xl relative" id="catalogue">
        <div className="page-container flex flex-col gap-space-xl">

          {/* Section Header with interactive filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-zinc-200">
            <div>
              <span className="font-label-status text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold">
                Collection Exclusive
              </span>
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-zinc-950 tracking-tight mt-1 uppercase font-extrabold">
                Nos Modèles Phares
              </h2>
            </div>

            {/* Interactive filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {[
                { id: 'all', label: 'Tous les modèles' },
                { id: 'suv', label: 'SUV Premium' },
                { id: 'berline', label: 'Berlines VIP' },
                { id: 'pickup', label: 'Pick-up & Escorte' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`px-5 py-2 rounded-full font-label-data text-xs font-bold transition-all shrink-0 ${
                    activeCategory === tab.id
                      ? 'bg-zinc-950 text-white shadow-md'
                      : 'liquid-btn-glass text-zinc-700 hover:text-zinc-950'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">

            {/* Featured Left Large Card */}
            {mainFeatured && (
              <motion.div
                key={mainFeatured.id}
                {...fadeUp()}
                className="lg:col-span-7 liquid-glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group border border-black/[0.08]"
              >
                <div
                  className="absolute -top-24 -right-24 w-80 h-80 pointer-events-none rounded-full"
                  style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.03) 0%, transparent 70%)' }}
                />

                {/* Top info */}
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <span className="font-label-status text-[11px] text-zinc-500 uppercase tracking-widest block">
                      {mainFeatured.tag}
                    </span>
                    <h3 className="font-headline-md text-2xl md:text-3xl text-zinc-950 font-bold mt-1">
                      {mainFeatured.name}
                    </h3>
                    <p className="font-body-sm text-zinc-600 mt-1 max-w-md">
                      {mainFeatured.desc}
                    </p>
                  </div>
                  {mainFeatured.available ? (
                    <span className="badge-available shrink-0 ml-3">Disponible</span>
                  ) : (
                    <span className="badge-reserved shrink-0 ml-3">Réservé</span>
                  )}
                </div>

                {/* Vehicle image */}
                <div className="relative py-8 md:py-12 flex items-center justify-center z-10">
                  <img
                    src={mainFeatured.imgs[0]}
                    alt={mainFeatured.name}
                    className="w-full max-h-[300px] object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.18)] group-hover:scale-[1.03] transition-transform duration-500 select-none"
                  />
                </div>

                {/* Specs box + CTA */}
                <div className="relative z-10 flex flex-col gap-4 p-5 rounded-xl bg-black/[0.03] border border-zinc-200">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-label-data text-xs text-zinc-700 border-b border-zinc-200 pb-3">
                    {mainFeatured.specs.slice(0, 3).map((spec) => (
                      <div key={spec.label} className="flex items-center gap-2">
                        <Icon name={spec.icon} size={15} className="text-zinc-900" />
                        <span>{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-price-display text-2xl md:text-3xl text-zinc-950 font-extrabold">
                          {mainFeatured.price.toLocaleString('fr-FR')}
                        </span>
                        <span className="font-label-status text-xs text-zinc-500 uppercase">FCFA</span>
                      </div>
                      <span className="font-label-status text-[10px] text-zinc-400 block uppercase tracking-wider">
                        / jour net TTC &bull; Caution : {mainFeatured.deposit.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <Link
                      to={`/vehicules/${mainFeatured.slug}`}
                      className="liquid-btn-primary px-7 py-3 rounded-full font-headline-sm text-xs font-bold uppercase tracking-wider shadow-md"
                    >
                      <span>Réserver ce véhicule</span>
                      <Icon name="arrow-right" size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Compact Cards Column */}
            <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
              {sideVehicles.map((vehicle, i) => (
                <motion.div
                  key={vehicle.id}
                  {...fadeUp(i * 0.08)}
                  className="liquid-glass-card rounded-2xl p-5 flex flex-col justify-between group border border-black/[0.08] hover:border-black/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-status text-[10px] text-zinc-500 uppercase tracking-wider">
                        {vehicle.tag}
                      </span>
                      <h4 className="font-headline-sm text-lg text-zinc-950 font-bold mt-0.5 group-hover:text-zinc-700 transition-colors">
                        {vehicle.name}
                      </h4>
                    </div>
                    {vehicle.available ? (
                      <span className="badge-available text-[10px]">Disponible</span>
                    ) : (
                      <span className="badge-reserved text-[10px]">Réservé</span>
                    )}
                  </div>

                  <div className="grid grid-cols-12 gap-3 items-center my-3">
                    <div className="col-span-7">
                      <p className="font-body-sm text-xs text-zinc-600 line-clamp-2">{vehicle.desc}</p>
                      <p className="mt-2 font-label-data text-[11px] text-zinc-500 font-medium">
                        {vehicle.meta}
                      </p>
                    </div>
                    <div className="col-span-5 flex items-center justify-center">
                      <img
                        src={vehicle.imgs[0]}
                        alt={vehicle.name}
                        className="w-full h-20 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-300 select-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
                    <div>
                      <span className="font-price-display text-lg text-zinc-950 font-extrabold">
                        {vehicle.price.toLocaleString('fr-FR')} FCFA
                      </span>
                      <span className="font-label-status text-[10px] text-zinc-500"> / jour</span>
                    </div>

                    {vehicle.available ? (
                      <Link
                        to={`/vehicules/${vehicle.slug}`}
                        className="liquid-btn-primary px-5 py-1.5 rounded-full font-label-data text-xs font-semibold !min-h-[36px]"
                      >
                        Sélectionner
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-400 text-xs font-label-data cursor-not-allowed border border-zinc-200"
                      >
                        Indisponible
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Catalog link footer */}
          <div className="text-center pt-4">
            <Link
              to="/vehicules"
              className="liquid-btn-glass px-8 py-3.5 rounded-full font-headline-sm text-sm font-bold inline-flex items-center gap-2"
            >
              <span>Voir l'ensemble de la flotte ({VEHICLES.length} véhicules)</span>
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* ── POURQUOI NOUS CHOISIR ───────────────────────── */}
      <section className="w-full bg-white text-zinc-950 py-space-3xl relative overflow-hidden border-y border-zinc-200">
        <div className="page-container flex flex-col gap-space-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-label-status text-xs uppercase tracking-[0.28em] text-zinc-500 font-bold">
                Standard Palatial &bull; Discrétion Absolue
              </span>
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-zinc-950 tracking-tight uppercase font-extrabold mt-1">
                Pourquoi Choisir Yamodrive
              </h2>
              <p className="font-body-md text-zinc-600 mt-2">
                L'alliance du luxe automobile international et de l'expertise intime du terrain camerounais. Transparence tarifaire intégrale en Francs CFA.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 font-label-data text-xs tracking-wider uppercase text-zinc-700 bg-zinc-50">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Audit Flotte &amp; Sécurité 2025</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.08)}
                className="bg-white p-7 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-zinc-200 hover:border-zinc-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform mb-6">
                    <Icon name={item.icon} size={24} />
                  </div>
                  <h3 className="font-headline-sm text-lg text-zinc-950 font-bold">{item.title}</h3>
                  <p className="font-body-sm text-zinc-600 mt-2.5 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-6 border-t border-zinc-100 mt-6">
                  <span className="font-label-status text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
                    {item.note}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE (Section sombre d'apparat) ── */}
      <section className="w-full bg-zinc-950 text-white py-space-3xl relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 70%)' }}
        />

        <div className="page-container relative z-10 flex flex-col gap-space-2xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-label-status text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-bold">
              Protocole Opérationnel
            </span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-white uppercase font-extrabold tracking-tight mt-1">
              Comment Ça Marche
            </h2>
            <p className="font-body-md text-zinc-400 mt-2">
              Votre mise à disposition d'exception orchestrée avec précision en quatre étapes fluides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                {...fadeUp(i * 0.08)}
                className="card-on-dark rounded-2xl p-7 flex flex-col justify-between group relative"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-price-display text-4xl text-white/20 group-hover:text-white transition-colors font-extrabold">
                    {step.n}
                  </span>
                  <div className="w-11 h-11 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white">
                    <Icon name={step.icon} size={20} />
                  </div>
                </div>

                <div>
                  <h3 className="font-headline-sm text-base text-white font-bold">{step.title}</h3>
                  <p className="font-body-sm text-zinc-400 mt-2 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.10] font-label-data text-[11px] text-zinc-400 uppercase tracking-wider">
                  {step.note}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS & ACCRÉDITATIONS ─────────────── */}
      <section className="w-full bg-zinc-100 py-space-2xl border-y border-zinc-200">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            {[
              {
                val: '+1 200',
                title: 'Missions Exécutives & Privées',
                desc: 'Délégations internationales, ambassades, dirigeants de multinationales et familles exigeantes.',
              },
              {
                val: '40+',
                title: "Véhicules Haut de Gamme",
                desc: 'Flotte 100% propriétaire entretenue sous garantie constructeur avec pièces d\'origine.',
              },
              {
                val: '4.95 / 5',
                title: 'Taux de Recommandation',
                desc: 'Noté 4.95 sur 5 par nos clients pour la ponctualité, la propreté et la courtoisie de l\'équipe.',
              },
            ].map((stat, i) => (
              <motion.div key={stat.title} {...fadeUp(i * 0.1)} className="flex flex-col items-center p-4">
                <span className="font-price-display text-5xl md:text-6xl text-zinc-950 font-extrabold tracking-tighter">
                  {stat.val}
                </span>
                <span className="font-headline-sm text-base text-zinc-950 uppercase mt-2 font-bold tracking-wide">
                  {stat.title}
                </span>
                <p className="font-body-sm text-zinc-500 max-w-xs mt-1 leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOIRE AUX QUESTIONS (FAQ) ──────────────────── */}
      <section className="w-full bg-white py-space-3xl border-b border-zinc-200">
        <div className="page-container max-w-4xl">
          <div className="text-center mb-12">
            <span className="font-label-status text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold">
              Transparence &bull; Sérénité
            </span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-zinc-950 uppercase font-extrabold tracking-tight mt-1">
              Questions Fréquentes
            </h2>
            <p className="font-body-md text-zinc-600 mt-2">
              Tout ce que vous devez savoir pour votre location à Douala et Yaoundé.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-200 overflow-hidden transition-all duration-200 bg-[#FAFAFA]"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-headline-sm text-base md:text-lg text-zinc-950 font-bold gap-4 hover:bg-zinc-100/60 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <Icon
                      name={isOpen ? 'close' : 'chevron-right'}
                      size={18}
                      className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6 pt-1 font-body-sm text-zinc-600 leading-relaxed border-t border-zinc-100"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL PRESTIGE ──────────────────────────── */}
      <section className="w-full bg-zinc-950 text-white py-space-3xl relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 70%)' }}
        />

        <div className="page-container text-center relative z-10">
          <motion.div {...fadeUp()}>
            <span className="font-label-status text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
              Compagnie de Prestige &bull; Douala &amp; Yaoundé
            </span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-white uppercase font-extrabold tracking-tight mt-2 mb-4">
              VOTRE PROCHAIN<br />DÉPLACEMENT COMMENCE ICI.
            </h2>
            <p className="font-body-md text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Mise à disposition en moins de deux heures à Douala et Yaoundé. Véhicule préparé, inspecté et désinfecté avant chaque remise des clés.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/vehicules"
                className="liquid-btn-primary px-8 py-4 rounded-full font-headline-sm text-[15px] font-bold shadow-xl"
                style={{ background: 'linear-gradient(180deg,#FFFFFF 0%,#E4E4E7 100%)', color: '#050505' }}
              >
                <span>Réserver un véhicule</span>
                <Icon name="arrow-right" size={18} />
              </Link>

              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '237600000000'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-headline-sm text-[15px] border border-white/[0.25] text-white inline-flex items-center gap-2 hover:bg-white/[0.08] transition-all min-h-[48px] justify-center"
              >
                <Icon name="whatsapp" size={17} className="text-[#25D366]" />
                <span>Conciergerie WhatsApp 24/7</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
