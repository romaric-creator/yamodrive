import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/ui/Icon'

const navLinks = [
  { label: 'Accueil',   href: '/' },
  { label: 'Catalogue', href: '/vehicules' },
  { label: 'À propos',  href: '/a-propos' },
  { label: 'Contact',   href: '/contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <>
      {/* ── DESKTOP HEADER ── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'pt-2 pb-2' : 'pt-4 pb-2'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="page-container">
          <div
            className={`h-16 px-5 rounded-full liquid-glass flex items-center justify-between gap-space-md transition-shadow duration-300 ${
              scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.10)]' : ''
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-full bg-zinc-950 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-sm">
                <Icon name="diamond" size={17} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-[16px] uppercase tracking-[0.24em] text-zinc-950 font-extrabold leading-none">
                  Yamodrive
                </span>
                <span className="font-label-status text-[9px] uppercase tracking-widest text-zinc-500 leading-none mt-1">
                  Prestige Cameroun
                </span>
              </div>
            </Link>

            {/* Nav pills desktop */}
            <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-black/[0.04] border border-black/[0.06]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={
                    isActive(link.href)
                      ? 'px-5 py-2 rounded-full font-body-sm text-[13px] font-bold text-white bg-zinc-950 shadow-sm transition-all'
                      : 'px-5 py-2 rounded-full font-body-sm text-[13px] text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.04] transition-all'
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2.5">
              <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full font-label-data text-xs text-zinc-700 bg-black/[0.03] border border-black/[0.06]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">Douala &bull; Yaoundé</span>
              </div>

              <Link
                to="/vehicules"
                className="liquid-btn-primary px-5 py-2 rounded-full font-headline-sm text-[13px] font-bold"
              >
                <Icon name="car" size={15} />
                <span>Réserver</span>
              </Link>

              {/* Burger mobile button */}
              <button
                className="md:hidden w-10 h-10 rounded-full bg-black/[0.05] border border-black/[0.08] flex items-center justify-center text-zinc-950 active:scale-95 transition-all"
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <Icon name="menu" size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-80 liquid-glass-panel flex flex-col justify-between p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-zinc-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center text-white">
                      <Icon name="diamond" size={15} />
                    </div>
                    <span className="font-headline-sm text-sm uppercase tracking-wider text-zinc-950 font-bold">
                      Yamodrive
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-9 h-9 rounded-full bg-black/[0.05] border border-black/[0.08] flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-colors"
                    aria-label="Fermer le menu"
                  >
                    <Icon name="close" size={18} />
                  </button>
                </div>

                <nav className="py-6 space-y-1.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={
                        isActive(link.href)
                          ? 'flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-950 text-white font-semibold text-sm shadow-sm'
                          : 'flex items-center justify-between px-4 py-3 rounded-xl text-zinc-700 hover:text-zinc-950 hover:bg-black/[0.04] text-sm transition-all'
                      }
                    >
                      <span>{link.label}</span>
                      <Icon name="chevron-right" size={16} className="opacity-50" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Drawer footer */}
              <div className="pt-6 border-t border-zinc-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-500 font-label-data">
                  <span>DISPONIBILITÉ H24</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    SERVICE ACTIF
                  </span>
                </div>
                <Link
                  to="/vehicules"
                  className="liquid-btn-primary w-full rounded-full py-3.5 text-sm font-bold"
                >
                  <Icon name="car" size={16} />
                  Explorer le catalogue
                </Link>
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '237600000000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-btn-glass w-full rounded-full py-3 text-xs font-semibold"
                >
                  <Icon name="whatsapp" size={16} className="text-[#25D366]" />
                  Assistance WhatsApp VIP
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
