import { cloneElement, useId, type ReactElement } from 'react'

export function Field({
  label,
  children,
}: {
  label: string
  children: ReactElement<{ id?: string }>
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {cloneElement(children, { id })}
    </div>
  )
}
