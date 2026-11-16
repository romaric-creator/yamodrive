export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CM', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' FCFA'
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diff = end.getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const normalized = phone.replace(/[^0-9]/g, '')
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
}

export function buildBookingWhatsAppMessage(params: {
  reference: string
  vehicleName: string
  startDate: string
  endDate: string
  fullName: string
  estimatedAmount?: number
}): string {
  const lines = [
    `Bonjour, je viens de soumettre une demande de location.`,
    ``,
    `Référence : ${params.reference}`,
    `Véhicule : ${params.vehicleName}`,
    `Période : du ${formatDate(params.startDate)} au ${formatDate(params.endDate)}`,
    `Nom : ${params.fullName}`,
  ]
  if (params.estimatedAmount) {
    lines.push(`Montant estimatif : ${formatCurrency(params.estimatedAmount)}`)
  }
  lines.push(``, `Merci de me confirmer les disponibilités et les modalités.`)
  return lines.join('\n')
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
