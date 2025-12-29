import { Inter } from 'next/font/google'
import './styles/globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'Генератор документов - Учебный взвод ДПС г. Горки',
  description: 'Создание официальных документов с экспортом в изображения',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>

        {/* Футер */}
        <footer className="bg-mvd-blue text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">🎖️ Учебный взвод ДПС г. Горки</h3>
                <p className="text-gray-300">Официальный генератор документов</p>
              </div>

              <div className="text-center md:text-right">
                <p className="text-gray-300">© {new Date().getFullYear()} МВД России</p>
                <p className="text-gray-400 text-sm mt-1">Для служебного пользования</p>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-6 pt-6 text-center">
              <p className="text-gray-400 text-sm">
                Все документы генерируются в соответствии с официальными требованиями МВД РФ
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}