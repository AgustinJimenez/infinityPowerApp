import React from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../lang/en.json'
import es from '../lang/es.json'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../redux/selectors'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    //debug: true,
    interpolation: {
      escapeValue: false,
    },
  })

const LanguageProvider = ({ children }) => {
  const { default_language } = useSelector(state => datasetSelector(state, 'user'))

  React.useEffect(() => {
    i18n.changeLanguage(default_language)
  }, [default_language])

  return <>{children}</>
}

export default LanguageProvider
