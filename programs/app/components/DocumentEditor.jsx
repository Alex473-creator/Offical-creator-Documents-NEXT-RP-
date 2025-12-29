'use client'

import { useState, useEffect } from 'react'
import { Save, FileText, Type, AlignLeft, Hash } from 'lucide-react'

export default function DocumentEditor({
  onContentChange,
  onTitleChange,
  initialData
}) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [docType, setDocType] = useState(initialData?.type || 'конкурс')
  const [isDirty, setIsDirty] = useState(false)

  // Обработчики изменений
  useEffect(() => {
    onTitleChange(title)
  }, [title, onTitleChange])

  useEffect(() => {
    onContentChange(content)
  }, [content, onContentChange])

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    setIsDirty(true)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
    setIsDirty(true)
  }

  const handleDocTypeChange = (type) => {
    setDocType(type)
    setIsDirty(true)
  }

  const handleSaveDraft = () => {
    const draft = {
      title,
      content,
      type: docType,
      timestamp: new Date().toISOString()
    }

    localStorage.setItem('document_draft', JSON.stringify(draft))
    setIsDirty(false)

    // Здесь можно добавить уведомление об успешном сохранении
    alert('Черновик сохранен в локальное хранилище')
  }

  // Шаблоны форматирования
  const formatText = (format) => {
    const textarea = document.getElementById('content-editor')
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let formattedText = selectedText

    switch(format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'underline':
        formattedText = `__${selectedText}__`
        break
      case 'list':
        formattedText = selectedText.split('\n').map(line => `• ${line}`).join('\n')
        break
      case 'numbered':
        formattedText = selectedText.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n')
        break
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 document-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-mvd-blue" />
          <h2 className="text-xl font-bold text-gray-800">Редактор документа</h2>
        </div>

        <div className="flex items-center space-x-3">
          {isDirty && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Не сохранено
            </span>
          )}

          <button
            onClick={handleSaveDraft}
            className="flex items-center space-x-2 bg-mvd-blue text-white px-4 py-2 rounded-lg hover:bg-mvd-light transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Сохранить черновик</span>
          </button>
        </div>
      </div>

      {/* Тип документа */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Тип документа
        </label>
        <div className="flex flex-wrap gap-2">
          {['конкурс', 'приказ', 'объявление', 'благодарность', 'распоряжение'].map((type) => (
            <button
              key={type}
              onClick={() => handleDocTypeChange(type)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                docType === type
                  ? 'bg-mvd-accent text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Название документа */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Название документа
        </label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mvd-blue focus:border-transparent official-font text-lg"
          placeholder="Введите название документа..."
        />
      </div>

      {/* Панель форматирования */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => formatText('bold')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Жирный"
          >
            <Type className="w-4 h-4" />
          </button>

          <button
            onClick={() => formatText('italic')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Курсив"
          >
            <i className="italic">I</i>
          </button>

          <button
            onClick={() => formatText('list')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Список"
          >
            <AlignLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => formatText('numbered')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Нумерованный список"
          >
            <Hash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Редактор содержания */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Содержание документа
        </label>
        <textarea
          id="content-editor"
          value={content}
          onChange={handleContentChange}
          className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mvd-blue focus:border-transparent official-font text-base resize-none"
          placeholder="Введите содержание документа..."
        />
      </div>

      {/* Подсказки */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">📝 Подсказки:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Используйте <strong>**текст**</strong> для жирного начертания</li>
          <li>• Используйте <em>*текст*</em> для курсива</li>
          <li>• Используйте пустую строку для разделения абзацев</li>
          <li>• Подписи добавляются автоматически</li>
        </ul>
      </div>
    </div>
  )
}