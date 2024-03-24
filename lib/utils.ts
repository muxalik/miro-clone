import { Camera, Color } from '@/types/canvas'
import { type ClassValue, clsx } from 'clsx'
import { PointerEvent } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777']

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(e: PointerEvent, camera: Camera) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  }
}

export function colorToCss(color: Color) {
  const toHex = (rgb: number) => {
    return rgb.toString(16).padStart(2, '0')
  }

  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`
}
