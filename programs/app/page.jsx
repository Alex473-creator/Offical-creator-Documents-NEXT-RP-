'use client'

import { useState, useEffect } from 'react'
import DocumentEditor from '@/components/DocumentEditor'
import PreviewPanel from '@/components/PreviewPanel'
import TemplateSelector from '@/components/TemplateSelector'
import DesignSettings from '@/components/DesignSettings'
import { documentTemplates } from '@/lib/documentTemplates'

export default function Home() {
  const [documentData, setDocumentData] = useState({
    title: '',
    content: '',
    type: 'конкурс'
  })

  const [designSettings, setDesignSettings] = useState({})
  const [activeTab, setActiveTab] = useState('editor')

  // Загрузка черновика из localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('document_draft')
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
        setDocumentData({
          title: draft.title || '',
          content: draft.content || '',
          type: draft.type || 'конкурс'
        })
      } catch (error) {
        console.error('Ошибка загрузки черновика:', error)
      }
    }
  }, [])

  const handleTemplateSelect = (template) => {
    setDocumentData({
      title: template.title,
      content: template.content,
      type: template.type
    })
    setActiveTab('editor')

    // Прокрутка к редактору
    document.getElementById('editor-section')?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  const handleContentChange = (content) => {
    setDocumentData(prev => ({ ...prev, content }))
  }

  const handleTitleChange = (title) => {
    setDocumentData(prev => ({ ...prev, title }))
  }

  const handleSettingsChange = (settings) => {
    setDesignSettings(settings)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Приветственный блок */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          🎖️ Создание официальных документов
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Профессиональный генератор документов для Учебного взвода ДПС г. Горки.
          Создавайте, редактируйте и экспортируйте документы в формате изображений.
        </p>
      </div>

      {/* Навигация по вкладкам */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          {[
            { id: 'templates', label: '📁 Шаблоны', icon: '📁' },
            { id: 'editor', label: '✏️ Редактор', icon: '✏️' },
            { id: 'design', label: '🎨 Дизайн', icon: '🎨' },
            { id: 'preview', label: '👁️ Предпросмотр', icon: '👁️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white border-t border-l border-r border-gray-300 text-mvd-blue'
                  : 'text-gray-600 hover:text-mvd-blue hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Содержимое вкладок */}
      <div className="min-h-[600px]">
        {activeTab === 'templates' && (
          <div className="fade-in">
            <TemplateSelector onTemplateSelect={handleTemplateSelect} />
          </div>
        )}

        {activeTab === 'editor' && (
          <div id="editor-section" className="fade-in">
            <DocumentEditor
              onContentChange={handleContentChange}
              onTitleChange={handleTitleChange}
              initialData={documentData}
            />
          </div>
        )}

        {activeTab === 'design' && (
          <div className="fade-in">
            <DesignSettings onSettingsChange={handleSettingsChange} />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="fade-in">
            <PreviewPanel
              documentData={documentData}
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Информационная панель */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <div className="text-blue-800 font-bold mb-2">📱 Адаптивный дизайн</div>
          <p className="text-blue-700 text-sm">
            Приложение работает на любых устройствах: компьютерах, планшетах и смартфонах
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <div className="text-green-800 font-bold mb-2">⚡ Быстрый экспорт</div>
          <p className="text-green-700 text-sm">
            Экспортируйте документы в PNG или JPG одним кликом. Готово к печати
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
          <div className="text-purple-800 font-bold mb-2">🔒 Безопасность</div>
          <p className="text-purple-700 text-sm">
            Все данные обрабатываются локально. Никакая информация не отправляется на сервер
          </p>
        </div>
      </div>

      {/* Инструкция */}
      <div className="mt-12 bg-gradient-to-r from-mvd-blue to-mvd-light text-white p-8 rounded-2xl">
        <h3 className="text-2xl font-bold mb-6">📋 Как пользоваться генератором:</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">1️⃣</div>
            <div className="font-medium mb-2">Выберите шаблон</div>
            <p className="text-sm opacity-90">Или создайте документ с нуля</p>
          </div>

          <div className="text-center">
            <div className="text-3xl mb-3">2️⃣</div>
            <div className="font-medium mb-2">Отредактируйте текст</div>
            <p className="text-sm opacity-90">Используйте форматирование</p>
          </div>

          <div className="text-center">
            <div className="text-3xl mb-3">3️⃣</div>
            <div className="font-medium mb-2">Настройте дизайн</div>
            <p className="text-sm opacity-90">Выберите цвета и шрифты</p>
          </div>

          <div className="text-center">
            <div className="text-3xl mb-3">4️⃣</div>
            <div className="font-medium mb-2">Скачайте или распечатайте</div>
            <p className="text-sm opacity-90">Получите готовый документ</p>
          </div>
        </div>
      </div>
    </div>
  )
}