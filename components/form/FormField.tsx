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
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
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
          className={`w-full px-3 py-2.5 rounded-lg border text-sm transition-colors
            ${error ? 'border-red-400 focus:ring-red-300' : 'border-slate-300 focus:border-blue-400 focus:ring-blue-100'}
            focus:outline-none focus:ring-2 bg-white`}
        />
      )}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
