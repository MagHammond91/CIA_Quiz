"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { QuizQuestion } from "@/lib/quiz-data"

interface QuestionCardProps {
  question: QuizQuestion
  currentIndex: number
  totalQuestions: number
  selectedAnswer: number | null
  onSelectAnswer: (answerIndex: number) => void
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {"Question "}
            {currentIndex + 1}
            {" of "}
            {totalQuestions}
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {"1 point"}
          </span>
        </div>
        <CardTitle className="text-balance text-base font-semibold leading-relaxed text-card-foreground md:text-lg">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          key={question.id}
          value={selectedAnswer !== null ? String(selectedAnswer) : ""}
          onValueChange={(val) => onSelectAnswer(Number(val))}
          className="flex flex-col gap-3"
        >
          {question.options.map((option, index) => (
            <Label
              key={index}
              htmlFor={`option-${question.id}-${index}`}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-colors ${
                selectedAnswer === index
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent"
              }`}
            >
              <RadioGroupItem
                value={String(index)}
                id={`option-${question.id}-${index}`}
                className="shrink-0"
              />
              <span className="text-sm leading-relaxed">{option}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
