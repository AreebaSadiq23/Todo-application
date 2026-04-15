"use client"

import * as React from "react"
import styles from './button.module.css'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={`${styles.button} ${className}`}
      {...props}
    />
  )
)

Button.displayName = "Button"

export { Button }
