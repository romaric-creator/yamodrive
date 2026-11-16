import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '@/components/ui/Icon'

const FALLBACK_CAR_IMG = '/images/vehicles/toyota-fortuner.jpg'

interface VehicleCardProps {
  id: string
  slug: string
  name: string
  tag: string
  price: number
  available: boolean
  img?: string
  imgs?: string[]
  meta?: string
  specs?: Array<{ icon: string; label: string; value: string }>
  rating?: number
  reviewsCount?: number
  compact?: boolean
}

export default function VehicleCard({
  slug,
  name,
  tag,
  price,
  available,
  img,
  imgs,
  meta,
  rating,
  reviewsCount,
  compact,
}: VehicleCardProps) {
  const displayImg = img || (imgs && imgs[0]) || FALLBACK_CAR_IMG
  const [imageSrc, setImageSrc] = useState(displayImg)

  if (compact) {
    return (
      <motion.div
        className="liquid-glass-card rounded-2xl p-5 flex flex-col justify-between group hover:border-black/20"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-label-status text-[10px] text-zinc-500 uppercase tracking-wider block">
              {tag}
            </span>
            <h3 className="font-headline-sm text-base text-zinc-950 font-bold mt-0.5 group-hover:text-zinc-700 transition-colors">
              {name}
            </h3>
            {meta && <p className="font-label-data text-[11px] text-zinc-500 mt-1">{meta}</p>}
          </div>
          {available ? (
            <span className="badge-available shrink-0 text-[10px]">Dispo</span>
          ) : (
            <span className="badge-reserved shrink-0 text-[10px]">Réservé</span>
          )}
        </div>

        <div className="py-4 flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={name}
            onError={() => setImageSrc(FALLBACK_CAR_IMG)}
            className="w-full h-28 object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-500 select-none"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
          <div>
            <span className="font-price-display text-base text-zinc-950 font-bold">
              {price.toLocaleString('fr-FR')} FCFA
            </span>
            <span className="font-label-status text-[10px] text-zinc-500 block">/ jour net</span>
          </div>

          {available ? (
            <Link
              to={`/vehicules/${slug}`}
              className="liquid-btn-primary px-4 py-1.5 rounded-full font-label-data text-xs font-semibold !min-h-[36px]"
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
    )
  }

  return (
    <motion.div
      className="liquid-glass-card rounded-2xl overflow-hidden flex flex-col group border border-black/[0.08] hover:border-black/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Image header area */}
      <div className="relative bg-gradient-to-b from-zinc-100 to-zinc-50 p-6 flex items-center justify-center min-h-[220px] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.04) 0%, transparent 70%)' }}
        />

        <img
          src={imageSrc}
          alt={name}
          onError={() => setImageSrc(FALLBACK_CAR_IMG)}
          className="w-full h-44 object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.16)] group-hover:scale-105 transition-transform duration-500 relative z-10 select-none"
        />

        {/* Top badges */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
          {rating ? (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] font-label-data text-xs font-bold text-zinc-900 shadow-sm">
              <Icon name="star" size={13} className="text-amber-500 fill-amber-500" />
              <span>{rating.toFixed(1)}</span>
              {reviewsCount && (
                <span className="text-[10px] text-zinc-400 font-normal">({reviewsCount})</span>
              )}
            </div>
          ) : (
            <span />
          )}

          {available ? (
            <span className="badge-available">Disponible</span>
          ) : (
            <span className="badge-reserved">Réservé</span>
          )}
        </div>
      </div>

      {/* Info body */}
      <div className="p-6 flex flex-col gap-3 flex-1 justify-between bg-white">
        <div>
          <span className="font-label-status text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
            {tag}
          </span>
          <h3 className="font-headline-sm text-xl text-zinc-950 font-bold group-hover:text-zinc-700 transition-colors">
            {name}
          </h3>
          {meta && (
            <p className="font-label-data text-xs text-zinc-600 mt-1.5 flex items-center gap-1.5">
              <span>{meta}</span>
            </p>
          )}
        </div>

        {/* Footer actions & pricing */}
        <div className="pt-4 mt-2 border-t border-zinc-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-price-display text-2xl text-zinc-950 font-extrabold tracking-tight">
                {price.toLocaleString('fr-FR')}
              </span>
              <span className="font-label-status text-xs text-zinc-500 font-semibold uppercase">FCFA</span>
            </div>
            <span className="font-label-status text-[10px] text-zinc-400 block uppercase tracking-wide">
              / jour net TTC
            </span>
          </div>

          {available ? (
            <Link
              to={`/vehicules/${slug}`}
              className="liquid-btn-primary px-5 py-2.5 rounded-full font-headline-sm text-xs font-bold uppercase tracking-wider !min-h-[42px]"
            >
              <span>Réserver</span>
              <Icon name="arrow-right" size={14} />
            </Link>
          ) : (
            <button
              disabled
              className="px-4 py-2.5 rounded-full bg-zinc-100 text-zinc-400 text-xs font-label-data cursor-not-allowed border border-zinc-200"
            >
              Indisponible
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
