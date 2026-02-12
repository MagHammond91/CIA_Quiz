"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Trophy, Clock, AlertTriangle } from "lucide-react"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  tabSwitches: number
  timeTaken: number
  studentName: string
  onGoHome: () => void
}

export function QuizResults({
  score,
  totalQuestions,
  tabSwitches,
  timeTaken,
  studentName,
  onGoHome,
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const minutes = Math.floor(timeTaken / 60)
  const seconds = timeTaken % 60
  const passed = percentage >= 50

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border bg-card shadow-lg">
        <CardHeader className="text-center">
          <div
            className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full ${passed ? "bg-success/10" : "bg-destructive/10"}`}
          >
            {passed ? (
              <Trophy className="h-8 w-8 text-success" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
          </div>
          <CardTitle className="text-balance text-xl text-card-foreground">
            {passed ? "Well Done!" : "Quiz Complete"}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {"Thank you, "}
            {studentName}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-primary bg-primary/5">
              <span className="text-3xl font-bold text-primary">
                {percentage}
                {"%"}
              </span>
              <span className="text-xs text-muted-foreground">
                {score}
                {"/"}
                {totalQuestions}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-lg bg-muted p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Correct Answers</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {score}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <XCircle className="h-4 w-4 text-destructive" />
                <span>Wrong Answers</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {totalQuestions - score}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>Time Taken</span>
              </div>
              <span className="font-mono text-sm font-semibold text-foreground">
                {String(minutes).padStart(2, "0")}
                {":"}
                {String(seconds).padStart(2, "0")}
              </span>
            </div>
            {tabSwitches > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Tab Switches</span>
                </div>
                <span className="text-sm font-semibold text-destructive">
                  {tabSwitches}
                </span>
              </div>
            )}
          </div>

          <Button
            onClick={onGoHome}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
