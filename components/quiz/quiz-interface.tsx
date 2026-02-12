"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QuestionCard } from "@/components/quiz/question-card"
import { QuizTimer } from "@/components/quiz/quiz-timer"
import { SecurityWarning } from "@/components/quiz/security-warning"
import { FullscreenPrompt } from "@/components/quiz/fullscreen-prompt"
import { QuizResults } from "@/components/quiz/quiz-results"
import { quizQuestions, QUIZ_TIME_LIMIT_SECONDS } from "@/lib/quiz-data"
import { ChevronLeft, ChevronRight, Send, Shield } from "lucide-react"
import { toast } from "sonner"

type QuizState = "fullscreen-prompt" | "in-progress" | "submitted"

export function QuizInterface() {
  const router = useRouter()
  const [quizState, setQuizState] = useState<QuizState>("fullscreen-prompt")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizQuestions.length).fill(null)
  )
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_LIMIT_SECONDS)
  const [tabSwitches, setTabSwitches] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const startTimeRef = useRef<number>(0)
  const hasSubmittedRef = useRef(false)

  const studentName =
    typeof window !== "undefined"
      ? sessionStorage.getItem("quiz_student_name") || ""
      : ""
  const studentId =
    typeof window !== "undefined"
      ? sessionStorage.getItem("quiz_student_id") || ""
      : ""

  // Redirect if no student info
  useEffect(() => {
    if (!sessionStorage.getItem("quiz_student_name")) {
      router.replace("/")
    }
  }, [router])

  // Submit quiz handler
  const submitQuiz = useCallback(
    async (isAutoSubmit = false) => {
      if (hasSubmittedRef.current || isSubmitting) return
      hasSubmittedRef.current = true
      setIsSubmitting(true)

      // Exit fullscreen
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      }

      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      let score = 0
      const answerData = quizQuestions.map((q, i) => ({
        questionId: q.id,
        selected: answers[i],
        correct: q.correctAnswer,
        isCorrect: answers[i] === q.correctAnswer,
      }))
      answerData.forEach((a) => {
        if (a.isCorrect) score++
      })

      setFinalScore(score)
      setTimeTaken(elapsed)

      try {
        const res = await fetch("/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentName,
            studentId,
            score,
            totalQuestions: quizQuestions.length,
            tabSwitches,
            timeTakenSeconds: elapsed,
            answers: answerData,
          }),
        })
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          console.error("Quiz submit failed:", errData)
          toast.error("Failed to save results. Please contact your teacher.")
        }
      } catch (err) {
        console.error("Quiz submit network error:", err)
        toast.error("Failed to save results. Please contact your teacher.")
      }

      if (isAutoSubmit) {
        toast.info("Time is up! Your quiz has been automatically submitted.")
      }

      setQuizState("submitted")
      setIsSubmitting(false)
    },
    [answers, tabSwitches, studentName, studentId, isSubmitting]
  )

  // Timer countdown
  useEffect(() => {
    if (quizState !== "in-progress") return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          submitQuiz(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [quizState, submitQuiz])

  // Security: disable right-click, copy, paste
  useEffect(() => {
    if (quizState !== "in-progress") return

    const preventContext = (e: MouseEvent) => {
      e.preventDefault()
      toast.warning("Right-click is disabled during the quiz.")
    }
    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      toast.warning("Copy/Paste is disabled during the quiz.")
    }
    const preventKeyShortcuts = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "c" || e.key === "v" || e.key === "x" || e.key === "a" || e.key === "u")
      ) {
        e.preventDefault()
        toast.warning("Keyboard shortcuts are disabled during the quiz.")
      }
    }

    document.addEventListener("contextmenu", preventContext)
    document.addEventListener("copy", preventCopy)
    document.addEventListener("paste", preventCopy)
    document.addEventListener("cut", preventCopy)
    document.addEventListener("keydown", preventKeyShortcuts)

    return () => {
      document.removeEventListener("contextmenu", preventContext)
      document.removeEventListener("copy", preventCopy)
      document.removeEventListener("paste", preventCopy)
      document.removeEventListener("cut", preventCopy)
      document.removeEventListener("keydown", preventKeyShortcuts)
    }
  }, [quizState])

  // Security: detect tab switches / visibility changes
  useEffect(() => {
    if (quizState !== "in-progress") return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches((prev) => prev + 1)
        setShowWarning(true)
      }
    }

    const handleBlur = () => {
      setTabSwitches((prev) => prev + 1)
      setShowWarning(true)
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && quizState === "in-progress" && !hasSubmittedRef.current) {
        setTabSwitches((prev) => prev + 1)
        setShowWarning(true)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("blur", handleBlur)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("blur", handleBlur)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [quizState])

  // Enter fullscreen
  function enterFullscreen() {
    const elem = document.documentElement
    elem
      .requestFullscreen()
      .then(() => {
        setQuizState("in-progress")
        startTimeRef.current = Date.now()
      })
      .catch(() => {
        toast.error(
          "Could not enter fullscreen. Please allow fullscreen access and try again."
        )
      })
  }

  function handleReturnFromWarning() {
    setShowWarning(false)
    // Try to re-enter fullscreen
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    }
  }

  function handleSelectAnswer(answerIndex: number) {
    setAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[currentQuestion] = answerIndex
      return newAnswers
    })
  }

  if (quizState === "fullscreen-prompt") {
    return <FullscreenPrompt onEnterFullscreen={enterFullscreen} />
  }

  if (quizState === "submitted") {
    return (
      <QuizResults
        score={finalScore}
        totalQuestions={quizQuestions.length}
        tabSwitches={tabSwitches}
        timeTaken={timeTaken}
        studentName={studentName}
        onGoHome={() => {
          sessionStorage.removeItem("quiz_student_name")
          sessionStorage.removeItem("quiz_student_id")
          router.push("/")
        }}
      />
    )
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const answeredCount = answers.filter((a) => a !== null).length

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Quiz Header Bar */}
      <header className="sticky top-0 z-50 border-b border-primary/20 bg-primary px-4 py-3 text-primary-foreground shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary-foreground/70" />
            <span className="text-sm font-semibold">Secure Quiz</span>
          </div>
          <QuizTimer
            timeLeft={timeLeft}
            totalTime={QUIZ_TIME_LIMIT_SECONDS}
          />
        </div>
      </header>

      {/* Progress */}
      <div className="bg-card px-4 py-2">
        <div className="mx-auto max-w-3xl">
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {"Progress: "}
              {answeredCount}
              {"/"}
              {quizQuestions.length}
              {" answered"}
            </span>
            <span>
              {studentName}
              {" ("}
              {studentId}
              {")"}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {/* Question Area */}
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6">
        <QuestionCard
          question={quizQuestions[currentQuestion]}
          currentIndex={currentQuestion}
          totalQuestions={quizQuestions.length}
          selectedAnswer={answers[currentQuestion]}
          onSelectAnswer={handleSelectAnswer}
        />

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            disabled={currentQuestion === 0}
            className="gap-1 border-border text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          {/* Question indicators */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {quizQuestions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestion(i)}
                aria-label={`Go to question ${i + 1}`}
                className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium transition-colors ${
                  i === currentQuestion
                    ? "bg-primary text-primary-foreground"
                    : answers[i] !== null
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentQuestion < quizQuestions.length - 1 ? (
            <Button
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
              disabled={answers[currentQuestion] === null}
              className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => submitQuiz(false)}
              disabled={isSubmitting}
              className="gap-1 bg-success text-success-foreground hover:bg-success/90"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">
                {isSubmitting ? "Submitting..." : "Submit"}
              </span>
            </Button>
          )}
        </div>
      </main>

      {/* Security Warning Dialog */}
      <SecurityWarning
        open={showWarning}
        tabSwitchCount={tabSwitches}
        onReturn={handleReturnFromWarning}
      />
    </div>
  )
}
