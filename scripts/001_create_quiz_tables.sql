-- Quiz results table to store student submissions
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  student_id TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  tab_switches INTEGER NOT NULL DEFAULT 0,
  time_taken_seconds INTEGER NOT NULL DEFAULT 0,
  answers JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (students submitting quiz results via anon key)
CREATE POLICY "allow_insert_quiz_results" ON public.quiz_results
  FOR INSERT WITH CHECK (true);

-- Allow select for reading results (teacher dashboard uses service role, but anon can also read)
CREATE POLICY "allow_select_quiz_results" ON public.quiz_results
  FOR SELECT USING (true);

-- Create index on student_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_quiz_results_student_id ON public.quiz_results(student_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON public.quiz_results(created_at DESC);
