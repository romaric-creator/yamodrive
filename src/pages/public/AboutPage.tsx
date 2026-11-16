import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'

const VALUES = [
  {
    icon: 'diamond',
    title: 'Excellence Mécanique',
    desc: 'Chaque véhicule de notre flotte est soumis à une inspection rigoureuse en 40 points avant chaque remise de clés.',
  },
  {
    icon: 'shield-check',
    title: 'Intégrité & Transparence',
    desc: 'Tarification claire et nette en Francs CFA. Pas de suppléments cachés, état des lieux contradictoire sur tablette.',
  },
  {
    icon: 'compass',
    title: 'Maîtrise du Réseau Routier',
    desc: 'Connaissance millimétrée des axes routiers camerounais, de l\'axe lourd Douala-Yaoundé jusqu\'aux pistes régionales.',
  },
  {
    icon: 'sparkles',
    title: 'Protocole & Discrétion',
    desc: 'Chauffeurs professionnels formés aux règles strictes de discrétion diplomatique, de courtoisie et de ponctualité.',
  },
]

const STATS = [
  { val: '2020',   label: 'Année de fondation', desc: 'Première compagnie de prestige à capitaux 100% camerounais' },
  { val: '40+',    label: 'Véhicules de standing', desc: 'SUV haut de gamme, berlines de luxe et 4x4 tout-terrain' },
  { val: '+1 200', label: 'Missions réussies', desc: 'Délégations diplomatiques, PDG, mariages et particuliers VIP' },
  { val: '4.95/5', label: 'Indice de satisfaction', desc: 'Ponctualité, propreté et rigueur opérationnelle' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: 'easeOut' as const },
})

