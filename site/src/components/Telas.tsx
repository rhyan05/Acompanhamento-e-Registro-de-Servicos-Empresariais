import { useState } from 'react'
import { X, ImageOff } from 'lucide-react'
import { screenshots } from '../data/content'
import { SectionHeading } from './SectionHeading'

function Shot({
  src,
  alt,
  className = '',
  onClick,
}: {
  src: string
  alt: string
  className?: string
  onClick: () => void
}) {
  const [erro, setErro] = useState(false)
  if (erro) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-surface-muted text-content-subtle ${className}`}>
        <ImageOff className="w-6 h-6" />
        <span className="text-xs">print indisponível</span>
      </div>
    )
  }
  return (
    <button type="button" onClick={onClick} className={`group relative block overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setErro(true)}
        className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 ring-1 ring-inset ring-border rounded-[inherit]" />
    </button>
  )
}

export function Telas() {
  const [ativo, setAtivo] = useState<number | null>(null)
  const destaque = screenshots.find(s => s.destaque) ?? screenshots[0]
  const outros = screenshots.filter(s => s !== destaque)

  return (
    <section id="telas" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Telas"
          titulo="Como o sistema funciona"
          descricao="Prints reais das principais telas. Clique em qualquer imagem para ampliar."
        />

        <figure className="mt-14">
          <Shot
            src={destaque.src}
            alt={destaque.titulo}
            onClick={() => setAtivo(screenshots.indexOf(destaque))}
            className="rounded-2xl border border-border shadow-card aspect-[16/9]"
          />
          <figcaption className="mt-3 text-center">
            <span className="font-semibold text-content text-sm">{destaque.titulo}</span>
            <span className="block text-sm text-content-muted">{destaque.descricao}</span>
          </figcaption>
        </figure>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {outros.map(s => (
            <figure key={s.src}>
              <Shot
                src={s.src}
                alt={s.titulo}
                onClick={() => setAtivo(screenshots.indexOf(s))}
                className="rounded-2xl border border-border shadow-soft aspect-[16/10]"
              />
              <figcaption className="mt-3">
                <span className="font-semibold text-content text-sm">{s.titulo}</span>
                <span className="block text-sm text-content-muted">{s.descricao}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {ativo !== null && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center animate-fade-in"
          onClick={() => setAtivo(null)}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-xl bg-surface/90 text-content hover:bg-surface transition"
            onClick={() => setAtivo(null)}
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
          <figure className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={screenshots[ativo].src}
              alt={screenshots[ativo].titulo}
              className="w-full rounded-2xl border border-border shadow-pop"
            />
            <figcaption className="mt-3 text-center text-sm text-white/90">
              <strong>{screenshots[ativo].titulo}</strong> — {screenshots[ativo].descricao}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
