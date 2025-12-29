'use client'

import { useState, useEffect, useRef } from 'react'
import { Eye, Download, Copy, Printer, ZoomIn, ZoomOut } from 'lucide-react'
import html2canvas from 'html2canvas'

export default function PreviewPanel({ documentData, designSettings }) {
  const [zoom, setZoom] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const previewRef = useRef(null)

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const currentDate = formatDate(new Date())
  const docNumber = `${currentDate.replace(/\//g, '')}-УВ/Г`

  const getDocTypeTitle = (type) => {
    const types = {
      'конкурс': 'ОБЪЯВЛЕНИЕ О КОНКУРСЕ',
      'приказ': 'П Р И К А З',
      'объявление': 'ОФИЦИАЛЬНОЕ ОБЪЯВЛЕНИЕ',
      'благодарность': 'БЛАГОДАРСТВЕННОЕ ПИСЬМО',
      'распоряжение': 'РАСПОРЯЖЕНИЕ'
    }
    return types[type] || 'ДОКУМЕНТ'
  }

  const handleDownload = async (format = 'png') => {
    if (!previewRef.current) return

    setIsGenerating(true)

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false
      })

      const link = document.createElement('a')
      const filename = `Документ_${new Date().getTime()}.${format}`

      if (format === 'png') {
        link.href = canvas.toDataURL('image/png')
      } else {
        link.href = canvas.toDataURL('image/jpeg', 0.95)
      }

      link.download = filename
      link.click()

      // Уведомление об успехе
      alert(`Документ успешно скачан как ${filename}`)

    } catch (error) {
      console.error('Ошибка при генерации изображения:', error)
      alert('Произошла ошибка при создании изображения')
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePrint = () => {
    const printContent = previewRef.current.innerHTML
    const printWindow = window.open('', '_blank')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Печать документа</title>
          <style>
            body {
              font-family: 'Times New Roman', serif;
              margin: 0;
              padding: 20mm;
              line-height: 1.6;
            }
            .official-document {
              max-width: 210mm;
              margin: 0 auto;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="official-document">${printContent}</div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              }
            }
          </script>
        </body>
      </html>
    `)

    printWindow.document.close()
  }

  const handleCopyToClipboard = async () => {
    if (!previewRef.current) return

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false
      })

      canvas.toBlob((blob) => {
        const item = new ClipboardItem({ 'image/png': blob })
        navigator.clipboard.write([item])
          .then(() => alert('Изображение скопировано в буфер обмена'))
          .catch(err => console.error('Ошибка копирования:', err))
      })
    } catch (error) {
      console.error('Ошибка при копировании:', error)
      alert('Не удалось скопировать изображение')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 document-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Eye className="w-6 h-6 text-mvd-blue" />
          <h2 className="text-xl font-bold text-gray-800">Предпросмотр документа</h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
            className="p-2 hover:bg-gray-100 rounded"
            title="Увеличить"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          <button
            onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
            className="p-2 hover:bg-gray-100 rounded"
            title="Уменьшить"
          >
            <ZoomOut className="w-5 h-5" />
          </button>

          <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Панель действий */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleDownload('png')}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-mvd-blue text-white px-4 py-2 rounded-lg hover:bg-mvd-light transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isGenerating ? 'Генерация...' : 'Скачать PNG'}</span>
          </button>

          <button
            onClick={() => handleDownload('jpg')}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-mvd-secondary text-white px-4 py-2 rounded-lg hover:bg-teal-500 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isGenerating ? 'Генерация...' : 'Скачать JPG'}</span>
          </button>

          <button
            onClick={handleCopyToClipboard}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>Копировать</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Печать</span>
          </button>
        </div>
      </div>

      {/* Предпросмотр документа */}
      <div className="overflow-auto border border-gray-300 rounded-lg bg-white p-8">
        <div
          ref={previewRef}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            width: `${100 / zoom}%`
          }}
          className="official-document min-w-[210mm] mx-auto bg-white p-12 official-font"
        >
          {/* Заголовок МВД */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ РОССИЙСКОЙ ФЕДЕРАЦИИ
            </h1>
            <h2 className="text-xl text-gray-800 mb-4">
              УЧЕБНЫЙ ВЗВОД ДОРОЖНО-ПАТРУЛЬНОЙ СЛУЖБЫ
            </h2>
            <div className="text-lg text-gray-700">
              по г. Горки
            </div>
          </div>

          {/* Разделительная линия */}
          <div className="border-t-2 border-red-700 mb-8"></div>

          {/* Тип документа */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-red-700 mb-2">
              {getDocTypeTitle(documentData.type)}
            </h2>
            <div className="text-lg text-gray-700">
              № {docNumber}
            </div>
            <div className="text-lg text-gray-700">
              от {currentDate} г.
            </div>
          </div>

          {/* Место и дата */}
          <div className="text-right mb-8">
            <div className="text-lg">
              г. Москва
            </div>
            <div className="text-lg">
              {currentDate} г.
            </div>
          </div>

          {/* Название документа */}
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 italic">
              «{documentData.title}»
            </h3>
          </div>

          {/* Содержание документа */}
          <div className="mb-12">
            <div className="text-lg leading-relaxed whitespace-pre-line">
              {documentData.content.split('\n').map((paragraph, index) => {
                // Обработка форматирования
                let formattedParagraph = paragraph

                // Жирный текст
                formattedParagraph = formattedParagraph.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong>$1</strong>'
                )

                // Курсив
                formattedParagraph = formattedParagraph.replace(
                  /\*(.*?)\*/g,
                  '<em>$1</em>'
                )

                // Подчеркивание
                formattedParagraph = formattedParagraph.replace(
                  /__(.*?)__/g,
                  '<u>$1</u>'
                )

                return (
                  <p
                    key={index}
                    className="mb-4"
                    dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                  />
                )
              })}
            </div>
          </div>

          {/* Подписи */}
          <div className="mt-16">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-lg font-bold mb-2">
                  НАЧАЛЬНИК УЧЕБНОГО ВЗВОДА
                </div>
                <div className="text-lg">
                  по г. Горки
                </div>
              </div>

              <div className="text-center">
                <div className="mb-1">_____________________</div>
                <div className="text-lg">Хоскерт Хилл</div>
              </div>
            </div>

            <div className="flex justify-between items-start mt-12">
              <div>
                <div className="text-lg font-bold mb-2">
                  ЗАМЕСТИТЕЛЬ НАЧАЛЬНИКА
                </div>
                <div className="text-lg">
                  по г. Горки
                </div>
              </div>

              <div className="text-center">
                <div className="mb-1">_____________________</div>
                <div className="text-lg">Д. ЕВТУШЕНОВ</div>
              </div>
            </div>
          </div>

          {/* Штамп */}
          <div className="mt-16 pt-8 border-t border-gray-300">
            <div className="text-center text-gray-600">
              <div className="mb-2">СОГЛАСОВАНО:</div>
              <div className="text-sm">
                Документ составлен: {currentDate}
              </div>
              <div className="text-sm font-bold mt-2">
                ДЛЯ СЛУЖЕБНОГО ПОЛЬЗОВАНИЯ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Информация о документе */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Тип:</span> {documentData.type}
          </div>
          <div>
            <span className="font-medium">Размер:</span> A4 (210×297мм)
          </div>
          <div>
            <span className="font-medium">Дата:</span> {currentDate}
          </div>
        </div>
      </div>
    </div>
  )
}