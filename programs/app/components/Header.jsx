'use client'

import { Shield, Download, Settings, HelpCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-mvd-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Логотип и название */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold">🎖️ Генератор документов</h1>
              <p className="text-sm text-gray-300">Учебный взвод ДПС г. Горки | МВД России</p>
            </div>
          </div>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-2 hover:text-mvd-secondary transition-colors">
              <Settings className="w-5 h-5" />
              <span>Настройки</span>
            </button>

            <button className="flex items-center space-x-2 hover:text-mvd-secondary transition-colors">
              <HelpCircle className="w-5 h-5" />
              <span>Помощь</span>
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                <div>Версия 1.0</div>
                <div className="text-xs">Для служебного пользования</div>
              </div>
            </div>
          </nav>

          {/* Мобильное меню кнопка */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden border-t border-white/20 pt-4 fade-in">
            <div className="flex flex-col space-y-3">
              <button className="flex items-center space-x-2 py-2">
                <Settings className="w-5 h-5" />
                <span>Настройки</span>
              </button>

              <button className="flex items-center space-x-2 py-2">
                <HelpCircle className="w-5 h-5" />
                <span>Помощь</span>
              </button>

              <div className="pt-3 border-t border-white/10">
                <div className="text-sm text-gray-300">
                  <div>Версия 1.0</div>
                  <div className="text-xs">Для служебного пользования</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}