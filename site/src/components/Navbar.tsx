import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav, repo } from '../data/content'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { GithubIcon } from './icons'

export function Navbar() {
  const [aberto, setAberto] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled ? 'border-b border-border bg-surface/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-content-muted hover:text-content hover:bg-surface-muted transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={repo} target="_blank" rel="noreferrer" className="hidden sm:inline-flex btn btn-secondary !px-3.5">
            <GithubIcon className="w-4 h-4" />
            GitHub
          </a>
          <ThemeToggle />
          <button
            className="lg:hidden p-2 rounded-xl border border-border text-content-muted hover:text-content hover:bg-surface-muted transition"
            onClick={() => setAberto(v => !v)}
            aria-label="Abrir menu"
          >
            {aberto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {aberto && (
        <div className="lg:hidden border-t border-border bg-surface">
          <nav className="container-x py-3 flex flex-col">
            {nav.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-content-muted hover:text-content hover:bg-surface-muted transition"
              >
                {item.label}
              </a>
            ))}
            <a href={repo} target="_blank" rel="noreferrer" className="btn btn-secondary mt-2">
              <GithubIcon className="w-4 h-4" /> Ver no GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
