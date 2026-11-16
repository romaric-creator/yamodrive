import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { VEHICLES, type Vehicle } from '@/data/vehicles'
import Icon from '@/components/ui/Icon'
import VehicleCard from '@/components/ui/VehicleCard'

const DRIVER_DAILY_FEE = 15000 // 15 000 FCFA / jour pour chauffeur de protocole

function calculateDays(start: string, end: string): number {
  if (!start || !end) return 1
  const s = new Date(start).getTime()
  const e = new Date(end).getTime()
  if (isNaN(s) || isNaN(e)) return 1
  const diff = e - s
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return Math.max(1, days)
}

export default function VehicleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const vehicle: Vehicle | undefined = useMemo(() => {
    return VEHICLES.find((v) => v.slug === slug)
  }, [slug])

  const [activeImg, setActiveImg] = useState(0)
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    withDriver: false,
    pickupLocation: 'Douala (Aéroport ou Agence Akwa)',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // 404 Vehicle Not Found
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center pt-28 pb-16 px-4">
        <div className="liquid-glass-card rounded-2xl p-10 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <Icon name="car" size={32} />
          </div>
          <h2 className="font-headline-sm text-2xl text-zinc-950 font-bold">Véhicule introuvable</h2>
          <p className="font-body-sm text-zinc-500 mt-2">
            Le modèle demandé n'existe pas ou n'est plus disponible dans notre flotte actuelle.
          </p>
          <Link
            to="/vehicules"
            className="liquid-btn-primary mt-6 px-6 py-3 rounded-full text-xs font-bold inline-flex items-center gap-2"
          >
            <Icon name="arrow-left" size={14} />
            <span>Retour au catalogue</span>
          </Link>
        </div>
      </div>
    )
  }

  const days = calculateDays(form.startDate, form.endDate)
  const rentalBaseTotal = days * vehicle.price
  const driverTotal = form.withDriver ? days * DRIVER_DAILY_FEE : 0
  const grandTotal = rentalBaseTotal + driverTotal

  // Similar vehicles for cross-selling
  const similarVehicles = VEHICLES.filter((v) => v.id !== vehicle.id && v.category === vehicle.category).slice(0, 3)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.fullName || !form.phone || !form.startDate || !form.endDate) return

    setSubmitting(true)
    const wa = import.meta.env.VITE_WHATSAPP_NUMBER || '237600000000'
    const msg = encodeURIComponent(
      `🚗 *NOUVELLE DEMANDE DE RÉSERVATION YAMODRIVE*\n\n` +
      `• *Véhicule :* ${vehicle.name}\n` +
      `• *Client :* ${form.fullName}\n` +
      `• *Téléphone :* ${form.phone}\n` +
      `• *Dates :* du ${form.startDate} au ${form.endDate} (${days} jour${days > 1 ? 's' : ''})\n` +
      `• *Lieu de prise en charge :* ${form.pickupLocation}\n` +
      `• *Chauffeur VIP :* ${form.withDriver ? 'OUI (+15 000 FCFA/j)' : 'NON (Conduite autonome)'}\n` +
      `• *Tarif estimé :* ${grandTotal.toLocaleString('fr-FR')} FCFA\n` +
      `• *Caution de garantie :* ${vehicle.deposit.toLocaleString('fr-FR')} FCFA\n` +
      (form.notes ? `• *Notes / Demandes :* ${form.notes}\n` : '') +
      `\nMerci de me confirmer la disponibilité et la réservation.`
    )

    try {
      if (import.meta.env.VITE_API_URL) {
        await fetch(`${import.meta.env.VITE_API_URL}/booking-requests`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vehicleId: vehicle.id,
            fullName: form.fullName,
            phone: form.phone,
            startDate: form.startDate,
            endDate: form.endDate,
            withDriver: form.withDriver,
            pickupLocation: form.pickupLocation,
            notes: form.notes,
            estimatedAmount: grandTotal,
          }),
        }).catch(() => {})
      }
    } finally {
      setSubmitted(true)
      setSubmitting(false)
      setTimeout(() => {
        window.open(`https://wa.me/${wa}?text=${msg}`, '_blank')
      }, 1200)
    }
  }

  return (
    <div className="bg-[#F8F8F8] min-h-screen pt-28">

      {/* Breadcrumb Navigation */}
      <div className="page-container py-4">
        <nav className="flex items-center gap-2 font-label-data text-xs text-zinc-500 uppercase tracking-wider overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-zinc-950 transition-colors">Accueil</Link>
          <Icon name="chevron-right" size={13} className="text-zinc-400" />
          <Link to="/vehicules" className="hover:text-zinc-950 transition-colors">Catalogue</Link>
          <Icon name="chevron-right" size={13} className="text-zinc-400" />
          <span className="text-zinc-950 font-bold truncate">{vehicle.name}</span>
        </nav>
      </div>

      <div className="page-container pb-space-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-2">

          {/* LEFT COLUMN: Gallery & Vehicle Specs */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Gallery Image Display */}
            <motion.div
              className="liquid-glass-card rounded-2xl overflow-hidden border border-black/[0.08]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative bg-gradient-to-b from-zinc-100 to-zinc-50 p-8 md:p-12 flex items-center justify-center min-h-[340px] overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.04) 0%, transparent 70%)' }}
                />

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={vehicle.imgs[activeImg] || vehicle.imgs[0]}
                    alt={vehicle.name}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-h-[360px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.18)] select-none"
                  />
                </AnimatePresence>

                {/* Top Badges */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] font-label-data text-xs font-bold text-zinc-900 shadow-sm">
                    <Icon name="star" size={13} className="text-amber-500 fill-amber-500" />
                    <span>{vehicle.rating.toFixed(2)}</span>
                    <span className="text-zinc-400 font-normal">({vehicle.reviewsCount} avis certifiés)</span>
                  </div>

                  {vehicle.available ? (
                    <span className="badge-available">Disponible</span>
                  ) : (
                    <span className="badge-reserved">Réservé</span>
                  )}
                </div>
              </div>

              {/* Thumbnails row */}
              {vehicle.imgs.length > 1 && (
                <div className="flex gap-3 p-4 bg-white border-t border-zinc-200 overflow-x-auto">
                  {vehicle.imgs.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-zinc-100 ${
                        i === activeImg
                          ? 'border-zinc-950 shadow-md ring-2 ring-black/10'
                          : 'border-zinc-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Vehicle Information & Long Description */}
            <motion.div
              className="liquid-glass-card rounded-2xl p-7 md:p-8 border border-black/[0.08]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-label-status text-[11px] text-zinc-500 uppercase tracking-widest font-bold">
                  {vehicle.tag}
                </span>
                <span className="font-label-data text-xs text-zinc-500">
                  Millésime {vehicle.year}
                </span>
              </div>

              <h1 className="font-headline-lg text-2xl md:text-3xl text-zinc-950 font-extrabold tracking-tight mt-1">
                {vehicle.name}
              </h1>

              <p className="font-body-md text-zinc-600 mt-4 leading-relaxed">
                {vehicle.longDesc || vehicle.desc}
              </p>

              {/* Specs Grid */}
              <div className="mt-8">
                <h3 className="font-headline-sm text-sm uppercase tracking-wider text-zinc-500 font-bold mb-4">
                  Caractéristiques Techniques
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {vehicle.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-950 shadow-2xs">
                        <Icon name={s.icon} size={18} />
                      </div>
                      <div>
                        <p className="font-label-status text-[10px] text-zinc-400 uppercase tracking-wider">
                          {s.label}
                        </p>
                        <p className="font-label-data text-xs text-zinc-950 font-bold mt-0.5">
                          {s.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Equipment & Services */}
              <div className="mt-8 pt-6 border-t border-zinc-200">
                <h3 className="font-headline-sm text-sm uppercase tracking-wider text-zinc-500 font-bold mb-4">
                  Équipements &amp; Privilèges Inclus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicle.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 font-body-sm text-xs text-zinc-700">
                      <Icon name="check-circle" size={16} className="text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2.5 font-body-sm text-xs text-zinc-700">
                    <Icon name="check-circle" size={16} className="text-emerald-500 shrink-0" />
                    <span>Assurance Tous Risques Multirisque OHADA</span>
                  </div>
                  <div className="flex items-center gap-2.5 font-body-sm text-xs text-zinc-700">
                    <Icon name="check-circle" size={16} className="text-emerald-500 shrink-0" />
                    <span>Nettoyage &amp; désinfection VIP avant remise</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Reservation Simulator & Booking Form */}
          <div className="lg:col-span-5">
            <motion.div
              className="sticky top-[96px]"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              {submitted ? (
                <div className="liquid-glass-card rounded-2xl p-10 text-center flex flex-col items-center gap-4 border border-emerald-300 shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <Icon name="check-circle" size={36} />
                  </div>
                  <h3 className="font-headline-sm text-2xl text-zinc-950 font-bold">
                    Demande transmise avec succès !
                  </h3>
                  <p className="font-body-sm text-zinc-600">
                    Votre pré-réservation pour le <strong>{vehicle.name}</strong> a été enregistrée. Ouverture automatique de WhatsApp pour finaliser avec le superviseur...
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="liquid-btn-glass mt-4 px-6 py-2.5 rounded-full text-xs font-semibold"
                  >
                    Modifier la demande
                  </button>
                </div>
              ) : (
                <div className="liquid-glass-card rounded-2xl p-7 md:p-8 border border-black/[0.08] shadow-lg">

                  {/* Pricing Overview */}
                  <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
                    <div>
                      <span className="font-label-status text-[11px] text-zinc-500 uppercase tracking-wider block">
                        Tarif Journalier
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-price-display text-3xl text-zinc-950 font-extrabold tracking-tight">
                          {vehicle.price.toLocaleString('fr-FR')}
                        </span>
                        <span className="font-label-status text-xs text-zinc-500 uppercase font-bold">
                          FCFA / jour
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-label-status text-[11px] text-zinc-500 uppercase tracking-wider block">
                        Caution (Garantie)
                      </span>
                      <p className="font-label-data text-sm text-zinc-950 font-bold mt-0.5">
                        {vehicle.deposit.toLocaleString('fr-FR')} FCFA
                      </p>
                      <span className="font-label-status text-[9px] text-zinc-400 block uppercase">
                        Remboursable
                      </span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                    <div>
                      <label className="font-label-status text-[11px] uppercase tracking-wider text-zinc-500 block mb-1 font-bold">
                        Nom complet &bull; Société *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Son Excellence, Dr. ou M. Jean Dupont"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="glass-input"
                      />
                    </div>

                    <div>
                      <label className="font-label-status text-[11px] uppercase tracking-wider text-zinc-500 block mb-1 font-bold">
                        Téléphone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+237 6 XX XX XX XX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="glass-input"
                      />
                    </div>

                    {/* Date Pickers */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-label-status text-[11px] uppercase tracking-wider text-zinc-500 block mb-1 font-bold">
                          Date Début *
                        </label>
                        <input
                          type="date"
                          required
                          value={form.startDate}
                          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                          className="glass-input"
                        />
                      </div>
                      <div>
                        <label className="font-label-status text-[11px] uppercase tracking-wider text-zinc-500 block mb-1 font-bold">
                          Date Fin *
                        </label>
                        <input
                          type="date"
                          required
                          value={form.endDate}
                          min={form.startDate}
                          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                          className="glass-input"
                        />
                      </div>
                    </div>

                    {/* Pickup Location */}
                    <div>
                      <label className="font-label-status text-[11px] uppercase tracking-wider text-zinc-500 block mb-1 font-bold">
                        Lieu de prise en charge *
                      </label>
                      <select
                        value={form.pickupLocation}
                        onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                        className="glass-input cursor-pointer"
                      >
                        <option value="Douala (Aéroport International DLA)">Douala — Aéroport International (DLA)</option>
                        <option value="Douala (Agence Akwa / Centre-ville)">Douala — Agence Akwa / Bonanjo</option>
                        <option value="Yaoundé (Aéroport International Nsimalen NSI)">Yaoundé — Aéroport Nsimalen (NSI)</option>
                        <option value="Yaoundé (Bastos / Centre Administratif)">Yaoundé — Bastos / Ministères</option>
                        <option value="Livraison Hôtel / Résidence Privée">Livraison sur mesure à votre hôtel / résidence</option>
                      </select>
                    </div>

                    {/* Chauffeur Option Toggle */}
                    <div
                      onClick={() => setForm({ ...form, withDriver: !form.withDriver })}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        form.withDriver
                          ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                          : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                          form.withDriver
                            ? 'bg-white border-white text-zinc-950'
                            : 'border-zinc-300 bg-white'
                        }`}
                      >
                        {form.withDriver && <Icon name="check" size={14} className="font-bold" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`font-label-data text-xs font-bold ${form.withDriver ? 'text-white' : 'text-zinc-950'}`}>
                            Avec Chauffeur Protocolaire Dédié
                          </p>
                          <span className={`font-label-status text-[11px] font-bold ${form.withDriver ? 'text-emerald-400' : 'text-zinc-600'}`}>
                            +15 000 FCFA/j
                          </span>
                        </div>
                        <p className={`font-body-sm text-[11px] mt-0.5 ${form.withDriver ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          Chauffeur en costume, accrédité protocole d'État, discrétion absolue
                        </p>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="font-label-status text-[11px] uppercase tracking-wider text-zinc-500 block mb-1">
                        Instructions particulières (optionnel)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Numéro de vol, heure d'atterrissage, itinéraire spécifique…"
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        className="glass-input resize-none"
                      />
                    </div>

                    {/* Cost Breakdown Summary Card */}
                    <div className="p-4 rounded-xl bg-black/[0.04] border border-zinc-200 space-y-2 mt-2">
                      <div className="flex justify-between text-xs text-zinc-600 font-label-data">
                        <span>Durée de location :</span>
                        <span className="font-bold text-zinc-950">{days} jour{days > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between text-xs text-zinc-600 font-label-data">
                        <span>Tarif véhicule ({days} x {vehicle.price.toLocaleString('fr-FR')} FCFA) :</span>
                        <span className="font-bold text-zinc-950">{rentalBaseTotal.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                      {form.withDriver && (
                        <div className="flex justify-between text-xs text-zinc-600 font-label-data">
                          <span>Option chauffeur ({days} x {DRIVER_DAILY_FEE.toLocaleString('fr-FR')} FCFA) :</span>
                          <span className="font-bold text-emerald-600">+{driverTotal.toLocaleString('fr-FR')} FCFA</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-zinc-200 flex justify-between items-baseline font-bold">
                        <span className="font-headline-sm text-sm text-zinc-950">Total Net Estimé :</span>
                        <span className="font-price-display text-2xl text-zinc-950">
                          {grandTotal.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="liquid-btn-primary w-full rounded-full py-4 font-headline-sm text-[15px] font-bold mt-2 shadow-lg"
                    >
                      {submitting ? (
                        <span>Transmission en cours...</span>
                      ) : (
                        <>
                          <Icon name="whatsapp" size={17} className="text-[#25D366]" />
                          <span>Confirmer via WhatsApp</span>
                        </>
                      )}
                    </button>

                    <p className="font-label-status text-[10px] text-zinc-500 text-center uppercase tracking-wider mt-1">
                      Assurance intégrale incluse &bull; Pas de débit immédiat
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>

        </div>

        {/* Similar Vehicles Cross-Sell Section */}
        {similarVehicles.length > 0 && (
          <div className="mt-20 pt-12 border-t border-zinc-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-label-status text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
                  Dans la même catégorie
                </span>
                <h3 className="font-headline-lg text-xl md:text-2xl text-zinc-950 font-extrabold uppercase mt-0.5">
                  Autres Véhicules Recommandés
                </h3>
              </div>
              <Link
                to="/vehicules"
                className="liquid-btn-glass px-5 py-2 rounded-full text-xs font-bold"
              >
                Tout voir
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarVehicles.map((v) => (
                <VehicleCard key={v.id} {...v} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
