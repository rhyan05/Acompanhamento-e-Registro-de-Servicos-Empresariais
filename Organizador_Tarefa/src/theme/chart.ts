import type { Tema } from '../hooks/useTheme'

export const PALETTE = ['#f59e0b', '#3b82f6', '#a855f7', '#22c55e', '#ef4444']
export const PALETTE_PRIORIDADE = ['#94a3b8', '#eab308', '#f97316', '#ef4444']

export function chartColors(tema: Tema) {
  const dark = tema === 'dark'
  const muted = dark ? '#93a1bd' : '#64748b'
  const border = dark ? '#26324a' : '#e2e8f0'
  const surface = dark ? '#121a2b' : '#ffffff'
  return {
    muted,
    border,
    surface,
    tick: { fill: muted, fontSize: 12 },
    axis: { stroke: border },
    tooltip: {
      contentStyle: {
        background: surface,
        border: `1px solid ${border}`,
        borderRadius: 12,
        fontSize: 12,
        color: dark ? '#e8edf7' : '#0f172a',
      },
      labelStyle: { color: muted },
      itemStyle: { color: dark ? '#e8edf7' : '#0f172a' },
    },
  }
}
