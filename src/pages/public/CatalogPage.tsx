import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { VEHICLES } from '@/data/vehicles'
import VehicleCard from '@/components/ui/VehicleCard'
import Icon from '@/components/ui/Icon'

const FILTERS = [
  { key: 'all',     label: 'Tous les modèles' },
  { key: 'suv',     label: 'SUV Premium' },
  { key: 'berline', label: 'Berlines VIP' },
  { key: 'pickup',  label: 'Pick-up & 4x4' },
]

const SORT_OPTIONS = [
  { key: 'featured',   label: 'Recommandés' },
  { key: 'price-asc',  label: 'Prix croissant' },
  { key: 'price-desc', label: 'Prix décroissant' },
  { key: 'rating',     label: 'Mieux notés' },
  { key: 'name',       label: 'Nom A–Z' },
]

export default function CatalogPage() {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('featured')
  const [availOnly, setAvailOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return VEHICLES
      .filter((v) => filter === 'all' || v.category === filter)
      .filter((v) => !availOnly || v.available)
      .filter((v) => {
        if (!searchQuery.trim()) return true
        const q = searchQuery.toLowerCase()
        return (
          v.name.toLowerCase().includes(q) ||
          v.brand.toLowerCase().includes(q) ||
          v.tag.toLowerCase().includes(q) ||
          v.meta.toLowerCase().includes(q) ||
          v.desc.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => {
        if (sort === 'price-asc')  return a.price - b.price
        if (sort === 'price-desc') return b.price - a.price
        if (sort === 'rating')     return (b.rating || 0) - (a.rating || 0)
        if (sort === 'name')       return a.name.localeCompare(b.name)
        // featured default
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      })
  }, [filter, sort, availOnly, searchQuery])

  const handleResetFilters = () => {
    setFilter('all')
    setSort('featured')
    setAvailOnly(false)
    setSearchQuery('')
  }

  return (
    <div className="bg-[#F8F8F8] min-h-screen">

      {/* Page Hero Header with rich background */}
      <section className="relative pt-32 pb-20 md:pb-24 overflow-hidden bg-zinc-950 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/vehicles/toyota-fortuner.jpg"
            alt="Yamodrive Flotte"
            className="w-full h-full object-cover object-center opacity-30 filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/80 to-zinc-950" />
        </div>

        <div className="page-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] font-label-status text-[11px] uppercase tracking-[0.28em] text-zinc-300 mb-4">
              <Icon name="sparkles" size={13} className="text-white" />
              <span>Flotte Souveraine d'Exception</span>
            </div>

            <h1 className="font-headline-lg text-headline-md md:text-headline-lg text-white font-extrabold uppercase tracking-tight">
              Catalogue des Véhicules
            </h1>

            <p className="font-body-md text-zinc-300 max-w-xl mx-auto mt-3 leading-relaxed">
              Sélection exclusive de SUV de grand luxe, berlines protocolaires et 4x4 robustes disponibles immédiatement à Douala et Yaoundé.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Controls & Filters Bar */}
      <section className="sticky top-[80px] z-30 bg-[#F8F8F8]/95 backdrop-blur-xl border-b border-zinc-200 py-3.5 shadow-sm">
        <div className="page-container flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Icon
              name="search"
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Rechercher par marque, modèle, SUV, 7 places…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input !py-2 !pl-10 !pr-8 text-xs font-label-data rounded-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                aria-label="Effacer la recherche"
              >
                <Icon name="close" size={14} />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full font-label-data text-xs font-bold shrink-0 transition-all ${
                  filter === f.key
                    ? 'bg-zinc-950 text-white shadow-md'
                    : 'liquid-btn-glass text-zinc-700 hover:text-zinc-950'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Availability Toggle & Sort Dropdown */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setAvailOnly((v) => !v)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-label-data transition-all shrink-0 ${
                availOnly
                  ? 'bg-zinc-950 text-white font-bold shadow-sm'
                  : 'liquid-btn-glass text-zinc-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${availOnly ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
              <span>Disponibles</span>
            </button>

            <div className="relative shrink-0">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="glass-input !py-2 !px-4 text-xs font-label-data cursor-pointer rounded-full pr-8 bg-white"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.key} value={o.key} className="bg-white">
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </section>

      {/* Grid of Vehicles */}
      <section className="page-container py-space-xl">

        {/* Counter and reset badge */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-200">
          <p className="font-label-data text-xs text-zinc-600 uppercase tracking-wider">
            <span className="font-bold text-zinc-950">{filtered.length}</span> véhicule{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}
          </p>

          {(filter !== 'all' || availOnly || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-zinc-500 hover:text-zinc-950 underline font-label-data"
            >
              Réinitialiser tous les filtres
            </button>
          )}
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="liquid-glass-card rounded-2xl text-center py-20 px-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <Icon name="search" size={28} />
            </div>
            <h3 className="font-headline-sm text-xl text-zinc-950 font-bold">Aucun véhicule correspondant</h3>
            <p className="font-body-sm text-zinc-500 mt-2">
              Modifiez vos critères de recherche ou réinitialisez les filtres pour voir d'autres véhicules.
            </p>
            <button
              onClick={handleResetFilters}
              className="liquid-btn-primary px-6 py-2.5 rounded-full text-xs font-bold mt-6 inline-flex"
            >
              Voir toute la flotte
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filtered.map((vehicle, i) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
              >
                <VehicleCard {...vehicle} />
              </motion.div>
            ))}
          </div>
        )}

      </section>

    </div>
  )
}
