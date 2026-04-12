/**
 * Utilitarios de formato de fecha y hora.
 * Usan la API nativa Intl — sin dependencias externas.
 * Locale: es-AR. Todas las funciones aceptan string, number o Date.
 */

type DateInput = string | number | Date

function toDate(value: DateInput): Date {
  return value instanceof Date ? value : new Date(value)
}

/** 08 abr. 2026 */
export function formatDate(value: DateInput): string {
  return toDate(value).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/** 08 abr. 2026, 14:30 */
export function formatDateTime(value: DateInput): string {
  return toDate(value).toLocaleString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** 14:30 */
export function formatTime(value: DateInput): string {
  return toDate(value).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Tiempo relativo: "hace 3 días", "en 2 horas", "hace un momento".
 * Usa Intl.RelativeTimeFormat para soporte nativo sin librerías.
 */
export function formatRelative(value: DateInput): string {
  const rtf = new Intl.RelativeTimeFormat('es-AR', { numeric: 'auto' })
  const diffMs = toDate(value).getTime() - Date.now()
  const diffSec = Math.round(diffMs / 1000)

  const thresholds: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'second'],
    [3600, 'minute'],
    [86400, 'hour'],
    [2592000, 'day'],
    [31536000, 'month'],
    [Infinity, 'year'],
  ]

  const divisors: Record<Intl.RelativeTimeFormatUnit, number> = {
    second: 1,
    seconds: 1,
    minute: 60,
    minutes: 60,
    hour: 3600,
    hours: 3600,
    day: 86400,
    days: 86400,
    week: 604800,
    weeks: 604800,
    month: 2592000,
    months: 2592000,
    quarter: 7776000,
    quarters: 7776000,
    year: 31536000,
    years: 31536000,
  }

  const abs = Math.abs(diffSec)
  const [, unit] = thresholds.find(([threshold]) => abs < threshold) ?? [Infinity, 'year']
  return rtf.format(Math.round(diffSec / divisors[unit]), unit)
}

/** Convierte un File a string base64 (data URL). */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Formatea un número como moneda paraguaya (Gs.).
 * Utiliza el locale es-PY. Sin decimales por defecto.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
