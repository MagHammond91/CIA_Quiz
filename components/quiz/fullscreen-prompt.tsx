"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Maximize, ShieldCheck, Eye, Ban } from "lucide-react"

interface FullscreenPromptProps {
  onEnterFullscreen: () => void
}

export function FullscreenPrompt({ onEnterFullscreen }: FullscreenPromptProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border bg-card shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-balance text-xl text-card-foreground">
            Secure Quiz Mode
          </CardTitle>
          <CardDescription>
            This quiz requires fullscreen mode for security purposes. Please
            review the rules below before proceeding.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Quiz Rules:
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Maximize className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Fullscreen mode is required throughout the quiz</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Eye className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  Tab switches and window changes are monitored and logged
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Ban className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  Right-click, copy, and paste are disabled during the quiz
                </span>
              </li>
            </ul>
          </div>
          <Button
            onClick={onEnterFullscreen}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Maximize className="mr-2 h-4 w-4" />
            Enter Fullscreen & Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
