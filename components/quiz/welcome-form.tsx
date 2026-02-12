"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpen, User, Hash } from "lucide-react"

export function WelcomeForm() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [studentId, setStudentId] = useState("")
  const [errors, setErrors] = useState<{
    fullName?: string
    studentId?: string
  }>({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors: { fullName?: string; studentId?: string } = {}

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    if (!studentId.trim()) {
      newErrors.studentId = "Student ID is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Store in sessionStorage for the quiz page
    sessionStorage.setItem("quiz_student_name", fullName.trim())
    sessionStorage.setItem("quiz_student_id", studentId.trim())
    router.push("/quiz")
  }

  return (
    <Card className="w-full max-w-md border-border bg-card shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <BookOpen className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-balance text-xl text-card-foreground">
          Welcome to the Quiz
        </CardTitle>
        <CardDescription>
          Enter your details below to begin the assessment. Make sure your
          information is correct before starting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="fullName" className="text-foreground">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
                  setErrors((prev) => ({ ...prev, fullName: undefined }))
                }}
                className="pl-10"
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
              />
            </div>
            {errors.fullName && (
              <p
                id="fullName-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="studentId" className="text-foreground">
              Student ID
            </Label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="studentId"
                placeholder="Enter your student ID"
                value={studentId}
                onChange={(e) => {
                  setStudentId(e.target.value)
                  setErrors((prev) => ({ ...prev, studentId: undefined }))
                }}
                className="pl-10"
                aria-describedby={
                  errors.studentId ? "studentId-error" : undefined
                }
              />
            </div>
            {errors.studentId && (
              <p
                id="studentId-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.studentId}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start Quiz
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
