"use client"

import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-lg border-2 border-green-500/30 bg-black/60 px-3.5 py-2.5 text-sm text-white shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-white/50 focus:outline-none focus:border-green-500/60 focus:ring-4 focus:ring-green-500/10 ${className}`}
      {...props}
    />
  )
)

Input.displayName = "Input"

export { Input }
