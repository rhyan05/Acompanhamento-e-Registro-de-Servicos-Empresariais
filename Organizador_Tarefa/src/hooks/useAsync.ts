import { useCallback, useEffect, useRef, useState } from 'react'

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [nonce, setNonce] = useState(0)
  const fnRef = useRef(fn)
  const key = JSON.stringify(deps)

  useEffect(() => {
    let ativo = true
    fnRef.current = fn
    setLoading(true)
    setError('')
    fnRef
      .current()
      .then(res => {
        if (ativo) setData(res)
      })
      .catch(e => {
        if (ativo) setError(e instanceof Error ? e.message : 'Erro ao carregar')
      })
      .finally(() => {
        if (ativo) setLoading(false)
      })
    return () => {
      ativo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, nonce])

  const run = useCallback(() => setNonce(n => n + 1), [])

  return { data, setData, loading, error, run }
}
