"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangle } from "lucide-react"

interface SecurityWarningProps {
  open: boolean
  tabSwitchCount: number
  onReturn: () => void
}

export function SecurityWarning({
  open,
  tabSwitchCount,
  onReturn,
}: SecurityWarningProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="border-destructive/50 bg-card">
        <AlertDialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center text-foreground">
            Tab Switch Detected
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            You have left the quiz window. This incident has been logged and
            will be visible to your teacher.
          </AlertDialogDescription>
          <p className="text-center text-sm font-semibold text-destructive">
            {"Violations so far: "}
            {tabSwitchCount}
          </p>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction
            onClick={onReturn}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Return to Quiz
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
