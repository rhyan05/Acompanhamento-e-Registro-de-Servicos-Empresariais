import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { tema, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={tema === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={tema === 'dark' ? 'Tema claro' : 'Tema escuro'}
      className={`btn-icon ${className}`}
    >
      {tema === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
