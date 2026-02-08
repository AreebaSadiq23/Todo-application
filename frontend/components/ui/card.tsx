"use client"

import * as React from "react"

const Card = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    {...props}
  />
)

const CardHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`border-b px-6 py-4 ${className}`} {...props} />
)

const CardTitle = ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-lg font-semibold ${className}`} {...props} />
)

const CardContent = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`px-6 py-4 ${className}`} {...props} />
)

const CardFooter = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`border-t px-6 py-4 ${className}`} {...props} />
)

export {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
}
