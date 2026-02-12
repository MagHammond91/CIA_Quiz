"use client"

import { useState, useCallback } from "react"
import { SchoolHeader } from "@/components/school-header"
import { PasswordGate } from "@/components/dashboard/password-gate"
import { ResultsTable } from "@/components/dashboard/results-table"
import { Button } from "@/components/ui/button"
import { RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface QuizResult {
  id: string
  student_name: string
  student_id: string
  score: number
  total_questions: number
  tab_switches: number
  time_taken_seconds: number
  created_at: string
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [results, setResults] = useState<QuizResult[]>([])
  const [password, setPassword] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchResults = useCallback(
    async (pwd: string) => {
      try {
        const res = await fetch("/api/quiz/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: pwd }),
        })
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          console.error("Dashboard fetch failed:", errData)
          return false
        }
        const data = await res.json()
        setResults(data.results || [])
        return true
      } catch (err) {
        console.error("Dashboard fetch network error:", err)
        toast.error("Could not connect to the server.")
        return false
      }
    },
    []
  )

  async function handleAuthenticate(pwd: string) {
    const success = await fetchResults(pwd)
    if (success) {
      setIsAuthenticated(true)
      setPassword(pwd)
    }
    return success
  }

  async function handleRefresh() {
    setIsRefreshing(true)
    await fetchResults(password)
    toast.success("Results refreshed")
    setIsRefreshing(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SchoolHeader subtitle="Teacher Dashboard" />

      {!isAuthenticated ? (
        <PasswordGate onAuthenticate={handleAuthenticate} />
      ) : (
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 md:px-6">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Quiz Results
              </h2>
              <p className="text-sm text-muted-foreground">
                View all student submissions and security logs.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-border text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-1.5 border-border text-foreground"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>

          <ResultsTable results={results} />
        </main>
      )}
    </div>
  )
}
