"use client"

import * as React from "react"
import styles from './card.module.css'

const Card = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`${styles.card} ${className}`}
    {...props}
  />
)

const CardHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.cardHeader} ${className}`} {...props} />
)

const CardTitle = ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`${styles.cardTitle} ${className}`} {...props} />
)

const CardContent = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.cardContent} ${className}`} {...props} />
)

const CardFooter = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.cardFooter} ${className}`} {...props} />
)

export {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
}
