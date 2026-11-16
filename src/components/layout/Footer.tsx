import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'

const links = [
  { label: 'Accueil',   href: '/' },
  { label: 'Catalogue des Véhicules', href: '/vehicules' },
  { label: 'À propos de Yamodrive',  href: '/a-propos' },
  { label: 'Contact & Agences',   href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-white/[0.08] relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none rounded-full opacity-15"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 70%)' }}
      />

      <div className="page-container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand & Mission */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-950 shadow-md">
                <Icon name="diamond" size={20} />
              </div>
              <div>
                <p className="font-headline-sm text-[18px] uppercase tracking-[0.24em] text-white font-extrabold leading-none">
                  Yamodrive
                </p>
                <p className="font-label-status text-[10px] uppercase tracking-widest text-zinc-400 mt-1">
                  Compagnie de Prestige &bull; Cameroun
                </p>
              </div>
            </div>

            <p className="font-body-sm text-zinc-400 leading-relaxed max-w-sm">
              Première compagnie de mise à disposition de SUV de grand standing et berlines d'apparat au Cameroun. Présente aux aéroports de Douala (DLA) et Yaoundé-Nsimalen (NSI).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] font-label-data text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Service actif 24h/24 &bull; 7j/7</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] font-label-status text-[11px] text-zinc-400 uppercase tracking-wider">
                <Icon name="shield-check" size={14} className="text-emerald-400" />
                <span>Flotte Certifiée 2025</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="font-label-status text-xs uppercase tracking-[0.22em] text-zinc-400 font-bold mb-5">
              Navigation
            </p>
            <ul className="space-y-3 font-body-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <Icon name="chevron-right" size={13} className="text-zinc-600 group-hover:text-white transition-colors" />
                    <span>{l.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin/login"
                  className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs flex items-center gap-2 pt-2 border-t border-white/[0.08]"
                >
                  <Icon name="key" size={12} />
                  <span>Portail Administrateur</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubs & Contact */}
          <div className="md:col-span-4">
            <p className="font-label-status text-xs uppercase tracking-[0.22em] text-zinc-400 font-bold mb-5">
              Bureaux &amp; Conciergerie
            </p>
            <ul className="space-y-3.5 font-body-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <Icon name="map-pin" size={18} className="text-zinc-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-white font-medium block">Douala (Siège &amp; Hub Aéroport)</span>
                  <span className="text-xs text-zinc-400">Akwa &bull; Bonanjo &bull; Aéroport DLA</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="map-pin" size={18} className="text-zinc-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-white font-medium block">Yaoundé (Hub Diplomatique)</span>
                  <span className="text-xs text-zinc-400">Bastos &bull; Aéroport NSI</span>
                </div>
              </li>
              <li className="flex items-center gap-3 pt-1">
                <Icon name="phone" size={18} className="text-zinc-400 shrink-0" />
                <a href="tel:+237600000000" className="text-white hover:underline font-mono text-sm">
                  +237 6 00 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="whatsapp" size={16} className="text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '237600000000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline font-medium text-sm"
                >
                  WhatsApp Concierge H24
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-label-data text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} Yamodrive Prestige Cameroun. Tous droits r&eacute;serv&eacute;s. Tarifs en Francs CFA (XAF).
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">
              Conditions de location
            </Link>
            <span className="text-white/20">&bull;</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Confidentialit&eacute; VIP
            </Link>
            <span className="text-white/20">&bull;</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Mentions l&eacute;gales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
