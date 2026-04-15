"use client"

import * as React from "react"
import styles from './input.module.css'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`${styles.input} ${className}`}
      {...props}
    />
  )
)

Input.displayName = "Input"

export { Input }
