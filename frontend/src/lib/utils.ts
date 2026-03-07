import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValue = (key: string, obj: any) => {
  return key.split('.').reduce(function (o, key) {
		return o[key]
	}, obj)
}

export const toCurrencyFormat = (value: number, locale: string = 'id-ID', currency: string = 'IDR'): string => {
  if (isNaN(value)) {
    throw new Error('Value must be a valid number')
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(value)
}

export function formatDate(v: string, lang: string = 'en', dateStyle: 'short' | 'medium' | 'long' | 'full' = 'long') {
  if (!v) return

  return new Intl.DateTimeFormat(lang, {
    dateStyle
  }).format(new Date(v))
}