import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { VEHICLES } from '@/data/vehicles'
import Icon from '@/components/ui/Icon'

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const availableVehiclesCount = VEHICLES.filter((v) => v.available).length
  const unavailableVehiclesCount = VEHICLES.filter((v) => !v.available).length

  const kpis = [
    {
      icon: 'clock',
      label: 'Demandes en attente',
      value: '3',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      change: '+2 aujourd\'hui',
    },
    {
      icon: 'file-check',
      label: 'Réservations confirmées',
      value: '18',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      change: 'Ce mois-ci',
    },
    {
      icon: 'car',
      label: 'Flotte Publiée',
      value: `${VEHICLES.length}`,
      color: 'text-zinc-950',
      bg: 'bg-zinc-950/10',
      change: `${availableVehiclesCount} disponibles`,
    },
    {
      icon: 'warning',
      label: 'En maintenance / Convoi',
      value: `${unavailableVehiclesCount}`,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      change: 'Ford Raptor F-150',
    },
  ]

  const adminNav = [
    { label: 'Tableau de bord', href: '/admin', icon: 'gauge' },
    { label: 'Véhicules & Flotte', href: '/vehicules', icon: 'car' },
    { label: 'Demandes de location', href: '/admin/reservations', icon: 'file-check' },
    { label: 'Disponibilités', href: '/admin/disponibilites', icon: 'calendar' },
  ]

  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row text-zinc-950">

      {/* Sidebar Desktop */}
      <aside className="w-64 bg-white border-r border-border hidden md:flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 bg-zinc-950 rounded-full flex items-center justify-center text-white shadow-sm">
              <Icon name="diamond" size={17} />
            </div>
            <div>
              <span className="font-headline-sm text-sm uppercase tracking-[0.2em] font-extrabold block text-zinc-950">
                Yamodrive
              </span>
              <span className="font-label-status text-[9px] uppercase tracking-widest text-zinc-400 block">
                Administration Flotte
              </span>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            {adminNav.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-label-data font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
              >
                <Icon name={link.icon} size={16} className="text-zinc-500" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => navigate('/admin/login')}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-xs font-label-data font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            <Icon name="logout" size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto flex flex-col">

        {/* Top Header */}
        <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900"
              aria-label="Menu"
            >
              <Icon name="menu" size={18} />
            </button>
            <h1 className="font-headline-sm text-lg text-zinc-950 font-bold">
              Tableau de bord Superviseur
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="liquid-btn-glass px-4 py-1.5 rounded-full text-xs font-semibold !min-h-[36px]"
            >
              <span>Voir le site public</span>
              <Icon name="arrow-right" size={13} />
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 md:p-8 space-y-8 flex-1">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="card p-5 border border-black/[0.08] shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 ${kpi.bg} rounded-xl flex items-center justify-center`}>
                    <Icon name={kpi.icon} size={20} className={kpi.color} />
                  </div>
                  <span className="font-label-status text-[10px] text-zinc-400 uppercase tracking-wider">
                    {kpi.change}
                  </span>
                </div>

                <div className="mt-4">
                  <div className={`font-price-display font-extrabold text-3xl ${kpi.color}`}>
                    {kpi.value}
                  </div>
                  <div className="text-zinc-600 text-xs font-label-data mt-1 font-medium">
                    {kpi.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="card p-6 border border-black/[0.08] shadow-sm">
            <h2 className="font-headline-sm text-base text-zinc-950 font-bold mb-4">
              Actions Opérationnelles Rapides
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/vehicules"
                className="liquid-btn-primary px-5 py-2.5 rounded-full text-xs font-bold !min-h-[40px]"
              >
                <Icon name="car" size={15} />
                <span>Consulter la flotte ({VEHICLES.length} véhicules)</span>
              </Link>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '237600000000'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-btn-glass px-5 py-2.5 rounded-full text-xs font-bold !min-h-[40px] text-[#25D366]"
              >
                <Icon name="whatsapp" size={16} />
                <span>Ouvrir WhatsApp Business</span>
              </a>
              <Link
                to="/contact"
                className="liquid-btn-glass px-5 py-2.5 rounded-full text-xs font-bold !min-h-[40px]"
              >
                <Icon name="mail" size={15} />
                <span>Messages &amp; Demandes</span>
              </Link>
            </div>
          </div>

          {/* Real-time Fleet Status Table */}
          <div className="card border border-black/[0.08] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-base text-zinc-950 font-bold">
                  Statut de la Flotte Yamodrive
                </h3>
                <p className="font-body-sm text-xs text-zinc-500 mt-0.5">
                  État de mise à disposition en temps réel (Douala &amp; Yaoundé).
                </p>
              </div>
              <span className="badge-available">Flotte Active</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-xs">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase font-label-data text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-6">Véhicule</th>
                    <th className="py-3 px-4">Catégorie</th>
                    <th className="py-3 px-4">Tarif / jour</th>
                    <th className="py-3 px-4">Caution</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {VEHICLES.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={vehicle.imgs[0]}
                            alt=""
                            className="w-12 h-8 object-contain rounded bg-zinc-100 p-0.5"
                          />
                          <div>
                            <span className="font-bold text-zinc-950 block">{vehicle.name}</span>
                            <span className="text-[10px] text-zinc-500">{vehicle.tag}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-label-data uppercase text-zinc-600">
                        {vehicle.category}
                      </td>
                      <td className="py-3.5 px-4 font-price-display font-bold text-zinc-950">
                        {vehicle.price.toLocaleString('fr-FR')} FCFA
                      </td>
                      <td className="py-3.5 px-4 font-label-data text-zinc-600">
                        {vehicle.deposit.toLocaleString('fr-FR')} FCFA
                      </td>
                      <td className="py-3.5 px-4">
                        {vehicle.available ? (
                          <span className="badge-available text-[9px]">Disponible</span>
                        ) : (
                          <span className="badge-reserved text-[9px]">Réservé</span>
                        )}
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <Link
                          to={`/vehicules/${vehicle.slug}`}
                          className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 underline"
                          target="_blank"
                        >
                          Voir la fiche
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

    </div>
  )
}
