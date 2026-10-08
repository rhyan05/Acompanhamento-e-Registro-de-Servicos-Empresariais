export function Spinner({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Carregando"
      className={`${className} border-4 border-primary border-t-transparent rounded-full animate-spin`}
    />
  )
}

export function FullPageSpinner() {
  return (
    <div className="flex justify-center py-20">
      <Spinner />
    </div>
  )
}
