"use client"

import { Clock } from "lucide-react"

interface QuizTimerProps {
  timeLeft: number
  totalTime: number
}

export function QuizTimer({ timeLeft, totalTime }: QuizTimerProps) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const percentage = (timeLeft / totalTime) * 100
  const isLow = timeLeft <= 60

  return (
    <div className="flex items-center gap-3">
      <Clock className={`h-5 w-5 ${isLow ? "text-destructive" : "text-primary-foreground/80"}`} />
      <div className="flex flex-col gap-1">
        <span
          className={`font-mono text-sm font-bold tabular-nums ${isLow ? "text-destructive" : "text-primary-foreground"}`}
        >
          {String(minutes).padStart(2, "0")}
          {":"}
          {String(seconds).padStart(2, "0")}
        </span>
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-primary-foreground/20">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${isLow ? "bg-destructive" : "bg-primary-foreground"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
