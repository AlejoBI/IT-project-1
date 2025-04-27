import React from 'react'
import { useTranslation } from 'react-i18next'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  return (
    <div className="flex justify-center gap-4 my-4">
      <button onClick={() => i18n.changeLanguage('es-419')} className="px-4 py-2 bg-gray-300 rounded">
        Español
      </button>
      <button onClick={() => i18n.changeLanguage('en')} className="px-4 py-2 bg-gray-300 rounded">
        English
      </button>
    </div>
  )
}