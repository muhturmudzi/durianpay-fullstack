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