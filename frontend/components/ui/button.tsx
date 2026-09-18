"use client"

import * as React from "react"
import styles from './button.module.css'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = 'primary', ...props }, ref) => {
    const variantClass = styles[variant] || styles.primary;
    return (
      <button
        ref={ref}
        className={`${styles.button} ${variantClass} ${className}`}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
