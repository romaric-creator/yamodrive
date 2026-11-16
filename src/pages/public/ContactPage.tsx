import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/ui/Icon'

interface ContactForm {
  name: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.message) return
    setSending(true)

    const wa = import.meta.env.VITE_WHATSAPP_NUMBER || '237600000000'
    const msg = encodeURIComponent(
      `📩 *MESSAGE DEPUIS LE SITE YAMODRIVE*\n\n` +
      `• *Nom :* ${form.name}\n` +
      `• *Téléphone :* ${form.phone}\n` +
      `• *Objet :* ${form.subject || 'Renseignement Général'}\n\n` +
      `*Message :*\n${form.message}`
    )

    setTimeout(() => {
      setSent(true)
      setSending(false)
      window.open(`https://wa.me/${wa}?text=${msg}`, '_blank')
    }, 800)
  }

  const contacts = [
    {
      icon: 'map-pin',
      label: 'Hub Douala (Siège)',
      value: 'Akwa & Bonanjo &bull; Aéroport DLA',
      sub: 'Livraison sur tarmac et hôtels 24/7',
    },
    {
      icon: 'building',
      label: 'Hub Yaoundé (Diplomatique)',
      value: 'Bastos &bull; Aéroport NSI',
      sub: 'Service délégations et ministères',
    },
    {
      icon: 'phone',
      label: 'Permanence Téléphonique',
      value: '+237 6 00 00 00 00',
      sub: 'Ligne directe supervision H24',
    },
    {
      icon: 'mail',
      label: 'Courrier Électronique',
      value: 'contact@yamodrive.cm',
      sub: 'Réponse protocolaire sous 2h',
    },
  ]

  return (
    <div className="bg-[#F8F8F8] min-h-screen">

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-zinc-950 text-white">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] pointer-events-none rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 65%)' }}
        />

        <div className="page-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] font-label-status text-[11px] uppercase tracking-[0.28em] text-zinc-300 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Conciergerie Disponible 24/7</span>
            </div>

            <h1 className="font-headline-lg text-headline-md md:text-headline-lg text-white font-extrabold uppercase tracking-tight">
              Contact &amp; Réservations VIP
            </h1>

            <p className="font-body-md text-zinc-300 max-w-lg mx-auto mt-3 leading-relaxed">
              Nos superviseurs d'astreinte sont à votre disposition à Douala et Yaoundé. Réponse personnalisée garantie sous 15 minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="page-container py-space-xl pb-space-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Direct Contacts & WhatsApp Banner */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Direct WhatsApp Callout Card */}
            <motion.a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '237600000000'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-card rounded-2xl p-7 flex items-center gap-5 group border border-emerald-500/30 hover:border-emerald-500 shadow-md transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-[#25D366]">
                <Icon name="whatsapp" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-base text-zinc-950 font-bold">
                    WhatsApp Concierge Direct
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="font-body-sm text-xs text-zinc-500 mt-1">
                  Échange direct avec un superviseur opérationnel en moins de 5 min.
                </p>
              </div>
              <Icon
                name="arrow-right"
                size={18}
                className="text-zinc-400 group-hover:text-zinc-950 transition-colors"
              />
            </motion.a>

            {/* Contact Details List */}
            <motion.div
              className="liquid-glass-card rounded-2xl p-7 border border-black/[0.08]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="font-headline-sm text-base uppercase tracking-wider text-zinc-950 font-bold mb-6">
                Nos Points d'Accompagnement
              </h2>

              <div className="space-y-6">
                {contacts.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-950">
                      <Icon name={c.icon} size={18} />
                    </div>
                    <div>
                      <p className="font-label-status text-[10px] text-zinc-400 uppercase tracking-wider">
                        {c.label}
                      </p>
                      <p
                        className="font-body-md text-zinc-950 font-bold mt-0.5"
                        dangerouslySetInnerHTML={{ __html: c.value }}
                      />
                      <p
                        className="font-label-data text-xs text-zinc-500 mt-0.5"
                        dangerouslySetInnerHTML={{ __html: c.sub }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Commitment badge */}
            <div className="p-5 rounded-2xl bg-zinc-950 text-white flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                <Icon name="shield-check" size={20} />
              </div>
              <div>
                <p className="font-headline-sm text-xs uppercase tracking-wider font-bold">
                  Protocole de Confidentialité
                </p>
                <p className="font-body-sm text-[11px] text-zinc-400 mt-0.5">
                  Toutes vos communications et itinéraires demeurent strictement confidentiels.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              className="liquid-glass-card rounded-2xl p-7 md:p-10 border border-black/[0.08] shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 flex flex-col items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500">
                      <Icon name="check-circle" size={44} />
                    </div>
                    <h3 className="font-headline-sm text-2xl text-zinc-950 font-bold mt-2">
                      Message Transmis !
                    </h3>
                    <p className="font-body-sm text-zinc-600 max-w-sm">
                      Vous avez été redirigé vers WhatsApp pour échanger en direct avec notre superviseur d'astreinte.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="liquid-btn-glass mt-4 px-6 py-2.5 rounded-full text-xs font-semibold"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <span className="font-label-status text-[11px] text-zinc-500 uppercase tracking-wider font-bold">
                        Formulaire Direct
                      </span>
                      <h2 className="font-headline-sm text-2xl text-zinc-950 font-extrabold mt-0.5">
                        Transmettez votre demande
                      </h2>
                      <p className="font-body-sm text-zinc-500 mt-1">
                        Renseignez vos coordonnées, notre équipe vous répond sans délai.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                      <div>
                        <label className="font-label-status text-[11px] uppercase tracking-wider text-zinc-500 block mb-1 font-bold">
                          Nom &amp; Titre *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="M. / Mme / Dr. Nom Prénom"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                    </div>

                    <div>
                      <label className="font-label-status text-[11px] uppercase tracking-wider text-zinc-500 block mb-1 font-bold">
                        Objet de votre demande *
                      </label>
                      <select
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="glass-input cursor-pointer bg-white"
                      >
                        <option value="">Sélectionnez une option</option>
                        <option value="Réservation de véhicule VIP">Réservation d'un véhicule VIP</option>
                        <option value="Accueil & Transfert Aéroport DLA / NSI">Accueil VIP à l'Aéroport (Douala / Yaoundé)</option>
                        <option value="Escorte, Convoi & Chauffeur d'État">Escorte officielle &amp; Chauffeur de protocole</option>
                        <option value="Tarif Entreprise / Contrat Cadre">Contrat Corporate / Entreprise / Ambassade</option>
                        <option value="Autre demande spécifique">Autre demande spécifique</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-label-status text-[11px] uppercase tracking-wider text-zinc-500 block mb-1 font-bold">
                        Détails de la mission *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Dates prévues, itinéraire envisagé, véhicule souhaité, contraintes particulières…"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="glass-input resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="liquid-btn-primary w-full rounded-full py-4 font-headline-sm text-[15px] font-bold mt-2 shadow-lg"
                    >
                      {sending ? (
                        <span>Envoi en cours...</span>
                      ) : (
                        <>
                          <Icon name="whatsapp" size={17} className="text-[#25D366]" />
                          <span>Envoyer et joindre sur WhatsApp</span>
                        </>
                      )}
                    </button>

                    <p className="font-label-status text-[10px] text-zinc-400 text-center uppercase tracking-wider">
                      Transmission sécurisée &bull; Permanence 24h/24 &bull; Pas de spam
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>

    </div>
  )
}
