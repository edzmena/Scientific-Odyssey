import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import logo from '@/assets/logo.png'

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile top bar */}
      <header className="lg:hidden fixed inset-x-0 top-0 z-30 h-14 bg-white border-b border-gray-100 flex items-center gap-3 px-4">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 -ml-1"
        >
          <span className="text-xl">☰</span>
        </button>
        <div className="w-7 h-7 rounded-lg overflow-hidden ring-1 ring-gray-100">
          <img src={logo} alt="Scientific Odyssey logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-sm font-bold text-gray-900">Scientific <span className="text-brand-600">Odyssey</span></span>
      </header>

      {/* Backdrop for mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
