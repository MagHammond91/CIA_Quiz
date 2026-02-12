import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      studentName,
      studentId,
      score,
      totalQuestions,
      tabSwitches,
      timeTakenSeconds,
      answers,
    } = body

    if (!studentName || !studentId) {
      return NextResponse.json(
        { error: "Student name and ID are required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { error } = await supabase.from("quiz_results").insert({
      student_name: studentName,
      student_id: studentId,
      score: score ?? 0,
      total_questions: totalQuestions ?? 0,
      tab_switches: tabSwitches ?? 0,
      time_taken_seconds: timeTakenSeconds ?? 0,
      answers: answers ?? [],
    })

    if (error) {
      console.error("Supabase insert error:", error.message, error.details, error.hint)
      return NextResponse.json(
        { error: "Failed to save quiz results", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Submit route error:", err)
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    )
  }
}
