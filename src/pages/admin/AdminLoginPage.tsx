import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '@/components/ui/Icon'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: 'admin@yamodrive.cm', password: 'admin' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 600))
    if (form.email === 'admin@yamodrive.cm' && form.password === 'admin') {
      navigate('/admin')
    } else {
      setError('Identifiants incorrects. Veuillez utiliser admin@yamodrive.cm / admin.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none rounded-full opacity-15"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-zinc-950 shadow-lg group-hover:scale-105 transition-transform">
              <Icon name="diamond" size={20} />
            </div>
            <div className="text-left">
              <span className="font-headline-sm text-lg uppercase tracking-[0.24em] font-extrabold block text-white leading-none">
                Yamodrive
              </span>
              <span className="font-label-status text-[10px] uppercase tracking-widest text-zinc-400 block mt-1">
                Portail d'Administration
              </span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="card-on-dark rounded-2xl p-8 border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="mb-6">
            <h1 className="font-headline-sm text-2xl text-white font-bold">Connexion Superviseur</h1>
            <p className="font-body-sm text-zinc-400 mt-1">
              Accédez au tableau de bord, à la gestion de flotte et aux réservations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-label-data uppercase tracking-wider text-zinc-400 mb-1.5 font-bold" htmlFor="email">
                Identifiant &bull; Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.07] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition-all"
                placeholder="admin@yamodrive.cm"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-label-data uppercase tracking-wider text-zinc-400 mb-1.5 font-bold" htmlFor="password">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.07] border border-white/10 text-white placeholder-zinc-500 text-sm pr-11 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition-all"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  aria-label={showPwd ? 'Masquer' : 'Afficher'}
                >
                  <Icon name={showPwd ? 'eye' : 'eye'} size={18} />
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-body-sm flex items-center gap-2">
                <Icon name="warning" size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="liquid-btn-primary w-full rounded-xl py-3.5 text-sm font-bold mt-2 shadow-lg cursor-pointer"
              style={{ background: 'linear-gradient(180deg,#FFFFFF 0%,#E4E4E7 100%)', color: '#050505' }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                  <span>Vérification des accès...</span>
                </span>
              ) : (
                <span>Accéder au Tableau de Bord</span>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="font-label-status text-[11px] text-zinc-400 uppercase tracking-wider">
              Accès Démo : <code className="text-zinc-200">admin@yamodrive.cm</code> / <code className="text-zinc-200">admin</code>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
            <Icon name="arrow-left" size={13} />
            <span>Retour au site public Yamodrive</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
