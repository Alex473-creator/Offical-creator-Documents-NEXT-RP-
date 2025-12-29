'use client'

import { FileText, Trophy, Megaphone, Award, ClipboardList } from 'lucide-react'
import { documentTemplates } from '@/lib/documentTemplates'

export default function TemplateSelector({ onTemplateSelect }) {
  const getIcon = (type) => {
    switch(type) {
      case 'конкурс': return <Trophy className="w-6 h-6" />
      case 'приказ': return <FileText className="w-6 h-6" />
      case 'объявление': return <Megaphone className="w-6 h-6" />
      case 'благодарность': return <Award className="w-6 h-6" />
      case 'распоряжение': return <ClipboardList className="w-6 h-6" />
      default: return <FileText className="w-6 h-6" />
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 document-border">
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="w-6 h-6 text-mvd-blue" />
        <h2 className="text-xl font-bold text-gray-800">Готовые шаблоны</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentTemplates.map((template, index) => (
          <button
            key={index}
            onClick={() => onTemplateSelect(template)}
            className="group p-4 border border-gray-200 rounded-lg hover:border-mvd-blue hover:shadow-md transition-all text-left"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                {getIcon(template.type)}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-mvd-blue">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </div>

            <div className="mt-2">
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                {template.type}
              </span>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              {template.preview.substring(0, 80)}...
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">💡 Как использовать шаблоны:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Выберите подходящий шаблон документа</li>
          <li>• Шаблон автоматически загрузится в редактор</li>
          <li>• Отредактируйте текст под свои нужды</li>
          <li>• Настройте дизайн и экспортируйте документ</li>
        </ul>
      </div>
    </div>
  )
}