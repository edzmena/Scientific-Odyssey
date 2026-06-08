import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import useStore from '@/store/useStore'

import AppLayout from '@/components/layout/AppLayout'
import Auth from '@/pages/Auth'
import Dashboard from '@/pages/Dashboard'
import MockExams from '@/pages/MockExams'
import MockInterview from '@/pages/MockInterview'
import StudyTechniques from '@/pages/StudyTechniques'
import ExamPrepPlan from '@/pages/ExamPrepPlan'
import AITutor from '@/pages/AITutor'
import ProgressTracker from '@/pages/ProgressTracker'
import OdysseyGame from '@/pages/OdysseyGame'
import ResetPassword from '@/pages/ResetPassword'
import Subscription from '@/pages/Subscription'
import AdminDashboard from '@/pages/AdminDashboard'

function RequireAuth({ children }) {
  const { user, loading } = useStore()
  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-400">Loading…</div>
  if (!user) return <Navigate to="/auth" replace />
  return children
}

export default function App() {
  const { setUser, loadProfile, loadHistory } = useStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) { loadProfile(u.id); loadHistory(u.id) }
      else useStore.setState({ loading: false })
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) { loadProfile(u.id); loadHistory(u.id) }
      else useStore.setState({ loading: false, profile: null })
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route path="/"          element={<Dashboard />} />
        <Route path="/exams"     element={<MockExams />} />
        <Route path="/interview" element={<MockInterview />} />
        <Route path="/study"     element={<StudyTechniques />} />
        <Route path="/prep"      element={<ExamPrepPlan />} />
        <Route path="/potpot"    element={<AITutor />} />
        <Route path="/progress"  element={<ProgressTracker />} />
        <Route path="/game"      element={<OdysseyGame />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/admin"     element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