export default function AboutPage() {
  return (
    <div className="bg-[#F8F8F8] min-h-screen">

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pb-28 overflow-hidden bg-zinc-950 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/vehicles/toyota-fortuner.jpg"
            alt="Yamodrive"
            className="w-full h-full object-cover object-center opacity-25 filter blur-xs scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/85 via-zinc-950/80 to-zinc-950" />
        </div>

        <div className="page-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] font-label-status text-[11px] uppercase tracking-[0.28em] text-zinc-300 mb-4">
              <Icon name="diamond" size={14} className="text-white" />
              <span>Notre Histoire &amp; Engagement</span>
            </div>

            <h1 className="font-headline-lg text-headline-md md:text-headline-lg text-white font-extrabold uppercase tracking-tight">
              À Propos de Yamodrive
            </h1>

            <p className="font-body-md text-zinc-300 max-w-2xl mx-auto mt-4 leading-relaxed">
              Fondée à Douala, Yamodrive est la compagnie de référence pour la mise à disposition de véhicules de grand luxe et de protocoles au Cameroun. Nous allions l'excellence automobile mondiale à la maîtrise intime du terrain camerounais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-white py-space-3xl border-b border-zinc-200">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <motion.div {...fadeUp()} className="lg:col-span-6">
              <span className="font-label-status text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold">
                Notre Raison d'Être
              </span>
              <h2 className="font-headline-lg text-2xl md:text-3xl text-zinc-950 font-extrabold uppercase tracking-tight mt-1">
                L'Art du Déplacement de Prestige au Cameroun
              </h2>

              <p className="font-body-md text-zinc-600 mt-4 leading-relaxed">
                Chaque déplacement d'affaires ou personnel de haut rang exige une sérénité sans faille. Qu'il s'agisse d'accueillir une délégation internationale à la descente de l'avion à Douala, de rallier une réunion ministérielle à Yaoundé, ou d'organiser un cortège de cérémonie d'apparat.
              </p>

              <p className="font-body-md text-zinc-600 mt-3 leading-relaxed">
                Notre flotte exclusive de SUV, berlines de maître et 4x4 robustes est 100% propriétaire, assurée tous risques auprès des compagnies de premier plan, et entretenue strictement aux normes constructeurs avec des pièces d'origine certifiées.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/vehicules"
                  className="liquid-btn-primary px-7 py-3 rounded-full font-headline-sm text-sm font-bold shadow-md"
                >
                  <span>Explorer nos véhicules</span>
                  <Icon name="arrow-right" size={15} />
                </Link>

                <Link
                  to="/contact"
                  className="liquid-btn-glass px-7 py-3 rounded-full font-headline-sm text-sm font-bold"
                >
                  <span>Nous contacter</span>
                </Link>
              </div>
            </motion.div>

            {/* Key Stats Cards */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-6 grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="liquid-glass-card rounded-2xl p-6 text-center border border-black/[0.08] shadow-sm flex flex-col justify-center"
                >
                  <span className="font-price-display text-3xl md:text-4xl text-zinc-950 font-extrabold block">
                    {s.val}
                  </span>
                  <span className="font-label-status text-xs text-zinc-900 font-bold uppercase tracking-wider block mt-1">
                    {s.label}
                  </span>
                  <p className="font-body-sm text-[11px] text-zinc-500 mt-1">
                    {s.desc}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Pillars / Values Section */}
      <section className="bg-[#F8F8F8] py-space-3xl">
        <div className="page-container">
          <div className="text-center mb-12">
            <span className="font-label-status text-xs uppercase tracking-[0.28em] text-zinc-500 font-bold">
              Nos Engagements Solennels
            </span>
            <h2 className="font-headline-lg text-headline-md text-zinc-950 font-extrabold uppercase tracking-tight mt-1">
              Les Quatre Piliers Yamodrive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp(i * 0.08)}
                className="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-black/[0.06] hover:-translate-y-1 hover:border-black/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center mb-5 shadow-md">
                  <Icon name={v.icon} size={22} />
                </div>
                <h3 className="font-headline-sm text-lg text-zinc-950 font-bold">{v.title}</h3>
                <p className="font-body-sm text-zinc-600 mt-2.5 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hubs Map Presence (Dark Section) */}
      <section className="bg-zinc-950 text-white py-space-3xl border-y border-white/[0.08]">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-status text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-bold">
              Implantation Stratégique
            </span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-white font-extrabold uppercase tracking-tight mt-1">
              Deux Hubs d'Envergure Nationale
            </h2>
            <p className="font-body-md text-zinc-400 mt-2">
              Une présence permanente sur les deux capitales névralgiques du Cameroun pour une réactivité optimale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-on-dark rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-status text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  Hub Économique &bull; Littoral
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h3 className="font-headline-sm text-2xl text-white font-bold">Douala (DLA)</h3>
              <p className="font-body-sm text-zinc-400 mt-2 leading-relaxed">
                Siège opérationnel, conciergerie aéroportuaire Douala International et flotte d'intervention rapide couvrant Akwa, Bonanjo et Bonapriso.
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-zinc-300 font-label-data">
                <Icon name="map-pin" size={15} className="text-zinc-400" />
                <span>Boulevard de la Liberté, Akwa &bull; Aéroport DLA</span>
              </div>
            </div>

            <div className="card-on-dark rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-status text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Hub Politique &bull; Centre
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h3 className="font-headline-sm text-2xl text-white font-bold">Yaoundé (NSI)</h3>
              <p className="font-body-sm text-zinc-400 mt-2 leading-relaxed">
                Service protocolaire pour ambassades, ministères et organisations internationales. Accueil direct à l'Aéroport International de Yaoundé-Nsimalen.
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-zinc-300 font-label-data">
                <Icon name="map-pin" size={15} className="text-zinc-400" />
                <span>Quartier Bastos &bull; Aéroport NSI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-white py-space-3xl">
        <div className="page-container text-center">
          <motion.div {...fadeUp()}>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-zinc-950 font-extrabold uppercase tracking-tight">
              Prêt à Voyager avec Yamodrive ?
            </h2>
            <p className="font-body-md text-zinc-600 max-w-md mx-auto mt-3 mb-8">
              Découvrez notre catalogue et réservez votre véhicule d'exception en toute discrétion.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/vehicules"
                className="liquid-btn-primary px-8 py-4 rounded-full font-headline-sm text-[15px] font-bold inline-flex items-center gap-2 shadow-lg"
              >
                <span>Consulter la flotte disponible</span>
                <Icon name="arrow-right" size={16} />
              </Link>
              <Link
                to="/contact"
                className="liquid-btn-glass px-8 py-4 rounded-full font-headline-sm text-[15px] font-bold"
              >
                <span>Prendre contact</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
