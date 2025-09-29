import type React from "react"
import { Navigation } from "@/components/navigation"

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(title || description) && (
          <div className="mb-8">
            {title && <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">{title}</h1>}
            {description && <p className="text-muted-foreground text-lg text-pretty">{description}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  )
}