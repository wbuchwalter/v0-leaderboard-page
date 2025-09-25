import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Tacit Labs - ChemBench-Discovery",
  description: "Comprehensive evaluation of AI models on complex reasoning tasks",
  generator: "v0.app",
  icons: {
    icon: "https://tacitlabs.co/Tacit%20Logo.png",
    shortcut: "https://tacitlabs.co/Tacit%20Logo.png",
    apple: "https://tacitlabs.co/Tacit%20Logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
