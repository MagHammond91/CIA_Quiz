"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy, AlertTriangle, Clock } from "lucide-react"

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

interface ResultsTableProps {
  results: QuizResult[]
}

export function ResultsTable({ results }: ResultsTableProps) {
  const totalStudents = results.length
  const avgScore =
    totalStudents > 0
      ? Math.round(
          results.reduce(
            (sum, r) => sum + (r.score / r.total_questions) * 100,
            0
          ) / totalStudents
        )
      : 0
  const flaggedStudents = results.filter((r) => r.tab_switches > 0).length

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">
                {totalStudents}
              </p>
              <p className="text-xs text-muted-foreground">
                Total Submissions
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
              <Trophy className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">
                {avgScore}
                {"%"}
              </p>
              <p className="text-xs text-muted-foreground">Average Score</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">
                {flaggedStudents}
              </p>
              <p className="text-xs text-muted-foreground">
                Flagged (Tab Switches)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base text-card-foreground">
            Student Results
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
              <Users className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No quiz submissions yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Student</TableHead>
                    <TableHead className="text-muted-foreground">ID</TableHead>
                    <TableHead className="text-center text-muted-foreground">Score</TableHead>
                    <TableHead className="text-center text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Time
                      </span>
                    </TableHead>
                    <TableHead className="text-center text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Tab Switches
                      </span>
                    </TableHead>
                    <TableHead className="text-muted-foreground">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => {
                    const pct = Math.round(
                      (result.score / result.total_questions) * 100
                    )
                    return (
                      <TableRow
                        key={result.id}
                        className="border-border"
                      >
                        <TableCell className="font-medium text-foreground">
                          {result.student_name}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {result.student_id}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={pct >= 50 ? "default" : "destructive"}
                            className={
                              pct >= 50
                                ? "bg-success/15 text-success hover:bg-success/20"
                                : ""
                            }
                          >
                            {result.score}
                            {"/"}
                            {result.total_questions}
                            {" ("}
                            {pct}
                            {"%)"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-mono text-xs text-muted-foreground">
                          {formatTime(result.time_taken_seconds)}
                        </TableCell>
                        <TableCell className="text-center">
                          {result.tab_switches > 0 ? (
                            <Badge
                              variant="destructive"
                              className="bg-destructive/15 text-destructive hover:bg-destructive/20"
                            >
                              {result.tab_switches}
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              0
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(result.created_at)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
