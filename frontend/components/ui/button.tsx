"use client"

import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={`rounded-lg bg-gradient-to-r from-green-500 to-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${className}`}
      {...props}
    />
  )
)

Button.displayName = "Button"

export { Button }
