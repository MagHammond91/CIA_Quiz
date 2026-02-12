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

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_insert_quiz_results" ON public.quiz_results;
CREATE POLICY "allow_insert_quiz_results" ON public.quiz_results
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "allow_select_quiz_results" ON public.quiz_results;
CREATE POLICY "allow_select_quiz_results" ON public.quiz_results
  FOR SELECT USING (true);
