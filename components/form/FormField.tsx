import { ReactNode } from 'react'

type Props = {
  label: string
  name: string
  type?: string
  value: string | number
  onChange: (value: string) => void
  error?: string
  required?: boolean
  placeholder?: string
  children?: ReactNode
  hint?: string
  autoComplete?: string
  spellCheck?: boolean
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  onBlur?: () => void
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
  children,
  hint,
  autoComplete,
  spellCheck,
  inputMode,
  onBlur,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-navy-700">
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children ? (
        children
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete ?? 'off'}
          spellCheck={spellCheck}
          inputMode={inputMode}
          onBlur={onBlur}
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
          className={`input ${error ? 'input-error' : ''}`}
        />
      )}
      {hint && !error && <p id={`${name}-hint`} className="text-xs text-navy-400">{hint}</p>}
      {error && <p id={`${name}-error`} className="text-xs text-red-500 font-medium" role="alert">{error}</p>}
    </div>
  )
}
