"use client"

import * as React from "react"

const Card = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-xl border border-green-500/30 bg-black/80 shadow-lg backdrop-blur-xl ${className}`}
    {...props}
  />
)

const CardHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`border-b border-green-500/20 px-6 py-4 ${className}`} {...props} />
)

const CardTitle = ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent ${className}`} {...props} />
)

const CardContent = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`px-6 py-4 ${className}`} {...props} />
)

const CardFooter = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`border-t border-green-500/20 px-6 py-4 ${className}`} {...props} />
)

export {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
}
