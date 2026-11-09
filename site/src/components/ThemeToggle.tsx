import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { tema, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={tema === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={tema === 'dark' ? 'Tema claro' : 'Tema escuro'}
      className="p-2 rounded-xl border border-border text-content-muted hover:text-content hover:bg-surface-muted transition"
    >
      {tema === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
