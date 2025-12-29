'use client'

import { Palette, Type, Layout, Settings } from 'lucide-react'
import { useState } from 'react'

export default function DesignSettings({ onSettingsChange }) {
  const [settings, setSettings] = useState({
    fontSize: 16,
    lineHeight: 1.6,
    fontFamily: 'Times New Roman',
    theme: 'official',
    showStamp: true,
    showSignatures: true
  })

  const themes = [
    { id: 'official', name: 'Официальный', colors: ['#1e3a5f', '#b22222', '#000000'] },
    { id: 'modern', name: 'Современный', colors: ['#2d4a7c', '#ff6b35', '#2c3e50'] },
    { id: 'classic', name: 'Классический', colors: ['#8b0000', '#000000', '#2f4f4f'] },
    { id: 'light', name: 'Светлый', colors: ['#4a90e2', '#e74c3c', '#34495e'] }
  ]

  const handleChange = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onSettingsChange(newSettings)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 document-border">
      <div className="flex items-center space-x-3 mb-6">
        <Palette className="w-6 h-6 text-mvd-blue" />
        <h2 className="text-xl font-bold text-gray-800">Настройки дизайна</h2>
      </div>

      <div className="space-y-6">
        {/* Цветовая схема */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Layout className="inline w-4 h-4 mr-2" />
            Цветовая схема
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {themes.map(theme => (
              <button
                key={theme.id}
                onClick={() => handleChange('theme', theme.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.theme === theme.id
                    ? 'border-mvd-accent ring-2 ring-mvd-accent/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex space-x-1 mb-2">
                  {theme.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-4 rounded"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="text-sm font-medium">{theme.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Настройки шрифта */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Type className="inline w-4 h-4 mr-2" />
            Настройки текста
          </label>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Размер шрифта</span>
                <span className="text-sm font-medium">{settings.fontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="20"
                step="1"
                value={settings.fontSize}
                onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Межстрочный интервал</span>
                <span className="text-sm font-medium">{settings.lineHeight}</span>
              </div>
              <input
                type="range"
                min="1.2"
                max="2.0"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => handleChange('lineHeight', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Дополнительные элементы */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Settings className="inline w-4 h-4 mr-2" />
            Дополнительные элементы
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showStamp}
                onChange={(e) => handleChange('showStamp', e.target.checked)}
                className="w-4 h-4 text-mvd-blue rounded focus:ring-mvd-blue"
              />
              <span className="text-gray-700">Показывать штамп "Для служебного пользования"</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showSignatures}
                onChange={(e) => handleChange('showSignatures', e.target.checked)}
                className="w-4 h-4 text-mvd-blue rounded focus:ring-mvd-blue"
              />
              <span className="text-gray-700">Показывать подписи</span>
            </label>
          </div>
        </div>

        {/* Предпросмотр настроек */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">👁️ Предпросмотр настроек:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Шрифт: {settings.fontFamily}</div>
            <div>Размер: {settings.fontSize}px</div>
            <div>Интервал: {settings.lineHeight}</div>
            <div>Тема: {themes.find(t => t.id === settings.theme)?.name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}