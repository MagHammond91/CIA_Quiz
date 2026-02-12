import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { TEACHER_PASSWORD } from "@/lib/quiz-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body

    if (password !== TEACHER_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase select error:", error)
      return NextResponse.json(
        { error: "Failed to fetch results" },
        { status: 500 }
      )
    }

    return NextResponse.json({ results: data })
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    )
  }
}
