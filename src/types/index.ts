// Vehicle types
export type VehicleStatus = 'draft' | 'published' | 'archived'
export type VehicleAvailability = 'available' | 'maintenance' | 'unavailable'

export interface VehicleCategory {
  id: string
  name: string
  slug: string
}

export interface VehicleImage {
  id: string
  url: string
  altText: string
  sortOrder: number
  isPrimary: boolean
}

export interface Vehicle {
  id: string
  brand: string
  model: string
  slug: string
  category: VehicleCategory
  dailyRate: number
  seats?: number
  shortDescription?: string
  description?: string
  status: VehicleStatus
  images: VehicleImage[]
  createdAt: string
}

// Booking types
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED'

export interface BookingRequest {
  id: string
  publicReference: string
  vehicle: Pick<Vehicle, 'id' | 'brand' | 'model' | 'slug' | 'dailyRate' | 'images'>
  fullName: string
  phone: string
  startDate: string
  endDate: string
  estimatedAmount: number
  status: BookingStatus
  createdAt: string
}

export interface AvailabilityCheckResult {
  available: boolean
  requestedPeriod: { startDate: string; endDate: string }
  alternatives?: Array<{ startDate: string; endDate: string }>
  message?: string
}

// API response types
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

// Config
export const CONFIG = {
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '237600000000',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  currency: 'FCFA',
  currencyCode: 'XAF',
}
