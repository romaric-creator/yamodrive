import React from 'react'
import {
  Users,
  Gauge,
  Fuel,
  Wind,
  Sun,
  ShieldCheck,
  Compass,
  Sparkles,
  Music,
  Eye,
  Zap,
  Plane,
  Headphones,
  Search,
  FileCheck,
  CreditCard,
  Key,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  X,
  Menu,
  Car,
  Star,
  SlidersHorizontal,
  DollarSign,
  AlertTriangle,
  LogOut,
  HelpCircle,
  Award,
  Building,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react'

// Custom crisp SVG WhatsApp icon strictly dimensioned
export function WhatsAppIcon({
  size = 18,
  className = '',
  ...props
}: {
  size?: number | string
  className?: string
} & React.SVGProps<SVGSVGElement>) {
  const numSize = typeof size === 'string' ? parseInt(size, 10) || 18 : size
  return (
    <svg
      width={numSize}
      height={numSize}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`shrink-0 inline-block align-middle ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.952 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.422-1.495-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.175.201-.301.301-.501.101-.2.05-.376-.025-.526-.075-.151-.676-1.63-.927-2.232-.244-.587-.492-.507-.676-.516l-.577-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508s1.077 2.909 1.228 3.109c.15.2 2.119 3.236 5.134 4.54.717.31 1.277.495 1.713.633.72.229 1.375.197 1.893.119.578-.087 1.78-.727 2.03-1.429.25-.702.25-1.304.175-1.429-.075-.125-.276-.201-.577-.351z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 1.892.525 3.662 1.439 5.176L2 22l4.981-1.408A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.615 0-3.132-.457-4.423-1.25l-.317-.196-3.276.926.938-3.197-.215-.333A8.17 8.17 0 013.8 12c0-4.529 3.671-8.2 8.2-8.2 4.529 0 8.2 3.671 8.2 8.2 0 4.529-3.671 8.2-8.2 8.2z"
      />
    </svg>
  )
}

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  people: Users,
  gauge: Gauge,
  settings: Gauge,
  fuel: Fuel,
  local_gas_station: Fuel,
  wind: Wind,
  ac_unit: Wind,
  sun: Sun,
  panorama: Sun,
  'shield-check': ShieldCheck,
  verified: ShieldCheck,
  verified_user: ShieldCheck,
  compass: Compass,
  terrain: Compass,
  sparkles: Sparkles,
  diamond: Sparkles,
  music: Music,
  eye: Eye,
  camera_rear: Eye,
  zap: Zap,
  bolt: Zap,
  plane: Plane,
  local_shipping: Plane,
  headphones: Headphones,
  support_agent: Headphones,
  search: Search,
  tune: SlidersHorizontal,
  'file-check': FileCheck,
  signature: FileCheck,
  'credit-card': CreditCard,
  receipt_long: CreditCard,
  key: Key,
  calendar: Calendar,
  clock: Clock,
  'map-pin': MapPin,
  location_on: MapPin,
  map: MapPin,
  phone: Phone,
  call: Phone,
  mail: Mail,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'arrow-right': ArrowRight,
  arrow_forward: ArrowRight,
  'arrow-left': ArrowLeft,
  arrow_back: ArrowLeft,
  check: Check,
  'check-circle': CheckCircle,
  close: X,
  menu: Menu,
  car: Car,
  directions_car: Car,
  star: Star,
  sliders: SlidersHorizontal,
  dollar: DollarSign,
  warning: AlertTriangle,
  logout: LogOut,
  help: HelpCircle,
  award: Award,
  building: Building,
  'shield-alert': ShieldAlert,
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string
  size?: number | string
  className?: string
}

export default function Icon({ name, size = 18, className = '', ...props }: IconProps) {
  const numSize = typeof size === 'string' ? parseInt(size, 10) || 18 : size

  if (name.toLowerCase() === 'whatsapp') {
    return <WhatsAppIcon size={numSize} className={className} {...props} />
  }

  const LucideComp = ICON_MAP[name.toLowerCase()] || Car
  return <LucideComp size={numSize} className={className} {...props} />
}
